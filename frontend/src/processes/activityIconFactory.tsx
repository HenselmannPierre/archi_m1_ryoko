export const getIconForType = ( type : string ) => {
    let name = ""
    switch ( type ) {
        case "hotel" :
            name = "lodging"
            break
        case "restaurant" :
            name = "restaurant"
            break
        case "museum" :
            name = "museum"
            break
        default:
            name = "museum"
            break
    }
    return "resources/activityIcons/" + name + ".svg"
}