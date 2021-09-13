import { Injectable } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import * as turf from '@turf/turf';
import { environment } from "../../../environments/environment";
declare var $;
@Injectable({
providedIn: 'root'
})
export class MapService {
    
map: mapboxgl.Map;
style = 'mapbox://styles/mapbox/streets-v11';
markers:any[]=[];
markersHost:any[]=[];
geojson:any;
cardSelected:any[]=[];

flyActive:number;


      constructor() {
        mapboxgl.accessToken = environment.mapbox.accessToken;
      }
      buildMap(markersDefault:any=[]) {

            this.map = new mapboxgl.Map({
              container: 'map',
              style: this.style,
              center: [ -4.033333, 5.3364], 
              zoom: 10
            })

            if (this.markersHost.length) {
              this.markersHost.forEach(function (item) {
                  item.remove();
              });
            }

            markersDefault.forEach(item => {

              let popup = new mapboxgl.Popup({
                closeOnClick: false,
                closeButton: false
            }).setLngLat([item.lng, item.lat])
                .setHTML('<div class="hh-map-popup">' +
                '<div class="thumb"><a href="#"><img src="' + item.images[0].src + '" alt="' + item.name + '"/></a></div><div class="content"><a href="#">' + item.name + '</a><p class="pr">' + item.tarif + ' €</p></div>' +
                '</div><div class="hh-map-price"data-id="' + item.id + '"><span class="price-innner">' + item.tarif + ' €</span></div>')
                .addTo(this.map);
            this.markersHost.push(popup);
              
            });



      
      }

      flyActiveMove(data:any){

        //this.flyActive = data.id;
            if (this.flyActive !== data.id) {
              let dataID = data.id;
              $('.mapboxgl-popup', 'body').removeClass('active');
              $('.hh-map-price[data-id="' + dataID + '"]', 'body').closest('.mapboxgl-popup').addClass('active');
              let selectedLng = data.lng;
              let selectedLat = data.lat;
              this.map.flyTo({
                  center: [selectedLng, selectedLat]
              });
              this.flyActive = data.id;
          }

      }


      markersToMap(cordinates:any) {

        

        this.map = new mapboxgl.Map({
          container: 'map',
          style: this.style,
          center: [cordinates[0].coordinates[0], cordinates[cordinates.length - 1].coordinates[1]], 
          zoom: 4.3
        })
      this.map.addControl(new mapboxgl.NavigationControl());
      this.map.resize();

        
        if (this.markers.length) {
          this.markers.forEach(function (item) {
              item.remove();
          });
      }



      if (this.map.getLayer('point')) {
        this.map.removeLayer('route');
        this.map.removeLayer('point');
      }
      if (this.map.getSource('point')) {
        this.map.removeSource('route');
        this.map.removeSource('point');
      }
      


        for (let index = 0; index < cordinates.length; index++) {
       

                var coordinates = cordinates[index].coordinates;

                 // create the popup
              let popup = new mapboxgl.Popup({ offset: 25 }).setText( cordinates[index].user );


                    // create the marker
             let  markers =   new mapboxgl.Marker({  rotation: 45 })
                      .setLngLat(coordinates)
                      .setPopup(popup) // sets a popup on this marker
                      .addTo(this.map);

               this.markers.push(markers);
          
        }
     

      
      }

      buildDirection(data:any) {


        if (this.markers.length) {
          this.markers.forEach(function (item) {
              item.remove();
          });
      }


      if (this.map.getLayer('route')) {
        this.map.removeLayer('route');
        this.map.removeLayer('point');
      }
      if (this.map.getSource('route')) {
        this.map.removeSource('route');
        this.map.removeSource('point');
      }
     
  


                  var geojson = {
                    'type': 'FeatureCollection',
                    'features': [
                        {
                            'type': 'Feature',
                            'geometry': {
                                'type': 'LineString',
                                'properties': {},
                                'coordinates': [
                                  data.origin,data.destination
                                ]
                            }
                        }
                    ]
                  };

                var point = {
                  'type': 'FeatureCollection',
                  'features': [
                          {
                          'type': 'Feature',
                          'properties': {},
                          'geometry': {
                          'type': 'Point',
                          'coordinates': data.origin
                              }
                          }
                      ]
                  };

                this.onLoad(point,geojson);


    }

    buildPointDestination(data:any,  users:any) {


     /* if(!deleteJust){


        if (this.map.getLayer('point')) {
          this.map.removeLayer('point');
        }
        if (this.map.getSource('point')) {
          this.map.removeSource('point');
        }

        return;

      }*/

      if (this.map.getLayer('point')) {
        this.map.removeLayer('route');
        this.map.removeLayer('point');
      }
      if (this.map.getSource('point')) {
        this.map.removeSource('route');
        this.map.removeSource('point');
      }

      /*  routes */


      var geojson = {
        'type': 'FeatureCollection',
        'features': [
            {
                'type': 'Feature',
                'geometry': {
                    'type': 'LineString',
                    'properties': {},
                    'coordinates': [
                      data.coordinates
                    ]
                }
            }
        ]
      };

      for (let index = 0; index < users.length; index++) {
        const element = users[index].coordinates;
    
        let indexNew = geojson.features[0].geometry.coordinates.length;

        geojson.features[0].geometry.coordinates[indexNew] = element;
        let indexNewS = geojson.features[0].geometry.coordinates.length;

        geojson.features[0].geometry.coordinates[indexNewS] = data.coordinates;
        
      }



            this.map.addSource('route', {
              'type': 'geojson',
              'data': geojson
              });

              this.map.addLayer({
                'id': 'route',
                'source':'route',
                'type': 'line',
                'paint': {
                'line-width': 5,
                'line-color': '#007cbf'
                }
                });





              var point = {
                'type': 'FeatureCollection',
                'features': [
                        {
                        'type': 'Feature',
                        'properties': {},
                        'geometry': {
                        'type': 'Point',
                        'coordinates': data.coordinates
                            }
                        }
                    ]
                };

                this.map.addSource('point', {
                  'type': 'geojson',
                  'data': point
                  });
      
      
                 this.map.addLayer({

                    'id': 'point',
                    'type': 'circle',
                    'source': 'point',
                    'paint': {
                          'circle-color': '#4264fb',
                          'circle-radius': 8,
                          'circle-stroke-width': 2,
                          'circle-stroke-color': '#ffffff'
                        }
                    });


  }

    onLoad(point:any, geojson:any){

        this.map.addSource('route', {
            'type': 'geojson',
            'data': geojson
            });


        this.map.addSource('point', {
            'type': 'geojson',
            'data': point
            });



             
            this.map.addLayer({
            'id': 'route',
            'source':'route',
            'type': 'line',
            'paint': {
            'line-width': 5,
            'line-color': '#007cbf'
            }
            });


           this.map.addLayer({
              'id': 'point',
              'source': 'point',
              'type': 'symbol',
              'layout': {
                  'icon-image': 'airport-15',
                  'icon-rotate': ['get', 'bearing'],
                  'icon-rotation-alignment': 'map',
                  'icon-allow-overlap': true,
                  'icon-ignore-placement': true
              }
              });
        
      }

    
         
        
         

}