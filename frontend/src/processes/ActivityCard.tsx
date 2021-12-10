import { GooglePlacesInterface } from "./GooglePlacesInterface"

export const init = ( id : string, setter : React.Dispatch<React.SetStateAction<string>> ) => {
    GooglePlacesInterface.getInstance().getPlaceNameFromPlaceId( "place", id, setter )
}