import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as L from 'leaflet';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  greenData: string = 'https://raw.githubusercontent.com/RomainReghem/Beeo/master/beeo/src/onlytarn.json';
  pollusolData:string = 'https://api.jsonbin.io/b/620bc6fcca70c44b6e99153b';
  greenZones = L.layerGroup();
  pollusolLayer = L.layerGroup();
  map;

  constructor(private http: HttpClient) {

  }

  style(feature) {
    return {
      fillColor: "#25633D",
      opacity: 0.8,
      weight: 1,
      color: 'white',
      fillOpacity: 0.7
    };
  }

  styleRed(feature) {
    return {
      fillColor: "#d15249",
      opacity: 0.8,
      weight: 1,
      color: 'white',
      fillOpacity: 0.7
    };
  }

  drawPolygons(map: L.Map): void {    
    this.map = map;
    const marker = L.marker([43.924673107953865,2.075675106215357]).addTo(map);    
    this.http.get(this.greenData).subscribe((res: any) => {
      for (const c of res.data) {
        //let polygon = L.GeoJSON.geometryToLayer(c.geometry).addTo(map);        
        let polygon = L.geoJSON(c.geometry, { style: this.style }).addTo(this.greenZones);
        polygon.bindPopup("<center><h1>Exploitation biologique</h1><img style='width:100%;'src='https://i.imgur.com/2X88trj.jpeg'/><p>Type de culture :" + c.properties.LBL_CULTU + "</p><p>Surface : " + c.properties.SURFACE_HA + " hectares</p></center>");
      }
    });

    this.http.get(this.pollusolData).subscribe((res: any) => {
      for (const c of res.data) {
        console.log(c);
        let polygon = L.geoJSON(c, { style: this.styleRed }).addTo(this.pollusolLayer);
        polygon.bindPopup("<center><h1>Zone polluée</h1></center>");
        map.openPopup;
      }
    });


  }

  greenZonesDisplay():void{
    this.greenZones.addTo(this.map);
  }

  greenZonesHide():void{
    this.greenZones.removeFrom(this.map);
  }

  pollusolDisplay():void{
    this.pollusolLayer.addTo(this.map);
  }

  pollusolHide():void{
    this.pollusolLayer.removeFrom(this.map);
  }
}
