import React from 'react';
import { Trip } from '../model/Trip';
import AviationStack from './AviationStack';
import CurrencyLayer from './CurrencyLayer';
import Weather from './Weather';

function TripSummary( props : { trip : Trip | null } ) {

    // const getPDFSummary = () => {}

    const infos = () => {
        if ( props.trip !== null )
            return (
                <div>
                    <Weather trip={ props.trip } />
                    <CurrencyLayer trip={ props.trip } />
                    <AviationStack />
                    {/* <button type="button" className="mb-3 btn btn-secondary" onClick={ () => getPDFSummary() } >Print trip summary as PDF</button> */}
                </div>
            )
        else return null
    }

    return (
        <div>
            { infos() }
        </div>
    );
}

export default TripSummary