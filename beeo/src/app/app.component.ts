import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  formDisplay():void{
    let form = document.querySelector(".form");
    //@ts-ignore
    form.classList.toggle("active")
  }
}
