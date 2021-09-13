import { Component, OnInit,OnDestroy } from '@angular/core';
import { StyleManagerService } from "src/app/core/services/style-manager.service";
declare var $;

@Component({
  selector: 'app-backend-layout',
  templateUrl: './backend-layout.component.html',
  styleUrls: ['./backend-layout.component.css'],
  providers:[StyleManagerService]
})
export class BackendLayoutComponent implements OnInit,OnDestroy {

loadingData:boolean = true;

  constructor(private styleManager: StyleManagerService) { 

    

  }

  ngOnInit(): void {
    this.styleManager.setStyle("styleBootstrap","assets/dist/css/bootstrap.min.css");
    this.styleManager.setStyle("styleBackend","assets/css/backStyle.css");
    this.loadScript();

    setTimeout(() => {
      this.loadingData = false;
      $("#main-wrapper").css("display","block");
  
    }, 1000);
   
  }

  loadScript() {
    const url="assets/js/custom.min.js";
    const Bootstrap = "assets/dist/js/bootstrap.min.js";
     let nodeBoostrap = document.createElement('script');
     nodeBoostrap.src = Bootstrap;
     nodeBoostrap.type = 'text/javascript';
     nodeBoostrap.async = true;
     nodeBoostrap.classList.add('script-manager-espace-bootstrap');
     document.getElementsByTagName('head')[0].appendChild(nodeBoostrap);

     let node = document.createElement('script');
     node.src = url;
     node.type = 'text/javascript';
     node.async = true;
     node.classList.add('script-manager-espace');
     document.getElementsByTagName('head')[0].appendChild(node);

     
 }

 removeScript() {
      const existingScriptElement = document.head.querySelector(`script-manager-espace`);
      const existingScriptElementBoostrap = document.head.querySelector(`script-manager-espace-bootstrap`);
          if (existingScriptElement) {
          document.head.removeChild(existingScriptElement);
        }

        if (existingScriptElementBoostrap) {
          document.head.removeChild(existingScriptElementBoostrap);
        }
 }

  
  ngOnDestroy(){

    this.styleManager.removeStyle("styleBootstrap");
    this.styleManager.removeStyle("styleBackend");
    this.removeScript();
  }

}
