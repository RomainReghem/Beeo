import { Component } from '@angular/core';
import { MapService } from '../_services/map.service';
import { ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

  n:number = 3000;

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
  @ViewChild('layer4') layer4: ElementRef | undefined;
  layer4check():void {
    if(this.layer4?.nativeElement.checked) this.mapService.farmsDisplay();    
    else this.mapService.farmsHide();
  }

  @ViewChild('range') range: ElementRef | undefined;
  rangeChanged(event):void{
    if(this.range)
    //console.log(event.target.value);
    this.n = event.target.value;
    this.mapService.rangeChangedByUser(this.n);
  }

  reset():void{
    this.mapService.resetUserLayer();
  }

}