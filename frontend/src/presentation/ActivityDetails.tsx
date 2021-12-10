import moment from "moment";
import { useEffect, useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { iconStyle, inputHandler } from "../App";
import { Activity } from "../model/Activity";
import { Dispatcher } from "../processes/Dispatcher";
import { googlePlacesAPIKey, GooglePlacesInterface } from "../processes/GooglePlacesInterface";

export function ActivityDetails( props : { dispatcher : Dispatcher, activity : Activity, back : () => void } ) {

    const [ time, setTime ] = useState( "" )
    const [ date, setDate ] = useState( "2000-01-01" )
    const [ name, setName ] = useState( "" )
    const [ changed, setChanged ] = useState( false )
    const [ showModal, setShowModal ] = useState( false )

    const [ placeName, setPlaceName ] = useState<any>()
    const [ placeId, setPlaceId ] = useState( "" )

    useEffect(
        () => {
            GooglePlacesInterface.getInstance().getPlaceNameFromPlaceId( "place", props.activity.placeId, setPlaceName )
        },
        [ props.activity.placeId ]
    )

    useEffect(
        () => {
            setTime( props.activity.getTime() )
            setDate( moment( moment( props.activity.getDate(), 'DD/MM/YYYY' ) ).format( 'YYYY-MM-DD' ) )
            setName( props.activity.activityName )
            setPlaceId( props.activity.placeId )
        },
        [ props.activity ]
    )

    useEffect(
        () => {
            const activ = props.activity
            setChanged( activ.activityName !== name || activ.placeId !== placeId || activ.dateTime !== moment( moment( date, 'YYYY-MM-DD' ) ).format( 'DD/MM/YYYY' ) + " " + time )
        },
        [ time, date, name, props.activity.activityName, props.activity.dateTime, props.activity, placeId ]
    )

    const controls = () => {
        return (
            <div className="form-group my-5">
                <button type="button" className="btn btn-danger" onClick={ props.back }>Cancel</button>
                <button type="button" className="btn btn-primary float-end" onClick={ () => { props.dispatcher.saveActivity( props.activity, name, moment( moment( date, 'YYYY-MM-DD' ) ).format( 'DD/MM/YYYY' ) + " " + time, placeId ); props.back() } }>Save</button>
            </div>
        )
    }

    const deleteActivityModal = () => {
        return (
            <div>
                <div className="modal-backdrop opacity-50"></div>
                <div id="deleteActivityModal" className="modal d-block" role="dialog">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Delete this activity ?</h5>
                            </div>
                            <div className="modal-footer justify-content-between">
                                <button onClick={ () => setShowModal( false ) } type="button" className="btn btn-danger">Cancel</button>
                                <button onClick={ () => { props.dispatcher.deleteActivity( props.activity ); setShowModal( false ); props.back() } } type="button" className="btn btn-primary">Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div>
            { showModal ? deleteActivityModal() : null }
            <div className="row p-3 justify-content-between">
                <button onClick={ props.back } className="btn btn-outline-secondary col-2 my-auto">
                    <i className="bi bi-chevron-left" style={ iconStyle }></i>
                </button>
                <button onClick={ () => setShowModal( true ) } className="btn btn-outline-secondary col-2 my-auto">
                    <i className="bi bi-trash" style={ iconStyle }></i>
                </button>
            </div>
            <div className="row">
                <form action="">
                    <div className="form-group">
                        <label htmlFor="">Titre :</label>
                        <input className="form-control" type="text" value={ name } onChange={ e => inputHandler( e, setName ) } />
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Date :</label>
                        <input className="form-control" type="date" value={ date } onChange={ e => inputHandler( e, setDate ) } />
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Horaire :</label>
                        <input className="form-control" type="time" value={ time } onChange={ e => inputHandler( e, setTime) } />
                    </div>
                    <div className="my-3 form-group">
                        <GooglePlacesAutocomplete apiKey={ googlePlacesAPIKey } selectProps={ { placeName, onChange : setPlaceName, placeholder : placeName } } />
                    </div>
                    <div className="text-center form-group">
                        <button className="btn btn-primary my-3" type="button" onClick={ () => GooglePlacesInterface.getInstance().getSuggestion( setPlaceName, setPlaceId ) }>Suggest a place !</button>
                    </div>
                    { changed ? controls() : "" }
                </form>
            </div>
        </div>
    )
}