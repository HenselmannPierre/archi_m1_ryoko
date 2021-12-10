import React from "react";
import { Activity } from "../model/Activity";
import { Trip } from "../model/Trip";

export abstract class CRUDHandler {

    abstract getTrips : ( setter : React.Dispatch<React.SetStateAction<Trip[]>> ) => void
    //retrieve all trips

    abstract getTripsOfUser : ( userId : string, setter : React.Dispatch<React.SetStateAction<Trip[]>> ) => void
    
    abstract createTrip : ( trip : Trip ) => void
    //add trip to the database

    abstract addActivity : ( activity : Activity, tripID : string ) => any
    //add activity to trip

    abstract updateActivity : ( activity : Activity, tripID : string ) => any
    //update activity in database

    abstract deleteActivity : ( tripID : string, activityID : string ) => any
    //delete activity from trip in database

}