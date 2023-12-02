export type GOOGLE_MAP_API_POINT = {
    lat:number
    lng:number
}
export type GOOGLE_MAP_API_BOUNDS = {
    northeast:GOOGLE_MAP_API_POINT
    southwest:GOOGLE_MAP_API_POINT
}
export type GOOGLE_MAP_API_GEOMETRY = {
    bounds:GOOGLE_MAP_API_BOUNDS
    location:GOOGLE_MAP_API_POINT
    location_type:string
    viewport:GOOGLE_MAP_API_BOUNDS
}
export type GOOGLE_MAP_API_ADDRESS = {
    long_name:string
    short_name:string
    types:string[]
}
export type GOOGLE_MAP_API_RESULT = {
    address_components:GOOGLE_MAP_API_ADDRESS[]
    formatted_address:string
    geometry:GOOGLE_MAP_API_GEOMETRY
    place_id:string
    postcode_localities:string[]
    types:string[]
}
export interface IGOOGLE_MAP_API_RESPONSE {
    results:GOOGLE_MAP_API_RESULT[],
    status:string
}