import { Component, OnInit,  HostListener } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-footer-frontend',
  templateUrl: './footer-frontend.component.html',
  styleUrls: ['./footer-frontend.component.css']
})
export class FooterFrontendComponent implements OnInit {

  dateAnnee : any;
  langData:string;

  constructor(public translate: TranslateService,) { 
    this.dateAnnee = new Date().getFullYear();
  }

  ngOnInit(): void {
  }

  onChangeLang(event){
    console.log(event.target.value);
    this.translate.setDefaultLang(event.target.value);
  }

 


}
