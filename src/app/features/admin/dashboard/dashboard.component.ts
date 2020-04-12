import { Component, OnInit, NgZone, Renderer2, ViewChild, ElementRef } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {


  @ViewChild('datetime', {static: false}) dt: ElementRef;
  public count = 0;

  constructor(
    private zone: NgZone,
    private renderer: Renderer2,
    public datepipe: DatePipe
  ) {
    this.zone.runOutsideAngular(() => {
      setInterval(() => {
        this.renderer.setProperty(this.dt.nativeElement, 'textContent', this.datepipe.transform(new Date(), 'EEEE, MMMM y, h:mm a'));
      }, 1000);
    });
  }

  ngOnInit() {
  }

}
