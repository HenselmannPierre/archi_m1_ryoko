import axios from "axios"
import { language } from "../App"

export const googlePlacesAPIKey = "AIzaSyAuZNuP7Unb5FHqnPXSFwYCin4CzDh6t38"

const PROXY_URL = "https://cors-anywhere.herokuapp.com/"

export class GooglePlacesInterface {

    protected static _instance : GooglePlacesInterface

    public static getInstance() : GooglePlacesInterface {
        return this._instance || ( this._instance = new this() )
    }

    private detailsFromId = ( id : string ) => {
        return axios.get<never, any>( PROXY_URL + "https://maps.googleapis.com/maps/api/place/details/json?language=" + language + "&place_id=" + id + "&key=" + googlePlacesAPIKey )
    }

    private placeNameFromResponse = ( mode : "city" | "place", response : any, destSetter : ( a : string ) => void ) => {
        if ( response.data.result !== undefined ) {
            // let res = response.data.result.address_components
            // destSetter( res[ 0 ].long_name + ", " + res[ res.length - 1 ].long_name )
            
            if ( mode === "place" )
                destSetter( response.data.result.name )
            else {
                let res = response.data.result.address_components
                for ( let component of res ) {
                    let types : any[] = component.types
                    if ( types.includes( "locality" ) )
                        destSetter( component.long_name )
                }
            }
        }
        else {
            console.warn( "place name not found" )
            destSetter( "placeholder" )
        }
    }

    private countryFromResponse = ( response : any, destSetter : ( a : string ) => void ) => {
        if ( response.data.result !== undefined ) {
            let res = response.data.result.address_components
            for ( let component of res ) {
                let types : any[] = component.types
                if ( types.includes( "country" ) )
                    destSetter( component.long_name )
            }
        }
        else {
            console.warn( "country not found" )
            destSetter( "placeholder" )
        }
    }

    getPlaceNameFromPlaceId = ( mode : "city" | "place", id : string, destSetter : ( a : string ) => void ) => {
        this.detailsFromId( id ).then( response => this.placeNameFromResponse( mode, response, destSetter ) )
    }

    getCountryFromPlaceId = ( id : string, destSetter : ( a : string ) => void ) => {
        this.detailsFromId( id ).then( response => this.countryFromResponse( response, destSetter ) )
    }
    
    getSuggestion = ( setPlaceName : React.Dispatch<any>, setPlaceId : React.Dispatch<any> ) => {
        axios.get<never,any>( PROXY_URL + "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=45.4642035%2C9.189982&radius=1500&type=tourist_attraction&key=" + googlePlacesAPIKey )
        .then(
            response => {
                let res = response.data.results
                res.sort( ( a : any, b : any ) => { return b.rating - a.rating } )

                let index = Math.round( Math.random() * res.length )
                
                this.getPlaceNameFromPlaceId( "place", res[ index ].place_id, setPlaceName )
                setPlaceId( res[ index ].place_id )
            }
        )
    }
}