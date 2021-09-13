import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-logo-partner',
  templateUrl: './logo-partner.component.html',
  styleUrls: ['./logo-partner.component.css']
})
export class LogoPartnerComponent implements OnInit {

  constructor() { }

  slideDataLogo = [

    {
      id:1,
      img: "assets/img/logo-partner/logo-escaet-hd-900x332-fd-transparent.png",
      url:"https://www.escaet.fr"
    },
    {
      id:2,
      img: "assets/img/logo-partner/logo-france-active-bea20964.png",
      url:"https://www.franceactive.org"
    },
    {
      id:3,
      img: "assets/img/logo-partner/logo-provence-tourisme-200x-3366765d.png",
      url:"https://www.myprovence.fr"
    },
    {
      id:4,
      img: "assets/img/logo-partner/logo-marseille-innovation-1.png",
      url:"https://www.marseille-innov.org"
    },
    {
      id:5,
      img: "assets/img/logo-partner/region-sud-provence-alpes-cc3b4te-dazur-dcb9ab02.png"
    },
    {
      id:5,
      img: "assets/img/logo-partner/Logo-France-Tourisme-Lab-fd8c32f3.png"
    }
  ];

  slideConfig = {"slidesToShow": 4, "slidesToScroll": 4,"nav": true,"margin": 200,};


  ngOnInit(): void {
  }

}
