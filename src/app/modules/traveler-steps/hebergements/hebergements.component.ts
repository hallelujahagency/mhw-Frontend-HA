import { Component, OnInit } from '@angular/core';
import { MapService } from "src/app/core/services/map.services";
declare var $;

@Component({
  selector: 'app-hebergements',
  templateUrl: './hebergements.component.html',
  styleUrls: ['./hebergements.component.css'],
  providers: [ MapService ]
})
export class HebergementsComponent implements OnInit {

  constructor(private map: MapService,) { }



  hotels =[
    {
      id:1,
      type:"Hôtels",
      name:"Appartement Soleil",
      emplacement:"Abidjan, Le Plateau, Abidjan, Côte d'Ivoire",
      nbre_personne:6,
      chambre:2,
      lng: -4.0542163,
      lat: 5.3439909,
      tarif:350,
      images:[
        {
          src:"https://www.reservcity.com/storage/u-33/2021/04/13/whatsapp-image-2021-04-13-at-192151-1618338056-400x300.jpeg"
        },
        {
          src:"https://www.reservcity.com/storage/u-33/2021/04/13/whatsapp-image-2021-04-13-at-192139-1-1618338034-400x300.jpeg"
        },
        {
          src:"https://www.reservcity.com/storage/u-33/2021/04/13/whatsapp-image-2021-04-13-at-192139-1618338035-400x300.jpeg"
        }
      ]
    },
    {
      id:2,
      type:"Hôtels",
      name:"Appartement Soleil",
      emplacement:"Abidjan, Le Plateau, Abidjan, Côte d'Ivoire",
      nbre_personne:6,
      chambre:2,
      lng: -4.0542163,
      lat: 5.3439909,
      tarif:350,
      images:[
        {
          src:"https://www.reservcity.com/storage/u-33/2021/04/13/whatsapp-image-2021-04-13-at-192151-1618338056-400x300.jpeg"
        },
        {
          src:"https://www.reservcity.com/storage/u-33/2021/04/13/whatsapp-image-2021-04-13-at-192139-1-1618338034-400x300.jpeg"
        },
        {
          src:"https://www.reservcity.com/storage/u-33/2021/04/13/whatsapp-image-2021-04-13-at-192139-1618338035-400x300.jpeg"
        }
      ]
    },
    {
      id:3,
      type:"Hôtels",
      name:"Appartement Soleil",
      emplacement:"Abidjan, Le Plateau, Abidjan, Côte d'Ivoire",
      nbre_personne:6,
      chambre:2,
      lng: -4.0152112815425,
      lat: 5.321677937042,
      tarif:350,
      images:[
        {
          src:"https://www.reservcity.com/storage/u-33/2021/04/13/whatsapp-image-2021-04-13-at-192151-1618338056-400x300.jpeg"
        },
        {
          src:"https://www.reservcity.com/storage/u-33/2021/04/13/whatsapp-image-2021-04-13-at-192139-1-1618338034-400x300.jpeg"
        },
        {
          src:"https://www.reservcity.com/storage/u-33/2021/04/13/whatsapp-image-2021-04-13-at-192139-1618338035-400x300.jpeg"
        }
      ]
    }
  ];

  DisplayCarte:boolean=true;

  ngOnInit(): void {

   
    setTimeout(() => {
      this.map.buildMap(this.hotels);
      
    }, 1000);
  }


  mouseOverEventChange(card:any,value:boolean){


    if(value){

      this.map.flyActiveMove(card)
    }

    //this.mouseOverEvent.emit(data);

   }

   seeCarte(){
     this.DisplayCarte = !this.DisplayCarte
   }

}
