export class Activity {
    dateTime : string
    activityName : string
    type : string
    placeId : string
    activityId : string

    constructor( dateTime = "", activityName = "", type = "", placeID = "", activityId = "" ) {
        this.activityName = activityName
        this.dateTime = dateTime
        this.type = type
        this.placeId = placeID
        this.activityId = activityId
    }

    getMinutes = ( time : string ) => {
        const times = time.split( ':' )
        return parseInt( times[ 0 ] ) * 60 + parseInt( times[ 1 ] )
    }

    timeDifference = ( activity : Activity ) => {
        return this.getMinutes( this.getTime() ) - this.getMinutes( activity.getTime() )
    }

    getTime() : string {
        return this.dateTime.split( ' ' )[ 1 ]
    }

    getDate() : string {
        return this.dateTime.split( ' ' )[ 0 ]
    }
}