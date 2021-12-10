import axios from "axios"
import { PlaceState, TemperatureState } from "../model/Interfaces"
import { GooglePlacesInterface } from "./GooglePlacesInterface"

export const weatherAPIKey = "50a7aa80fa492fa92e874d23ad061374"

export const init = ( id : string, temperatureState : TemperatureState, placeState : PlaceState ) => {
    GooglePlacesInterface.getInstance().getPlaceNameFromPlaceId( "city", id, placeState.setter )
    axios.get<never, any>( 'https://api.openweathermap.org/data/2.5/weather?q='+ placeState.value +'&appid=' + weatherAPIKey ).then( response => { temperatureState.setter( Math.round( response.data.main.temp - 273 ) ) } )
}