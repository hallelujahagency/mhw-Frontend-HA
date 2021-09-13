import { Component, OnInit, TemplateRef} from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { BsDatepickerConfig,BsLocaleService } from 'ngx-bootstrap/datepicker';
import { MapService } from "src/app/core/services/map.services";
import { ApiDataService } from "src/app/core/services/api.service";
import { AuthenticationService } from "src/app/core/services/authentication.service";
import {  NotificationsService } from 'src/app/core/services/notifications.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
declare var $;

@Component({ 
  selector: 'app-custom-wizard',
  templateUrl: './custom-wizard.component.html',
  styleUrls: ['./custom-wizard.component.css'],
  providers: [ AuthenticationService, NotificationsService ]
})
export class CustomWizardComponent implements OnInit {

  constructor(private localeService: BsLocaleService,
              private map: MapService,
              private Api:ApiDataService,
              private authenticationService: AuthenticationService,
              private modalService: BsModalService,
              private notificationService: NotificationsService,
              private route : ActivatedRoute,
              private datepipe: DatePipe,
              private router: Router) {

    this.bsConfig = Object.assign({}, { containerClass: this.colorTheme , adaptivePosition: true });
    this.localeService.use(this.locale);
    
   }

  colorTheme = 'theme-orange';
  bsConfig: Partial<BsDatepickerConfig>;
  locale = 'fr';

  modalRef: BsModalRef;
  modalRefFor: BsModalRef;

  displayCarte:boolean = false;
  isLogged:boolean = false;


  stepCurrent = 1;
  stepsConfiguration =[
    {
      position: 1,
      step:"Ajouter les voyageurs",
      completed:false,
      icon:"assets/icons/person.svg"
    },
    {
      position: 2,
      step:"Dates",
      completed:false,
      icon:"assets/images/calendrier-permanent-de-printemps.png"
    },
    {
      position: 3,
      step:"Destinations",
      completed:false,
      icon:"assets/images/desti.png"
    },
    {
      position: 4,
      step:"Mon voyage",
      completed:false,
      icon:"assets/images/voyage.png"
    }
  ];


  cardDestinations:any =[];

  originUsers:any = [];

  cardDataNotEmpty:any=[
    {
      index:0,
      nameVoyager:"",
      station:null,
      error:false
  
    },
    {
      index:1,
      nameVoyager:"",
      station:null,
      error:false
  
    },
    {
      index:2,
      nameVoyager:"",
      station:null,
      error:false
  
    }
  ];

  stations:any;
  temp:any=[];
  modeDestinations: string = "every";
  choixUser:any=[];
  tempSelected:any=[];
  nextText:string="Continuer";

  dateDebut:string="";
  dateFin:string="";
  dateNowPlusOne = new Date();
 


  nameOfProjet:string = "";
  errorName:boolean=false;
  seeShareDiv:boolean = false;
  projectUuid :any;
  voteDeja:boolean = false;

  created_by:any;
  connected_user :any;

  voteUser :any=[];
  choixTemp:any=0;

  initSelectVote:boolean = true;

  updateVote:boolean = false;

  bilanData:any;

  //projectDestinationChooseForVote:any;


  myParam:any;
  projectSluggAfter:string;

  sendEmailUsers:any = [
    {
      index:0,
      email:""
    },
    {
      index:1,
      email:""
    }
  ];

  createdUserData:any;
 

  ngOnInit(): void {

    this.isLogged = this.authenticationService.isLoggedIn();
    
    this.getStationSearch();
    this.dateNowPlusOne.setDate(this.dateNowPlusOne.getDate() + 1);

   this.myParam = this.route.snapshot.queryParamMap.get('slugg');
   this.projectSluggAfter = this.route.snapshot.queryParamMap.get('slugg');
  

    if(this.isLogged){
      let userData = JSON.parse(localStorage.getItem('loginUser'));
      this.connected_user = parseInt(userData.uuid);
    }

    if(this.myParam){

      this.getProject(this.myParam);
      this.stepCurrent = 4;

    }

  
  }
 

  // get projet bd

  getProject(project:string){



        this.Api.getProject(project).subscribe((data)=>{
           

              if(data){

                
                //console.log(data)
                  // initial value of variables send for bd

                      this.cardDataNotEmpty = JSON.parse(data.users);
                      this.temp = JSON.parse(data.destinations);
                      this.choixUser = JSON.parse(data.choix);
                    
                      this.createdUserData = data.userdata[0];

                      
                      this.dateDebut = this.datepipe.transform(data.date_debut, 'dd/MM/yyyy');
                      this.dateFin = this.datepipe.transform(data.date_fin, 'dd/MM/yyyy');
                     
                      this.projectUuid = data.uuid;
                      this.created_by = parseInt(data.created_by);


                      //check if user connect and vote deja
                      this.checkIfRating(project,true);


                      /* orign users for carte */

                      for (let index = 0; index < this.cardDataNotEmpty.length; index++) {
                      

                            this.originUsers.push({
                              user:this.cardDataNotEmpty[index].nameVoyager,
                              coordinates:[ this.cardDataNotEmpty[index].station.lng, 
                                            this.cardDataNotEmpty[index].station.lat]
                                });
                        
                      }

                      /* listings destinations */

                      this.cardDestinations = [];

                      for (let index = 0; index < this.temp.length; index++) {
                        
                                const element = this.temp[index];
                                let indexExist =  this.cardDataNotEmpty.findIndex(e=> e.station.name === element.name);

                                let indexCheckSelected = this.choixUser.findIndex(e => e.uuid === element.uuid);
              
                                //check s il existe pas comme voyageur
              
                                if(indexExist == -1){

                                  let selectedValue = false;

                                        if( indexCheckSelected > -1){

                                          selectedValue = true
                                        }
              
                                          this.cardDestinations.push( {
                                            uuid:element.uuid,
                                            img:element.img,
                                            title:element.name,
                                            price:this.getRandomIntInclusive(),
                                            peoples:this.originUsers.length,
                                            coordinates: [element.lng, element.lat],
                                            color:'black',
                                            selected:selectedValue
                                  
                                    });
                                }
              
                        
                      }

                
                      this.tempSelected = this.cardDestinations;
                


                      if(this.choixUser.length >= 1){
      
                        this.cardDestinations = this.choixUser;
                      
                      }
                      else{
                        this.cardDestinations = this.tempSelected;
                        
                      }


              }
              else{
                // show error
                this.notificationService.showError("Désolé, mais le lien que vous cherchiez est introuvable.", "Pas trouvé");
              }


               

        })
    
  }


  checkIfRating(project:string, init:boolean=false){

    //on verifie si la selection est egale a 1 pas de vote possible
    if(this.choixUser.length === 1){
      this.voteDeja = true;
      return;
    }
    
    this.Api.checkRating({slug: project}).subscribe((data)=>{
      this.voteDeja = data.statut;


      if(init){

         //change bouton next step 

                let userData = JSON.parse(localStorage.getItem('loginUser'));
                this.connected_user = parseInt(userData.uuid);

                this.nextText = "Voter";
        
                if(this.voteDeja){
                // console.log("hii")
                    this.nextText = "Modifier mon vote";
                }

                if(this.connected_user === this.created_by){
        
                    this.nextText += " ou partager";
                }
      }

     
    })
  }

  // supprimer un card de voyageur

  onClickDeleteCardTravelers(index:number){

    const dataValue =  this.cardDataNotEmpty.filter(e=> e.index != index);
    this.cardDataNotEmpty = dataValue;
  }

  // ajouter un card de voyageur

  onClickAddCardTravelers(){


    if(this.cardDataNotEmpty.length < 6){

      this.cardDataNotEmpty.push({
        index:this.cardDataNotEmpty.length + 1,
        nameVoyager:"",
        station:null,
        error:false
    
      });

    }

  
  }

  //selectionner l etape
  selecteStep(event:number){

    this.stepCurrent = event;
    switch (true) {

      case (this.stepCurrent < 4):
        this.nextText = "Continuer";
      break;
      case (this.stepCurrent === 4):

            this.nextText = "Voter";

            if(!this.projectUuid){
              this.nextText = "Sauvegarder";
            }
    
            if(this.voteDeja){
    
                this.nextText = "Modifier mon vote";
            }

            if(this.connected_user === this.created_by){
    
                this.nextText += " ou partager";
            }

    
        break;
  }
  }

  //Etape suivant

  onClickStepNext(template :TemplateRef<any>){


    //check again if connect

   this.isLogged = this.authenticationService.isLoggedIn();

    let errorsCardInfouser:any=[];
    let errorsDate:any=[];

          if(this.stepCurrent === 1){  

              if(this.cardDataNotEmpty.length < 2){
                return;
              }
                
              this.cardDataNotEmpty.forEach(item => {

                    if(item.nameVoyager === ""){
                      //console.log("error");
                      errorsCardInfouser.push({
                        index:item.index,
                        error:"nom du voyageur"
                      });
                      return;
                    }

                    if(item.station === null){

                      errorsCardInfouser.push({
                        index:item.index,
                        error:"station du voyageur"
                      });
                      return;
                    }


                
              });
          
          }

          if(this.stepCurrent === 2){
            
            if(this.dateDebut === ""){
              errorsDate.push({
                error:"la date debut est vide"
              });
            }

            if(this.dateFin === ""){
              errorsDate.push({
                error:"la date fin est vide"
              });
            }
            

          
          }

          if(errorsCardInfouser.length > 0){

            errorsCardInfouser.forEach(item => {

              let indexOfItem = this.cardDataNotEmpty.findIndex(e=> e.index === item.index);

              if(indexOfItem > -1) this.cardDataNotEmpty[indexOfItem].error = true;
              
            });
            
            return;
          }

          if(errorsDate.length > 0){

            return;
          }

          if(this.stepCurrent === 3 && !this.projectUuid){

              if(!this.isLogged){
                this.notificationService.showError("Désolé, Vous devriez vous connectez pour y accedé", "Erreur de connexion");
                return;
              }

              this.modalRef = this.modalService.show(template, {animated: true});
          }

          if(this.stepCurrent === 4){

                if(!this.isLogged){
                  this.notificationService.showError("Désolé, Vous devriez vous connectez pour y accedé", "Erreur de connexion");
                  return;
                }
      
                let userData = JSON.parse(localStorage.getItem('loginUser'));
                this.connected_user = parseInt(userData.uuid);
      
                if(this.myParam){
                  this.checkIfRating(this.myParam);
                }

                if(this.voteDeja){
        
                  this.updateVote = !this.updateVote;
              }
              
                //console.log('loginUser '+ this.connected_user);
                this.modalRef = this.modalService.show(template, {animated: true});
                
          }

          if( this.stepCurrent < 4){

                if(this.stepCurrent === 3 && !this.projectUuid){

                  this.stepCurrent = this.stepCurrent  ;   
              }
              else{
                this.stepCurrent++;
              }
            
          }

        switch (true) {

                      case (this.stepCurrent < 4):
                        this.nextText = "Continuer";
                        if(this.stepCurrent === 3 && !this.projectUuid){
                          this.nextText = "Sauvegarder";
                        }
                      break;
                      case (this.stepCurrent === 4):

                            this.nextText = "Voter";

                            if(!this.projectUuid){
                              this.nextText = "Sauvegarder";
                            }
                    
                            if(this.voteDeja){
                    
                                this.nextText = "Modifier mon vote";
                            }

                            if(this.connected_user === this.created_by){
                    
                                this.nextText += " ou partager";
                            }

                    
                        break;
                  }


    
  }

  //Etape preccedent

  onClickStepPrev(){

    if( this.stepCurrent > 1){
      this.stepCurrent--;
    }

    switch (true) {

      case (this.stepCurrent < 4):
        this.nextText = "Continuer";
          if(this.stepCurrent === 3 && !this.projectUuid){
            this.nextText = "Sauvegarder";
          }
          break;
          case (this.stepCurrent === 4):

            this.nextText = "Voter";

            if(!this.projectUuid){
              this.nextText = "Sauvegarder";
            }
    
            if(this.voteDeja){
    
                this.nextText = "Modifier mon vote";
            }

            if(this.connected_user === this.created_by){
    
                this.nextText += " ou partager";
            }

    
        break;

              }

    
  }

// vote

voteOnSave(update:boolean=false){

  if(this.voteUser.length !== this.choixUser.length){
    this.errorName = true;
    return;
  }

  console.log(update)
  let data = {
    vote: this.voteUser,
    slug:this.myParam,
    updateVote:update
  }
 // console.log(data)

  this.Api.saveRating(data).subscribe((data)=>{
    this.voteDeja = !this.voteDeja;  
    this.notificationService.showSuccess('Vote Ajouter avec succès après 5 min plus de modification possible');

   })
 
}

checkIfSameUserCreateAndConnect(){
  
  return (this.connected_user === this.created_by) && this.voteDeja;
}



//open modal bilan vote

openModalBilanVote(template:TemplateRef<any>){

  this.Api.getRatingsByProject({slug:this.myParam}).subscribe((data)=>{

    //console.log(data);

    this.bilanData = [];

    data.forEach(item => {

            let votes = JSON.parse(item.vote);

            this.bilanData.push({
              name:item.userdata[0].fullname,
              photo: item.userdata[0].photo,
              choix:votes
            })
    });

    
    this.modalRef = this.modalService.show(template, {animated: true});
  })

}

//return name ville with vote

getChoixData(data:any, index:number){

  let dataContent = data.find(e=> e.index === index);

  let stationData = this.temp.find(e=> e.uuid === parseInt(dataContent.stationUUid));

  return stationData.name;
}


  //save project

  onClickSaveProjet(){

    if(this.nameOfProjet === ""){
      this.errorName = true;
      return;
    }

    if(this.choixUser.length < 1){
      this.errorName = true;
      return;
    }

    this.errorName = false;

    let dataValue = {
      name:this.nameOfProjet,
      users: JSON.stringify(this.cardDataNotEmpty),
      destinations: JSON.stringify(this.temp),
      choix: JSON.stringify(this.choixUser),
      begin:this.dateDebut,
      end:this.dateFin

    };

      this.Api.saveProject(dataValue).subscribe(data=>{

         this.projectUuid = data[0].uuid;

         let userConnect = JSON.parse(localStorage.getItem("loginUser"));

         this.createdUserData = {
           fullname:userConnect.fullname,
           photo:userConnect.photo,
           email:userConnect.email
         }
     

           //on verifie si la selection est egale a 1 pas de vote possible
          if(this.choixUser.length === 1){
            this.voteDeja = true;
          }

         //this.projectSluggAfter = data[0].slug;
         this.myParam = data[0].slug;
         this.created_by = parseInt(data[0].created_by);

         this.checkIfRating(this.myParam, true)

       //  console.log('created_by '+ this.created_by);
         this.seeShareDiv = !this.seeShareDiv;
         this.notificationService.showSuccess('Sauvegarder avec succès');
         this.stepCurrent++;
   
        })

   

   

  }

  //change for selection vote

  changeVilleVote(event:any, index:any){

   let uuid = parseInt(event.target.value);
   this.initSelectVote = false;

    if(uuid === 0){
      return;
    }
    console.log(uuid);

  if(this.voteUser.length > 0){

    let indexCheck = this.voteUser.findIndex(e=> e.stationUUid === uuid);
      if(indexCheck > -1){
        this.voteUser[indexCheck].stationUUid = uuid;
      }
      else{
        this.voteUser.push({index:index, stationUUid: uuid});
      }

    
  }
  else{
    this.voteUser.push({index:index, stationUUid: uuid});
  }

//  this.voteUser = [];
  

  }


  //reset vote

  resetVote(){
    this.voteUser = [];
    this.initSelectVote = true;
  }

  //deja vote

  alreadyCheckVoteVille(uuid:any){

        let indexCheck = this.voteUser.findIndex(e=> e.stationUUid === uuid);
        if(indexCheck > -1){
         // this.voteUser[indexCheck].stationUUid = uuid;
         return true;
        }
        else{
        //  this.voteUser.push({index:index, stationUUid: uuid});
        return false;
        }

  }


  //send  share click 

  onClickSendProjet(via:string, template :TemplateRef<any>){ 

        switch (via) {
          case "email":
            this.modalRef.hide();
            this.modalRef = this.modalService.show(template, {animated: true});
            break;
        
          default:
            break;
        }


  }

    //send  share email click 

    onClickSendEmailProjet(){ 

          let errors:any=[];

        this.sendEmailUsers.forEach(item => {

              if(item.email === ""){
                errors.push({
                  index:item.index,
                  error:'Email obligatoire'
                })
              }
            
          });


          if(errors.length){
            this.errorName =true;
            return;
          }

          console.log(this.sendEmailUsers);

this.Api.sendMailToParticipants({emails:this.sendEmailUsers,slugg:this.myParam}).subscribe((data)=>{

  this.modalRef.hide();
  this.notificationService.showSuccess('Envoyé avec succès');

})


 
    


}

   // supprimer un card de voyageur

   onClickDeleteSendMail(index:number){

    const dataValue =  this.sendEmailUsers.filter(e=> e.index !== index);
    this.sendEmailUsers = dataValue;
  }

  // ajouter un card de voyageur

  onClickAddCardSendMail(){

    this.sendEmailUsers.push({
      index:this.sendEmailUsers.length + 1,
      email:""
  
    });
  }

  //display / hidden carte 

  onClickDisplayCarte(){

    this.displayCarte = !this.displayCarte;

        if(this.displayCarte) {

              setTimeout(() => {
                 // this.map.buildMap();
                  this.map.markersToMap(this.originUsers);
              }, 1000);
        
      }

    
  }


  deleteprocess(event:any){

    event.selected = !event.selected;

    this.onClickSelected(event);

  }
  
  // la selection  des choix

  onClickSelected(event:any){

   // si la selection contient au moin une valeur

    if(this.choixUser.length){
     
                let index =  this.choixUser.findIndex( e => e.uuid === event.uuid);

                      if(index <= -1){

                        event.selected = true;

                        // add to choix user
                          this.choixUser.push(event);

                          //selected in card

                          let IndexForNewData =  this.cardDestinations.findIndex(e=> e.uuid === event.uuid);
                          this.cardDestinations[IndexForNewData] = event;
                        
        
                      }
                      else{

                          event.selected = false;

                          let newData =  this.choixUser.filter(e=> e.uuid !== event.uuid);
                          this.choixUser = newData;

                          let IndexForNewData =  this.cardDestinations.findIndex(e=> e.uuid === event.uuid);
                          this.cardDestinations[IndexForNewData] = event;

                    }
       
    }

    else {
      this.choixUser = [];
      this.choixUser.push(event);

      let newData =  this.cardDestinations.findIndex(e=> e.uuid === event.uuid);
      this.cardDestinations[newData] = event;
  }

  
// hidden les autres destinations si le choix atteint les 3 
   
    if(this.choixUser.length > 2){
      
      this.cardDestinations = this.choixUser;
    
    }
    else{
      this.cardDestinations = this.tempSelected;
      
    }

    

    
  }


// effet survole sur les destinations

  mouseOverEvent(event){

      if(event.see){
        this.map.buildPointDestination(event.card,  this.originUsers);
      }

   }


   addGareTodata(event:any){

    // verifie si le resultat est deja dans notre selection 

      let index = this.cardDataNotEmpty.findIndex(e=> e.index === event.index);

        if(index > -1){
            this.cardDataNotEmpty[index] = event;  
           
        }
        else{
            this.cardDataNotEmpty.push(event); 
            
        }


    //  calcul le rayon (distance la plus longue )  et aussi les coordonnees des voyageurs (noms , coordonnees geo)

     let distanceData = 0;
     this.originUsers = [];
    

     for (let indexBoo = 0; indexBoo < this.cardDataNotEmpty.length; indexBoo++) {

                if(this.cardDataNotEmpty[indexBoo].station){

                        //On enregistre les voyageurs avec leur coordonnees

                              this.originUsers.push({
                                      user:this.cardDataNotEmpty[indexBoo].nameVoyager,
                                      coordinates:[ this.cardDataNotEmpty[indexBoo].station.lng, 
                                                    this.cardDataNotEmpty[indexBoo].station.lat]
                              });


                        // on choisit un point comme origine le premier voyageur pour le calcul 

                              let compareCoordonne = this.cardDataNotEmpty[indexBoo].station;
                              let originChoose = this.cardDataNotEmpty[0].station;
                            
                             let newDistance = this.distanceInKmBetweenEarthCoordinates(originChoose.lat, originChoose.lng,
                                                                                        compareCoordonne.lat, compareCoordonne.lng);

                        // On compare la distance au point d origine s il est grand on l enregistre comme rayon

                            if( newDistance > distanceData){
                              
                                  distanceData = newDistance;

                            }
                            

                }
      
       
     }



     if(distanceData > 30 && this.cardDataNotEmpty[0].station){

        this.everyBodyMove(this.cardDataNotEmpty[0].station, distanceData);
     }

   
    
 

  }

// tout le monde bouge

  everyBodyMove(origin:any, rayon:number){

    this.Api.getDestinations(origin.lat,origin.lng,rayon).subscribe(data=>{

       this.temp = data;
       this.cardDestinations = [];

       for (let index = 0; index < data.length; index++) {
         
                  const element = data[index];
                  let indexExist =  this.cardDataNotEmpty.findIndex(e=> e.station.name === element.name);

                  //check s il existe pas comme voyageur

                  if(indexExist == -1){

                            this.cardDestinations.push( {
                              uuid:element.uuid,
                              img:element.img,
                              title:element.name,
                              price:this.getRandomIntInclusive(),
                              peoples:this.originUsers.length,
                              coordinates: [element.lng, element.lat],
                              color:'black',
                              selected:false
                    
                      });
                  }

         
       }

       this.tempSelected = this.cardDestinations;

     

      
     });

  }


  // on se retrouve chez quelqu un

  onePepoleMove(){

    this.cardDestinations = [];

    if(this.modeDestinations === "every"){
 

                for (let index = 0; index < this.temp.length; index++) {
                
                      const element = this.temp[index];
                      let indexExist =  this.cardDataNotEmpty.findIndex(e=> e.station.name === element.name);

                      //check s il existe pas comme voyageur

                      if(indexExist == -1){

                                this.cardDestinations.push({
                                  uuid:element.uuid,
                                  img:element.img,
                                  title:element.name,
                                  price:this.getRandomIntInclusive(),
                                  peoples:this.originUsers.length,
                                  coordinates: [element.lng, element.lat],
                                  color:'black',
                                  selected:false
                        
                          });
                      }

        
        }
        this.tempSelected = this.cardDestinations;
        return;

    }
          

      for (let index = 0; index < this.temp.length; index++) {

              const element = this.temp[index];
              let indexExist =  this.cardDataNotEmpty.findIndex(e=> e.station.name === element.name);

                    if(indexExist > -1){
                            this.cardDestinations.push( {
                              uuid:element.uuid,
                              img:element.img,
                              title:element.name,
                              price:this.getRandomIntInclusive(true),
                              peoples:1,
                              coordinates: [element.lng, element.lat],
                              color:'black',
                              selected:false
                    
                      });
                  }
    
        }

        this.tempSelected = this.cardDestinations;

  }
   
  getStationSearch(){

      this.Api.getStations().subscribe(data=>{
        this.stations = data;
      });
    }

  getRandomIntInclusive(onePeople:boolean=false) {
      let min = 200;
      let max = 450;

      if(onePeople){
        min = 50;
       max = 70;

      }
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min +1)) + min;
    }
 

  /* calculate */


  distanceInKmBetweenEarthCoordinates(lat1:any, lon1:any,lat2:any, lon2:any){


    let earthRadiumKm = 6371;
    let dLat = this.degreesToRadius(lat2 - lat1);
    let dLon = this.degreesToRadius(lon2 - lon1);

    lat1 = this.degreesToRadius(lat1);
    lat2 = this.degreesToRadius(lat2);

    let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat1) * Math.cos(lat2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    return (earthRadiumKm * c) + 30;

  }

  degreesToRadius(degrees:any){
    return degrees * Math.PI / 180;
  }



}
