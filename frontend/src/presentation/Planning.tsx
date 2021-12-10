import { useState } from 'react';
import { iconStyle } from '../App';
import { Activity } from '../model/Activity';
import { Trip } from '../model/Trip';
import ActivityCard from './ActivityCard';

function Planning( props : { trip: Trip, back : () => void, showDetailedView : ( activity : Activity ) => void } ) {

    const [ currentDay, setCurrentDay ] = useState( "" )

    let days = 0

    const renderDays = () => {
        if ( props.trip.activities[ 0 ] != null && props.trip.getDates().findIndex( date => date === currentDay ) === -1 ) setCurrentDay( props.trip.getDates()[ 0 ] )
        let list = []
        for ( let date of props.trip.getDates() ) {
            let color = date === currentDay ? "list-group-item-primary text-black" : "list-group-item-light text-dark"
            list.push(
                <li key={ date } className={ "text-center list-group-item col rounded-0 " + color } onClick={ () => setCurrentDay( date ) }>
                    <h3>Day { ++days }</h3>
                    <h6>{ date }</h6>
                </li>
            )
        }
        return list
    }

    const renderActivities = () => {
        let list = []
        props.trip.activities.sort( ( a, b ) => a.timeDifference( b ) )
        for ( let activity of props.trip.getActivities( currentDay ) )
            list.push(
                <div key={ activity.getTime() } onClick={ () => props.showDetailedView( activity ) }>  
                    <ActivityCard activity={ activity } />
                </div>
            )

        return (
            <div className="row p-3">
                { list }
                <div className="flex-row card my-3">
                    <button className="card-body btn btn-outline-secondary" onClick={ () => props.showDetailedView( new Activity() ) }>
                        <i className="bi bi-plus-lg" style={ iconStyle }></i>
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div>
            <div className="row p-3">
                <button onClick={ props.back } className="btn btn-outline-secondary col-2 my-auto">
                    <i className="bi bi-chevron-left" style={ iconStyle }></i>
                </button>
                <h1 className="text-end col-10 my-auto">{ props.trip.tripName }</h1>
            </div>
            <ul className="list-group list-group-horizontal row flex-nowrap overflow-scroll">
                { renderDays() }
            </ul>
            { renderActivities() }
        </div>
        
    );
}

export default Planning;