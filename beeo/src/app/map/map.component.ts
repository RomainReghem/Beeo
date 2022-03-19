import { AfterViewInit, Component } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet-draw';
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
    this.mapService.initmap((this.map));
  }

  private initMap(): void {



    //  let myIcon = L.icon({
    //    iconUrl: "https://tinyimg.io/i/qfHYyxS.png",
    //  iconSize: [35,35],});
     
    //  let iconOptions = {
    //   icon:myIcon
    //  }
    //  let marker = new L.Marker([43.6920341,1.8086329] , iconOptions);
    
    this.map = L.map('map', {preferCanvas:true}).setView([43.924673107953865,2.075675106215357], 11);
    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    
    // marker.addTo(this.map);
    tiles.addTo(this.map);

    //let drawControl = L.
  }

  

  
}