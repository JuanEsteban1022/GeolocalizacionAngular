import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Popup, Marker, Map } from 'mapbox-gl';
import { PlacesService, MapService } from '../../services';

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.css']
})
export class MapViewComponent implements AfterViewInit {

  @ViewChild('mapDiv') mapDivElement!: ElementRef

  constructor(private placeService: PlacesService, private mapService: MapService) { }

  ngAfterViewInit(): void {

    if (!this.placeService.userLocation) throw Error('this.placeService.userLocation no existe');

    const map = new Map({
      container: this.mapDivElement.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.placeService.userLocation,
      zoom: 15,
      //projection: 'globe' // display the map as a 3D globe
    });

    const popup = new Popup()
      .setHTML(`
      <h6>Aquí Estoy!!</h6>
      <span>Ubicación actual</span>
    `);
    new Marker({ color: 'red' })
      .setLngLat(this.placeService.userLocation)
      .setPopup(popup)
      .addTo(map)

    this.mapService.setMap(map);
  }

}
