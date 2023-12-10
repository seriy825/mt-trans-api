import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import axios from 'axios';
import { IMapboxPlace, IMapboxResponse } from 'src/types/mapbox-api-response';

@Injectable()
export class ZipToCoordsService {

  async getPlaceByZip(zipCode: Number): Promise<any> {
    const MAPBOX_TOKEN = process.env.MAPBOX_ACCESS_TOKEN;
    const apiUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${zipCode}.json?country=US&types=postcode&access_token=${MAPBOX_TOKEN}`;
    
    try {
      const response = await axios.get<IMapboxResponse>(apiUrl);
      const { data } = response;

      if (data && data.features && data.features.length > 0) {
        const place:IMapboxPlace = data.features[0];
        return place;
      } else {
        throw new HttpException('No coordinates found for the provided zip code.', HttpStatus.UNPROCESSABLE_ENTITY);
      }
    } catch (error) {
      throw new HttpException('Failed to fetch coordinates',HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }
}