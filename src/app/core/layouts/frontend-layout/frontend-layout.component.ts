import { Component, OnInit,OnDestroy } from '@angular/core';
import { StyleManagerService } from "src/app/core/services/style-manager.service";
declare var $;

@Component({
  selector: 'app-frontend-layout',
  templateUrl: './frontend-layout.component.html',
  styleUrls: ['./frontend-layout.component.css'],
  providers:[StyleManagerService]
})
export class FrontendLayoutComponent implements OnInit,OnDestroy {

  loadingVisible:boolean=true;


  constructor(private styleManager: StyleManagerService) {
    

   }

  ngOnInit(): void {
    this.styleManager.setStyle("styleFrontend","assets/css/style.css");

    this.loadScript();

    setTimeout(() => {
      
     this.loadingVisible = !this.loadingVisible
    }, 1000);
    

   
  }

  loadScript() {

    const Bootstrap = "assets/dist/js/bootstrap.min.js";
     let nodeBoostrap = document.createElement('script');
     nodeBoostrap.src = Bootstrap;
     nodeBoostrap.type = 'text/javascript';
     nodeBoostrap.async = true;
     nodeBoostrap.classList.add('script-manager-frontend-bootstrap');
     document.getElementsByTagName('head')[0].appendChild(nodeBoostrap);

      
 }

 removeScript() {
  const existingScriptElement = document.head.querySelector(`script-manager-frontend-bootstrap`);
 
      if (existingScriptElement) {
      document.head.removeChild(existingScriptElement);
    }

    
}

  ngOnDestroy(){

    this.styleManager.removeStyle("styleFrontend");
    this.removeScript();
  }

}
