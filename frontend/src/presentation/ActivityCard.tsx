import { useEffect, useState } from 'react';
import { Activity } from '../model/Activity';
import { getIconForType } from '../processes/activityIconFactory';
import { init } from '../processes/ActivityCard';

export default function ActivityCard( props : { activity : Activity } ) {

    const [ placeName, setPlaceName ] = useState( "" )

    useEffect(
        () => init( props.activity.placeId, setPlaceName ),
        [ props.activity.placeId ]
    )

    return (
        <div className="card flex-row my-3 shadow rounded-lg">
            <img src={ getIconForType( props.activity.type ) } alt={ props.activity.type } className="card-img-top w-25 p-2" />
            <div className="card-body row">
                <h4 className="card-title">{ props.activity.activityName }</h4>
                <h6 className="card-text"><span>{ props.activity.type }</span><span className="float-end">{ props.activity.getTime() }</span></h6>
                <p className="card-text">Place : { placeName }</p>
            </div>
        </div>
    );
}