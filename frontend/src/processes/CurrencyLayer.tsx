import axios from "axios"
import { CountryState, CurrencyState, CurrencyType } from "../model/Interfaces"
import { GooglePlacesInterface } from "./GooglePlacesInterface"

export const defaultCurrency = "USD"
export const currencyApiKey = ""

export const init = (
    setCurrency: React.Dispatch<React.SetStateAction<CurrencyType>>,
    currencyState : CurrencyState,
    countryState : CountryState,
    setChangeRate: React.Dispatch<React.SetStateAction<number>>,
    id : string
) => {
    GooglePlacesInterface.getInstance().getCountryFromPlaceId( id, countryState.setter )
    axios.get<never,any>( "https://restcountries.com/v3.1/name/" + countryState.value ).then(
        response => {
            const res = response.data[ 0 ].currencies
            const iso = Object.keys( res )[ 0 ]
            setCurrency(
                {
                    ISO : iso,
                    name : res[ iso ].name,
                    symbol: res[ iso ].symbol
                }
            )
        }
    )
    axios.get<never,any>( "http://api.currencylayer.com/live?access_key=" + currencyApiKey + "&currencies=" + currencyState.value.ISO ).then( response => setChangeRate( response.data.quotes[ defaultCurrency + currencyState.value.ISO ] ) )
}