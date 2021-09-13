import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-why-choose',
  templateUrl: './why-choose.component.html',
  styleUrls: ['./why-choose.component.css']
})
export class WhyChooseComponent implements OnInit {

  constructor() { }

  choosen = [
    {
      icon: "flaticon-hotel",
      title: "Hebergement",
      class: "style-01",
      description: "L'aventure commence en choissant le bon logement pour le confort de tous"

    },
    {
      icon: "flaticon-plane",
      title: "Transport",
      class: "style-02",
      description: "Utiliser le mode transport le plus propre tout en réduisant votre empreinte carbone"

    },
    {
      icon: "flaticon-accounting",
      title: "Paiement décentralisé",
      class: "style-03",
      description: "le paiement n'a jamais été aussi simplifié dans un groupe"

    },
    {
      icon: "flaticon-notification",
      title: "Etre notifié",
      class: "style-04",
      description: "Laisser notre manager artificiel s'occupe de l'organisation tout en vous tenant informé"

    }
]

  ngOnInit(): void {
  }

}
