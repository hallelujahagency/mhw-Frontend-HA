import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-buttom-start',
  templateUrl: './buttom-start.component.html',
  styleUrls: ['./buttom-start.component.css']
})
export class ButtomStartComponent implements OnInit {

  @Input() styleCustom:string ='';
  @Input() classCustom:string ='';

  product:string ='';

  constructor() { }

  ngOnInit(): void {
  }

}
