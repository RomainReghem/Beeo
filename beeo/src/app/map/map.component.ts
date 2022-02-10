import { AfterViewInit, Component } from '@angular/core';
import * as L from 'leaflet';
import { MapService } from '../_services/map.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements AfterViewInit {

  private map;
  
  constructor(private mapService: MapService){}

  ngAfterViewInit(): void{
    this.initMap();
    this.mapService.drawPolygons((this.map));
  }

  private initMap(): void {
    
    this.map = L.map('map').setView([42.949162366328906, 2.563953491777443], 15);
    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);
  }

  
}