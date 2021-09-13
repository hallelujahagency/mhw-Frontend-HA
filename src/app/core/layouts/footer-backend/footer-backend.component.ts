import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer-backend',
  templateUrl: './footer-backend.component.html',
  styleUrls: ['./footer-backend.component.css']
})
export class FooterBackendComponent implements OnInit {
  dateAnnee : any;

  constructor() { 
    this.dateAnnee = new Date().getFullYear();
  }

  ngOnInit(): void {
  }

}
