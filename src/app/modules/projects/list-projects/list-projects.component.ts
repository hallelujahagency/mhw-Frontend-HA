import { Component, OnInit } from '@angular/core';
import { ApiDataService } from "src/app/core/services/api.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-projects',
  templateUrl: './list-projects.component.html',
  styleUrls: ['./list-projects.component.css']
})
export class ListProjectsComponent implements OnInit {

  constructor(private Api:ApiDataService,
              private router: Router) { } 

  projects:any;

  ngOnInit(): void {
 
    this.getListProjects();
  }

  getListProjects(){
    this.Api.getProjects().subscribe(
      data => {
        this.projects = data;

      }
    )
  }

  getNombreUsers(data:any){
    if(data.length){
      let value = JSON.parse(data);
      return value.length;
    }
    else{
      return 0;
    }
    
  }

  onClickEditProjet(projet:any){
        
   // this.router.navigate(["./start-trip/index/"+ projet]);
   this.router.navigate(['./start-trip/index'], { queryParams: { slugg: projet } }); 
}

}
