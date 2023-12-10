export interface IMapboxPlace {
    id: string;
    type: string;
    place_type: string[];
    relevance: number;
    properties: {
      mapbox_id: string;
    };
    text: string;
    place_name: string;
    bbox: number[];
    center: number[];
    geometry: {
      type: string;
      coordinates: number[];
    };
    context: {
      id: string;
      mapbox_id: string;
      wikidata: string;
      text: string;
      short_code?: string;
    }[];
  }
  
  export interface IMapboxResponse {
    type: string;
    query: string[];
    features: IMapboxPlace[];
    attribution: string;
  }