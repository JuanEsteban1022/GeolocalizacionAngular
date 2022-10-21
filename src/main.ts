import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import Mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"

Mapboxgl.accessToken = 'pk.eyJ1IjoianVhbmVzdGJhbjEwMjIiLCJhIjoiY2w5OXpuZ3JzM2xtYzNvb2l2anU2YzlsYyJ9.RQOtFeKv7D4KfS_teNEc5w';

if (!navigator.geolocation) {
  alert('Navegador no soporta la geolocation');
  throw new Error('Navegador no soporta la geolocation')
}

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
