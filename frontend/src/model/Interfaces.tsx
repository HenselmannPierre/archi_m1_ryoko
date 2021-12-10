import React from "react";
import { Trip } from "./Trip";

export interface TripState {
    trips : Trip[],
    setter : React.Dispatch<React.SetStateAction<Trip[]>>
}

export interface CurrentTripState {
    currentTrip : Trip,
    setter : React.Dispatch<React.SetStateAction<Trip>>
}

export interface CurrencyType {
    ISO : string
    name : string
    symbol : string
}

export interface CurrencyState {
    value : CurrencyType
    setter : React.Dispatch<React.SetStateAction<CurrencyType>>
}

export interface CountryState {
    value : string
    setter : React.Dispatch<React.SetStateAction<string>>
}

export interface TemperatureState {
    value : number
    setter : React.Dispatch<React.SetStateAction<number>>
}

export interface PlaceState {
    value : string
    setter : React.Dispatch<React.SetStateAction<string>>
}