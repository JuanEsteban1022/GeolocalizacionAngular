import { Injectable } from '@angular/core';
import { PlacesApiClient } from '../apis/placesApiClient';
import { PlacesResponse, Feature } from '../interfaces/places.interface';
import { MapService } from './map.service';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  public userLocation?: [number, number];
  public isLoadingPlaces: boolean = false;
  public places: Feature[] = [];

  get isUserLocationReady(): boolean {
    // !! significa que no hay un valor y lo niega, si era false pasaria a true
    return !!this.userLocation;
  }

  constructor(private placesApi: PlacesApiClient, private mapService: MapService) { this.getUserLocation(); }

  public async getUserLocation(): Promise<[number, number]> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          this.userLocation = [coords.longitude, coords.latitude]
          resolve(this.userLocation)
        }, (err => {
          alert('No se pudo obtener la geolocation');
          console.log(err);
          reject();
        }));
    });
  }

  getPlaceByQuery(query: string = '') {

    if (!this.userLocation) throw Error('No hay userLocation')
    this.isLoadingPlaces = true;
    this.placesApi.get<PlacesResponse>(`/${query}.json`, {
      params: {
        proximity: this.userLocation?.join(',')
      }
    })
      .subscribe(resp => {
        this.isLoadingPlaces = false;
        this.places = resp.features;

        this.mapService.createMarkerPlaces(this.places, this.userLocation!);
      });
  }
  detelePlaces() {
    this.places = [];
  }
}
