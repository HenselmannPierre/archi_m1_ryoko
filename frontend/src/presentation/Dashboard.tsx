import React from "react";
import { center, iconStyle } from "../App";
import { Trip } from "../model/Trip";
import TripSummary from "./TripSummary";

const Dashboard = (
    props: {
        ongoing : Trip | null,
        newTrip : () => void,
        showTrip : ( trip : Trip ) => void,
        trips : Trip[],
        tripSetter : React.Dispatch<React.SetStateAction<Trip>>
    }
) => {

    const renderTrips = () => {
        let list = []
        let i = 0
        for ( let trip of props.trips ) {
            list.push(
                <li key={ i++ } onClick={ () => props.showTrip( trip ) } style={ center } className="text-center list-group-item col-3 mx-3 border"><span>{ trip.tripName }</span></li>
            )
        }
        list.push(
            <li key="newTrip" style={ center } className="text-center list-group-item col mx-3 border" onClick={ () => props.newTrip() }>
                <i className="bi bi-plus" style={ iconStyle }></i>
            </li>
        )
        
        return <ul className="list-group list-group-horizontal row flex-nowrap overflow-scroll">{ list }</ul>
    }

    const renderOngoing = () => {
        if ( props.ongoing !== null )
            return <h3 className="display-4">Ongoing trip : { props.ongoing.tripName }</h3>
        else
            return <h3>No current trip</h3>
    }

    return (
        <div>
            <h1>Dashboard</h1>
            { renderOngoing() }
            <TripSummary trip={ props.ongoing } />
            { renderTrips() }
        </div>
    );
}

export default Dashboard;