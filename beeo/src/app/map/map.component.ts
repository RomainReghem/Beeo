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


    let myLatitude = 0
    let myLongitude = 0

    navigator.geolocation.getCurrentPosition((position) => {
      // return the coordinates
     let myPosition = position.coords;
       myLatitude = myPosition.latitude;
       myLongitude = myPosition.longitude;
      let marker = L.marker([myLatitude, myLongitude],{
        icon: L.icon({
          iconUrl: 'https://tinyimg.io/i/yPFowhA.png',
          iconSize: [36, 36]
        })
      }).addTo(this.map);
      this.map.setView([myLatitude,myLongitude], 11)
      

  }, (error) => {
      // check if the user denied geolocation, or if there was any other problem
      if (error.code == error.PERMISSION_DENIED) {
          alert('Geolocation has been disabled on this page, please review your browser\'s parameters');
      } else {
          alert('Unable to find your position, try again later.');
      }
  }, {
      timeout: 10000
  });


    
    
    this.map = L.map('map', {preferCanvas:true});
    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    
    // marker.addTo(this.map);
    tiles.addTo(this.map);

    //let drawControl = L.
   


    
    
  }

  



  

  
}

