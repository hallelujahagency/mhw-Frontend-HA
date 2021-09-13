import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header-brand-area',
  templateUrl: './header-brand-area.component.html',
  styleUrls: ['./header-brand-area.component.css']
})
export class HeaderBrandAreaComponent implements OnInit {

  constructor() { }

  proposition1 = 'pageAccueil.typedData.proposition1';
  proposition2 = 'pageAccueil.typedData.proposition2';
  proposition3 = 'pageAccueil.typedData.proposition3';

  ngOnInit(): void {
  }

  
}
