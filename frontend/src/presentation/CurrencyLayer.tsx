import { useEffect, useState } from 'react';
import { CurrencyType } from '../model/Interfaces';
import { Trip } from '../model/Trip';
import { defaultCurrency, init } from '../processes/CurrencyLayer'

function CurrencyLayer( props : { trip : Trip } ) {

    const [ currency, setCurrency ] = useState<CurrencyType>( { ISO : defaultCurrency, name : "US Dollar", symbol : '$' } )
    const [ changeRate, setChangeRate ] = useState( 1 )
    const [ country, setCountry ] = useState<string>( "USA" )
    
    useEffect(
        () => init(
            setCurrency,
            { value : currency, setter : setCurrency },
            { value : country, setter : setCountry },
            setChangeRate,
            props.trip.activities[ 0 ].placeId
        ),
        [ props.trip.activities, country, currency ]
    )

    return (
        <div className="my-3 border">
            <h2>Currency in { country } is { currency.name }({ currency.symbol })</h2>
            { currency?.ISO === defaultCurrency ? <p></p> : <p>Change rate : 1 { defaultCurrency } = { changeRate + " " + currency.ISO }</p>}
        </div>
    );
}

export default CurrencyLayer;