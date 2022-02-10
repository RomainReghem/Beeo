import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as L from 'leaflet';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  baseUrl: string = 'http://localhost:3000/data';

  constructor(private http: HttpClient){

  }

  style(feature) {
    return {
      fillColor: "#25633D",
      opacity: 0.8,
      weight:1,
      color: 'white',
      fillOpacity: 0.7
    };
  }

  drawPolygons(map: L.Map): void{
    const marker = L.marker([42.949162366328906, 2.563953491777443]).addTo(map);
    this.http.get(this.baseUrl).subscribe((res: any) => {
      for(const c of res){
        //let polygon = L.GeoJSON.geometryToLayer(c.geometry).addTo(map);
        let polygon = L.geoJSON(c.geometry,{style:this.style}).addTo(map);
        console.log(c.properties.LBL_CULTU);

        polygon.bindPopup("<center><h1>Exploitation biologique</h1><img style='width:100%;'src='https://i.imgur.com/2X88trj.jpeg'/><p>Type de culture :"+ c.properties.LBL_CULTU + "</p><p>Surface : " + c.properties.SURFACE_HA + " hectares</p></center>");
        
      }

    });
  }
}
