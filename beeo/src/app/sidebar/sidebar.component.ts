import { Component } from '@angular/core';
import { MapService } from '../_services/map.service';
import { ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

  constructor(private mapService: MapService){}
  @ViewChild('layer1') layer1: ElementRef | undefined;
  layer1check():void {
    if(this.layer1?.nativeElement.checked) this.mapService.greenZonesDisplay();    
    else this.mapService.greenZonesHide();
  }


}