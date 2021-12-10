import { Trip } from "../model/Trip";
import { RyokoApiLink } from "./RyokoApiLink";
import { Activity } from "../model/Activity";
import { CRUDHandler } from "./CRUDHandler";
import { CurrentTripState, TripState } from "../model/Interfaces";

export class Dispatcher {

    protected static _instance : Dispatcher
    protected persistenceHandler: CRUDHandler
    public tripsState : TripState | undefined = undefined
    public currentTripState : CurrentTripState | undefined
    public currentUser : any

    public static getInstance() : Dispatcher {
        return this._instance || ( this._instance = new this() )
    }

    constructor() {
        this.persistenceHandler = RyokoApiLink.getInstance()
    }

    createTrip = ( title : string ) => {
        if ( this.tripsState !== undefined ) {
            const tmp : Trip = new Trip( "", this.currentUser.uid, title, [] )
            this.persistenceHandler.createTrip( tmp )
            this.tripsState.setter( old => [ ...old, tmp ] )
        }
    }

    deleteActivity = ( activity : Activity ) => {
        if ( this.currentTripState !== undefined ) {
            const current = this.currentTripState.currentTrip
            const index = current.activities.findIndex( a => a.activityId === activity.activityId )
            current.activities.splice( index, index >= 0 ? 1 : 0 )
            this.persistenceHandler.deleteActivity( current.id, activity.activityId )
        }
    }

    saveActivity = ( old : Activity, name : string, dateTime : string, placeId : string ) => {
        if ( this.currentTripState !== undefined ) {
            old.activityName = name
            old.dateTime = dateTime
            old.placeId = placeId
            let id : string = this.persistenceHandler.updateActivity( old, this.currentTripState.currentTrip.id )
            if ( old.activityId === "" ) {
              this.currentTripState.currentTrip.activities.push( old )
              old.activityId = id
            }
        }
    }

}