//import './App.css';
import Planning from "./presentation/Planning";
import { Trip } from "./model/Trip";
import { Activity } from "./model/Activity";
import React, { useEffect, useState } from "react";
import Dashboard from "./presentation/Dashboard";
import { ActivityDetails } from "./presentation/ActivityDetails";
import { RyokoApiLink } from "./processes/RyokoApiLink";
import { CRUDHandler } from "./processes/CRUDHandler";
import NewTrip from "./presentation/NewTrip";
import { Dispatcher } from "./processes/Dispatcher";
import Authentication from "./processes/Authentication";
import { useAuth } from "./firebase";
import { CurrentTripState, TripState } from "./model/Interfaces";

export const iconStyle = {
  fontSize: '2rem',
  color: '#000'
};

export const center = {
  display: "grid",
  placeItems: "center"
}

export const language = "en"

export const inputHandler = ( e: React.FormEvent<HTMLInputElement>, setter : ( value : React.SetStateAction<any> ) => void ) => {
  setter( e.currentTarget.value )
}

const App = () => {

  const nowDate = new Date()
  const today : string = nowDate.getDate() + "/" + ( nowDate.getMonth() + 1 ) + "/" + nowDate.getFullYear()

  const dataAccessor : CRUDHandler = RyokoApiLink.getInstance();

  const [ trips, setTrips ] = useState<Trip[]>( [] )
  const [ currentTrip, setCurrentTrip ] = useState<Trip>( new Trip( "placeholder" ) )

  const tripsState : TripState = { trips : trips, setter : setTrips }
  const currentTripState : CurrentTripState = { currentTrip : currentTrip, setter : setCurrentTrip }

  const currentUser : any = useAuth()

  useEffect( () => {}, [ currentUser ] )

  const dispatcher : Dispatcher = Dispatcher.getInstance()
  dispatcher.tripsState = tripsState
  dispatcher.currentTripState = currentTripState
  dispatcher.currentUser = currentUser

  const [ screen, setScreen ] = useState( "dashboard" )
  const [ detailedViewActivity, setDetailedViewActivity ] = useState( new Activity() )

  useEffect(
    () => {
      if ( currentUser != null )
        dataAccessor.getTripsOfUser( currentUser.uid, setTrips )
    },
      [ dataAccessor, currentUser ]
    )
  
  const showDetailedView = ( activity : Activity ) => {
    setScreen( "detailedActivityView" )
    setDetailedViewActivity( activity )
  }

  const displayState = ( state : string ) => { return screen === state ? "block" : "none" }

  const ongoingTrip = () => {
    for ( const trip of trips )
      if ( trip.dateIsInTrip( today ) )
        return trip
    
    return null
  }
  
  return (
    <div className="App">
      <Authentication currentUser={ currentUser } />
      { currentUser ?
        <main className="container">
          <div style={ { display : displayState( "dashboard" ) } }>
            <Dashboard showTrip={ ( trip : Trip ) => { setCurrentTrip( trip ); setScreen( "planning" ) } } newTrip={ () => setScreen( "newTrip" ) } ongoing={ ongoingTrip() } trips={ trips } tripSetter={ setCurrentTrip }/>
          </div>
          <div style={ { display : displayState( "planning" ) } }>
            <Planning trip={ currentTrip } back={ () => setScreen( "dashboard" ) } showDetailedView={ ( activity : Activity ) => showDetailedView( activity ) }/>
          </div>
          { screen === "detailedActivityView" ?
          <ActivityDetails back={ () => setScreen( "planning" ) } activity={ detailedViewActivity } dispatcher={ dispatcher }/> : null }
          { screen === "newTrip" ? <NewTrip dispatcher={ dispatcher } back={ () => setScreen( "dashboard" ) } /> : null }
        </main>
        : null
      }
    </div>
  );
}

export default App;
