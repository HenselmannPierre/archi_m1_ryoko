import React, { useState } from 'react';
import { iconStyle, inputHandler } from '../App';
import { Dispatcher } from '../processes/Dispatcher';

function NewTrip( props : { dispatcher : Dispatcher, back : () => void } ) {

    const [ title, setTitle ] = useState( "" )

    return (
        <div className="text-center">
            <form className="container">
                <div className="row py-3">
                    <button onClick={ props.back } className="btn btn-outline-secondary col-2 my-auto">
                        <i className="bi bi-chevron-left" style={ iconStyle }></i>
                    </button>
                </div>
                <div className="form-group">
                    <label htmlFor="title" className="my-3 display-6">Choose a title for your trip :</label>
                    <input type="text" name="title" className="form-control my-3" placeholder="Trip title..." value={ title } onChange={ e => inputHandler( e, setTitle ) }/>
                    <button className="btn btn-primary my-3" type="button" onClick={ () => { props.dispatcher.createTrip( title ); props.back() } }>Add trip</button>
                </div>
            </form>
        </div>
    );
}

export default NewTrip;