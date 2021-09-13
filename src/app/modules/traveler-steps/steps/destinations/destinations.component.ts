import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-destinations',
  templateUrl: './destinations.component.html',
  styleUrls: ['./destinations.component.css']
})
export class DestinationsComponent implements OnInit {

  constructor() { }

  stepCurrent = 3;
  stepsConfiguration =[
    {
      position: 1,
      step:"Ajouter les voyageurs",
      completed:true,
      icon:'<img src="assets/icons/person.svg" width="24" height="24" alt="" class="ml-2" />'
    },
    {
      position: 2,
      step:"Période",
      completed:true,
      icon:'<img src="assets/icons/731-calendar.svg" width="24" height="24" alt="" class="margincenter ml-1"/>'
    },
    {
      position: 3,
      step:"Destinations",
      completed:false,
      icon:'<img src="assets/icons/location.svg" width="24" height="24" alt="" class="margincenter ml-1"/>'
    }
  ];

  ngOnInit(): void {
  }

}
