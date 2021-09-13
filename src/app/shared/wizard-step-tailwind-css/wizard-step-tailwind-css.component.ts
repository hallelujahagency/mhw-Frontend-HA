import { Component, OnInit, Input,EventEmitter, Output  } from '@angular/core';

@Component({
  selector: 'app-wizard-step-tailwind-css',
  templateUrl: './wizard-step-tailwind-css.component.html',
  styleUrls: ['./wizard-step-tailwind-css.component.css']
})
export class WizardStepTailwindCssComponent implements OnInit {

  constructor() { }

 @Input() stepsConfiguration =[];
@Input()  stepCurrent = 1;

  @Output() selecteStep: EventEmitter<any> = new EventEmitter();

  ngOnInit(): void {
  }


  onClickStep(step:number){
  //  this.stepCurrent = step;

    if(this.stepCurrent > step){

      this.selecteStep.emit(step);
      
    }


  }

}
