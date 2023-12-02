import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import axios from 'axios';
import { GOOGLE_MAP_API_RESULT, IGOOGLE_MAP_API_RESPONSE } from 'src/types/gmap-api-response';

@Injectable()
export class ZipToCoordsService {

  async getPlaceByZip(zipCode: Number): Promise<any> {
    const apiKey = process.env.GOOGLE_MAP_API_TOKEN
    const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${zipCode}&key=${apiKey}&language=en`;
    try {
      const { data: {results} } = await axios.get<IGOOGLE_MAP_API_RESPONSE>(apiUrl);
      if (results && results.length > 0) {
        const place:GOOGLE_MAP_API_RESULT = results[0];
        return place;
      } else {
        throw new HttpException('No coordinates found for the provided zip code.', HttpStatus.UNPROCESSABLE_ENTITY);
      }
    } catch (error) {
      throw new HttpException('Failed to fetch coordinates',HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }
}