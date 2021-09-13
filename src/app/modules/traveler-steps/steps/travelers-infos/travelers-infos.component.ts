import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-travelers-infos',
  templateUrl: './travelers-infos.component.html',
  styleUrls: ['./travelers-infos.component.css']
})
export class TravelersInfosComponent implements OnInit {

  constructor() { }

  count:number = 3;
  stepCurrent=1;
  cardData =[ 
  {
    index:0,
    img:null

  },
  {
    index:1,
    img:null

  },
  {
    index:2,
    img:null

  }
];

  ngOnInit(): void {
  }

  onClickAdd(){
    this.cardData.push({
      index:this.cardData.length + 1,
      img:null
  
    });
  }

  onClickDelete(event:any){

    //console.log(event);
    const dataValue =  this.cardData.filter(e=> e.index != event);
    this.cardData = dataValue;
  }

}
