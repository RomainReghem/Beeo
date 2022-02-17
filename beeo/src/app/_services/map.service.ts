import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as L from 'leaflet';
import 'Leaflet.Deflate';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  pollusolIcon = L.icon({
    iconUrl: 'https://tinyimg.io/i/oQxkY10.png',
    iconSize: [36, 36]
  });

  greenData: string = 'https://raw.githubusercontent.com/RomainReghem/Beeo/master/beeo/src/onlytarn.json';
  pollusolData: string = 'https://api.jsonbin.io/b/620bc6fcca70c44b6e99153b';
  inst_indusData: string = 'https://api.jsonbin.io/b/620e8f741b38ee4b33bfed2b/1';
  greenZones = L.layerGroup();
  pollusolLayer = L.deflate({ minSize: 100, markerOptions: { icon: this.pollusolIcon } });
  inst_indusLayer = L.layerGroup();
  //features = L.deflate({minSize:10});
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
    //const marker = L.marker([43.904753568818144,2.1377746548512513]).addTo(map);
    this.http.get(this.greenData).subscribe((res: any) => {
      for (const c of res.data) {
        if (c.geometry) {
          let polygon = L.geoJSON(c.geometry, { style: this.style }).addTo(this.greenZones);
          polygon.bindPopup("<center><h1>Exploitation biologique</h1><img style='width:100%;'src='https://i.imgur.com/2X88trj.jpeg'/><p>Type de culture :" + c.properties.LBL_CULTU + "</p><p>Surface : " + c.properties.SURFACE_HA + " hectares</p></center>");
        }
      }
    });

    this.http.get(this.pollusolData).subscribe((res: any) => {
      for (const c of res.data) {        
        let polygon = L.geoJSON(c, { style: this.styleRed }).addTo(this.pollusolLayer);
        polygon.bindPopup("<center><h1>Zone polluée</h1><img style='width:100%;'src='https://tinyimg.io/i/IU9CV0y.png'/></center>");        
      }
    });

    this.http.get(this.inst_indusData).subscribe((res: any) => {
      for (const c of res.data) {
        console.log(c.geometry);
        let point = L.geoJSON(c.geometry,{pointToLayer:function(feature, latlng){return L.marker(latlng, {icon: L.icon({
          iconUrl: 'https://i.imgur.com/SxMOwaA.png',
          iconSize: [36, 36]
        })})}}).addTo(this.inst_indusLayer);
        point.bindPopup("<center><h1>Installation industrielle</h1><img style='width:50%;'src='https://i.imgur.com/SxMOwaA.png'/><p>Type d'industrie : " + c.properties.lib_naf+ "</p><p>Site classé " + c.properties.lib_seveso+ "</p><a target=_blank href='" + c.properties.url_fiche + "'>Cliquer pour plus d'infos<a></center>");        
      }
    });


  }

  greenZonesDisplay(): void {
    this.greenZones.addTo(this.map);
  }

  greenZonesHide(): void {
    this.greenZones.removeFrom(this.map);
  }

  pollusolDisplay(): void {
    this.pollusolLayer.addTo(this.map);
  }

  pollusolHide(): void {
    this.pollusolLayer.removeFrom(this.map);
  }

  inst_indusDisplay(): void {
    this.inst_indusLayer.addTo(this.map);
  }

  inst_indusHide(): void {
    this.inst_indusLayer.removeFrom(this.map);
  }
}
