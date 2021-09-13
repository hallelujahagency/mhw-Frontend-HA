import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-button-custom',
  templateUrl: './button-custom.component.html',
  styleUrls: ['./button-custom.component.css']
})
export class ButtonCustomComponent implements OnInit {

  @Input() urlRoute : string='./';
  constructor() { }

  ngOnInit(): void {
  }

}
