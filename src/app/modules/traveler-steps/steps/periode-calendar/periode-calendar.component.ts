import { Component, OnInit } from '@angular/core';
import { BsDatepickerConfig,BsLocaleService } from 'ngx-bootstrap/datepicker';
import { listLocales } from 'ngx-bootstrap/chronos';


@Component({
  selector: 'app-periode-calendar',
  templateUrl: './periode-calendar.component.html',
  styleUrls: ['./periode-calendar.component.css']
})
export class PeriodeCalendarComponent implements OnInit {

  colorTheme = 'theme-orange';
  bsConfig: Partial<BsDatepickerConfig>;

  bsInlineValue = new Date();
  bsInlineRangeValue: Date[];
  maxDate = new Date();
  locale = 'fr';
  stepCurrent = 2;
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
      completed:false,
      icon:'<img src="assets/icons/731-calendar.svg" width="24" height="24" alt="" class="margincenter ml-1"/>'
    },
    {
      position: 3,
      step:"Destinations",
      completed:false,
      icon:'<img src="assets/icons/location.svg" width="24" height="24" alt="" class="margincenter ml-1"/>'
    }
  ];

  constructor(private localeService: BsLocaleService) { 

    this.maxDate.setDate(this.maxDate.getDate() + 7);
    this.bsInlineRangeValue = [this.bsInlineValue, this.maxDate];
    this.bsConfig = Object.assign({}, { containerClass: this.colorTheme });
    this.localeService.use(this.locale);

  }

  ngOnInit(): void {
    
  }

}
