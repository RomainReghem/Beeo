import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//import * as L from 'leaflet';
declare const L: any;
import 'Leaflet.Deflate';
import 'leaflet-draw';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  pollusolIcon = L.icon({
    iconUrl: 'https://tinyimg.io/i/oQxkY10.png',
    iconSize: [36, 36]
  });
  farmsIcon = L.icon({
    iconUrl: 'https://tinyimg.io/i/qfHYyxS.png',
    iconSize: [36, 36]
  });

  userRange:number = 3000;
  greenData: string = '../../assets/onlytarn.json';
  pollusolData: string = 'https://api.jsonbin.io/b/620bc6fcca70c44b6e99153b';
  inst_indusData: string = 'https://api.jsonbin.io/b/620e8f741b38ee4b33bfed2b/1';
  farmsData: string = '../../assets/farmsData.json'
  riversData: string = '../../assets/riversData.json'
  greenZones = L.layerGroup();
  pollusolLayer = L.deflate({ minSize: 100, markerOptions: { icon: this.pollusolIcon } });
  inst_indusLayer = L.layerGroup();
  editableLayers = new L.FeatureGroup();
  farmsLayer = L.layerGroup();
  riversLayer = L.layerGroup();
  userLayer = new L.layerGroup();

  map: L.Map | undefined;

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

  customMarker = L.Icon.extend({
    options: {
      shadowUrl: null,
      iconAnchor: new L.Point(12, 12),
      iconSize: new L.Point(24, 24),
      iconUrl: 'https://emassi.fr/wp-content/uploads/2017/10/Map-Marker-PNG-File.png'
    }
  });

  // options = {
  //   position: 'topright',
  //   draw: {
  //     polyline: {
  //       shapeOptions: {
  //         color: '#f357a1',
  //         weight: 10
  //       }
  //     },
  //     polygon: {
  //       allowIntersection: false, // Restricts shapes to simple polygons
  //       drawError: {
  //         color: '#e1e100', // Color the shape will turn when intersects
  //         message: '<strong>Oh snap!<strong> you can\'t draw that!' // Message that will show when intersect
  //       },
  //       shapeOptions: {
  //         color: '#bada55'
  //       }
  //     },
  //     circle: false, // Turns off this drawing tool
  //     rectangle: {
  //       shapeOptions: {
  //         clickable: false
  //       }
  //     },
  //     marker: {
  //       icon: new this.customMarker()
  //     }
  //   },
  //   edit: {
  //     featureGroup: this.editableLayers, //REQUIRED!!
  //     remove: false
  //   }
  // };

  // drawControl = new L.Control.Draw(this.options);  

  constructor(private http: HttpClient) {

  }

  initmap(map): void {
    this.map = map;
    this.drawPolygons();
    map.addLayer(this.editableLayers);
    //map.addControl(this.drawControl);   
    map.on('click', (e) => {
      let marker = new  L.marker(e.latlng, {
        icon: L.icon({
          iconUrl: 'https://emassi.fr/wp-content/uploads/2017/10/Map-Marker-PNG-File.png',
          iconSize: [12, 12]
        })
      }).addTo(this.userLayer);
      L.circle(e.latlng, {radius: this.userRange}).addTo(this.userLayer).addTo(this.userLayer);
    });
    this.userLayer.addTo(map);

  }

  drawPolygons(): void {
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
        // console.log(c.geometry);
        let point = L.geoJSON(c.geometry, {
          pointToLayer: function (feature, latlng) {
            return L.marker(latlng, {
              icon: L.icon({
                iconUrl: 'https://i.imgur.com/SxMOwaA.png',
                iconSize: [36, 36]
              })
            })
          }
        }).addTo(this.inst_indusLayer);
        point.bindPopup("<center><h1>Installation industrielle</h1><img style='width:50%;'src='https://i.imgur.com/SxMOwaA.png'/><p>Type d'industrie : " + c.properties.lib_naf + "</p><p>Site classé " + c.properties.lib_seveso + "</p><a target=_blank href='" + c.properties.url_fiche + "'>Cliquer pour plus d'infos<a></center>");
      }
    });
    this.http.get(this.farmsData).subscribe((res: any) => {
      for (const c of res.data) {
        let point1 = L.geoJSON(c.geometry, {
          pointToLayer: function (feature, latlng) {
            return L.marker(latlng, {
              icon: L.icon({
                iconUrl: 'https://tinyimg.io/i/qfHYyxS.png',
                iconSize: [36, 36]
              })
            })
          }
        }).addTo(this.farmsLayer);
        point1.bindPopup("<center><h1>Ferme</h1><img style='width:50%;'src='https://tinyimg.io/i/96r0nxA.png'/><p>Nom : " + c.properties.Nom + "</p><p>Ville " + c.properties.Ville + "<p> Address: " + c.properties.Address + "</p>" + "<p> Produits: " + c.properties.Produits + "</p>" + "</p><a target=_blank href='" + c.properties.Location + "'>Cliquer pour Direction<a></center>");
      }
    });




    this.http.get(this.riversData).subscribe((res: any) => {
      for (const c of res.data) {
        let point1 = L.geoJSON(c.geometry, {
          pointToLayer: function (feature, latlng) {
            return L.marker(latlng, {
              icon: L.icon({
                iconUrl: 'https://tinyimg.io/i/s4mSpp6.png',
                iconSize: [36, 36]
              })
            })
          }
        }).addTo(this.riversLayer);
        point1.bindPopup("<center><h1>Rivière</h1><img style='width:50%;'src='https://tinyimg.io/i/s4mSpp6.png'/><p>Libelle : " + c.properties.Libelle + "</p><p>Commune:  " + c.properties.Commune + "<p> Localisation: " + c.properties.Localisation + "</p>" + "<p> Resultat: " + c.properties.Resultat +"  "+ this.calculateRiverNote(c.properties.Resultat) + "</p>");
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
  farmsDisplay(): void {
    this.farmsLayer.addTo(this.map);
  }

  farmsHide(): void {
    this.farmsLayer.removeFrom(this.map);
  }
  riversDisplay(): void {
    this.riversLayer.addTo(this.map);
  }

  riversHide(): void {
    this.riversLayer.removeFrom(this.map);
  }

  rangeChangedByUser(n):void{
    this.userRange = n;
  }

  resetUserLayer():void{
    this.userLayer.clearLayers();
    }
    calculateRiverNote(note): string {
      let noteDiv=""
      if (note >= 17){
        noteDiv = "<span class='noteDiv' style='background-color:rgb(113, 230, 253)';>Très Bonne</div>"
      }
      if (note < 17 && 14.5<= note){
        noteDiv = "<span class='noteDiv' style='background-color:rgb(69, 231, 118)';>Bonne</div>"
      }
      if (note < 14.5 && 10.5<= note){
        noteDiv = "<span class='noteDiv' style='background-color:yellow';>Moyenne</div>"
      }
      if (note < 10.5 && 6<= note){
        noteDiv = "<span class='noteDiv' style='background-color:orange';>Médiocre</div>"
      }
      if (note < 6){
        noteDiv = "<span class='noteDiv' style='background-color:red';>Mauvaise</div>"
      }
      return noteDiv;

    }

}


