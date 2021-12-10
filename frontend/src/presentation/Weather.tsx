import { useEffect, useState } from 'react';
import { Trip } from '../model/Trip';
import { init } from '../processes/Weather';

function Weather( props : { trip : Trip } ) {

    const [ temperature, setTemperature ] = useState<number>( 0 )
    const [ place, setPlace ] = useState<string>( "Washington DC" )
    
    useEffect(
        () => init(
            props.trip.activities[ 0 ].placeId,
            { value : temperature, setter : setTemperature },
            { value : place, setter : setPlace }
        ),
        [ props.trip.activities, temperature, place ]
    )

    return (
        <div className="my-3 border">
            <h2>Temperature in { place } : { temperature }°C</h2>
        </div>
    );
}

export default Weather;