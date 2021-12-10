import { CRUDHandler } from "./CRUDHandler";
import axios, { AxiosResponse } from "axios";
import { Trip } from "../model/Trip";
import { Activity } from "../model/Activity";
import { Dispatch, SetStateAction } from "react";

const TRIPS_API_BASE_URL = "http://localhost:8080/api";

const apiUrl = ( path ? : string ) => { 
    if ( path === undefined )
        return TRIPS_API_BASE_URL;
    else
        return TRIPS_API_BASE_URL + "/" + path;
}

export class RyokoApiLink extends CRUDHandler {

    protected static _instance : RyokoApiLink;

    public static getInstance() : RyokoApiLink {
        return this._instance || ( this._instance = new this() );
    }

    private constructor() {
        super()
    }
    

    getTrips = ( setter : React.Dispatch<React.SetStateAction<Trip[]>> ) => {
        let tripsArray : Trip[] = []
        axios.get<Trip[]>( apiUrl( "trips" ) ).then( response => {
            for ( let trip of response.data ) {
                let tempActivitiesArray : Activity[] = []
                for ( let activity of trip.activities )
                    tempActivitiesArray.push( new Activity( activity.dateTime, activity.activityName, activity.type, activity.placeId, activity.activityId ) )
                tripsArray.push( new Trip( trip.id, trip.userId, trip.tripName, tempActivitiesArray ) )
            }
            setter( tripsArray )
        } )
    }

    
    getTripsOfUser = ( userId : string, setter : Dispatch<SetStateAction<Trip[]>> ) => {
        let tripsArray : Trip[] = []
        axios.get<Trip[]>( apiUrl( userId + "/trips" ) ).then( response => {
            for ( let trip of response.data ) {
                let tempActivitiesArray : Activity[] = []
                for ( let activity of trip.activities )
                    tempActivitiesArray.push( new Activity( activity.dateTime, activity.activityName, activity.type, activity.placeId, activity.activityId ) )
                tripsArray.push( new Trip( trip.id, trip.userId, trip.tripName, tempActivitiesArray ) )
            }
            setter( tripsArray )
        } )
    }
    
    createTrip = ( trip : Trip ) => {
        axios.post<Trip,AxiosResponse<string>>( apiUrl( "createTrip" ), trip ).then( response => { trip.id = response.data;return response.data } )
    }
    
    addActivity = ( activity : Activity, tripID : string ) => {
        axios.post<Activity,AxiosResponse<string>>( apiUrl( "trips/" + tripID + "/addActivity" ), activity ).then( response => { activity.activityId = response.data; return response.data } )
    }

    updateActivity = ( activity : Activity, tripID : string ) => {
        if ( activity.activityId === "" )
            this.addActivity( activity, tripID )
        else
            axios.put<Activity,AxiosResponse<string>>( apiUrl( "updateActivity/" + tripID + "/activities/" + activity.activityId ), activity ).then( response => { return response.data } )
    }

    deleteActivity = ( tripID : string, activityID : string ) => {
        axios.delete<never,AxiosResponse<string>>( apiUrl( "deleteActivity/" + tripID + "/activities/" + activityID ) ).then( response => { return response.data } )
    }

}