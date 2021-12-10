import { Activity } from "./Activity";

export class Trip {
    id : string
    userId : string
    tripName : string
    activities : Activity[]

    compareDates = ( a : string, b : string ) => {
        if ( a === b )
            return 0
        else if ( a !== undefined && b !== undefined ) {
            const infoA = a.split( '/' )
            const infoB = b.split( '/' )

            if ( infoA[ 2 ] < infoB[ 2 ] )
                return -1
            else if ( infoA[ 2 ] > infoB[ 2 ] )
                return 1
            else if ( infoA[ 1 ] < infoB[ 1 ] )
                return -1
            else if ( infoA[ 1 ] > infoB[ 1 ] )
                return 1
            else if ( infoA[ 0 ] < infoB[ 0 ] )
                return -1
            else
                return 1
        }
        else
            return 0
    }

    getDates() : string[] {
        let list : string[] = []
        this.activities.forEach( activity => {
            let date = activity.getDate()
            if ( !list.includes( date ) )
                list.push( date )
        } );
        list.sort( ( a, b ) => this.compareDates( a, b ) )
        return list
    }

    dateIsInTrip = ( date : string ) => {
        const dates : string[] = this.getDates()
        return ( this.compareDates( date, dates[ 0 ] ) === 1 && this.compareDates( date, dates[ dates.length - 1 ] ) === -1 )
    }

    getActivities( date : string ) : Activity[] {
        let list : Activity[] = []
        this.activities.forEach( activity => {
            if ( activity.getDate() === date )
            list.push( activity )
        } );
        return list
    }

    constructor( id = "", userId = "", tripName = "", activities : Activity[] = [] ) {
        this.id = id
        this.userId = userId
        this.tripName = tripName
        this.activities = activities.sort( ( a, b ) => this.compareDates( a.getDate(), b.getDate() ) )
    }
}