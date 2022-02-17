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

  @ViewChild('layer2') layer2: ElementRef | undefined;
  layer2check():void {
    if(this.layer2?.nativeElement.checked) this.mapService.pollusolDisplay();    
    else this.mapService.pollusolHide();
  }

  @ViewChild('layer3') layer3: ElementRef | undefined;
  layer3check():void {
    if(this.layer3?.nativeElement.checked) this.mapService.inst_indusDisplay();    
    else this.mapService.inst_indusHide();
  }


}