import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cities-feature',
  templateUrl: './cities-feature.component.html',
  styleUrls: ['./cities-feature.component.css']
})
export class CitiesFeatureComponent implements OnInit {

  constructor() { }

  cities = [
    {
      img: "assets/img/package/01.jpg",
      price: "10€",
      title: "Paris",
      url: "#"
    },
    {
      img: "assets/img/package/02.jpg",
      price: "9€",
      title: "Marseille",
      url: "#"
    },
    {
      img: "assets/img/package/03.jpg",
      price: "10€",
      title: "Strasbourg",
      url: "#"
    },
    {
      img: "assets/img/package/04.jpg",
      price: "8€",
      title: "Nantes",
      url: "#"
    }
  ]

  ngOnInit(): void {
  }

}
