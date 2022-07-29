import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  public requestsLoading: any = {
    'load-page': { loading: true, error: false },
  }

  constructor() { }

  ngOnInit(): void {
    setTimeout(() => this.requestsLoading[`load-page`] = { loading: false, error: false }, 250);
  }

}
