import { Component } from '@angular/core';
import { MapService, PlacesService } from '../../services';
import { Feature } from '../../interfaces/places.interface';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent {

  public selectedId: string = '';

  constructor(private placesService: PlacesService, private mapService: MapService) { }

  get isLoadingPlaces() {
    return this.placesService.isLoadingPlaces;
  }

  get places() {
    return this.placesService.places;
  }

  flyTo(place: Feature) {
    this.selectedId = place.id;
    const [lng, lat] = place.center;
    this.mapService.flyTo([lng, lat]);
  }

  getDirection(place: Feature) {
    if (!this.placesService.userLocation) throw Error('No hay userlocation');
    this.placesService.detelePlaces();

    const start = this.placesService.userLocation!;
    const end = place.center as [number, number];

    this.mapService.getRouteBetweenPoints(start, end);
  }

}
