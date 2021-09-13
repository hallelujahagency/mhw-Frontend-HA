// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  mapbox:{
    accessToken: 'pk.eyJ1Ijoia29rb3Vhc2VyZ2U4OSIsImEiOiJja2x0aThqNTgyNmp4MnFuMWNucnUxdDJhIn0.qv3knVmVo7Y_Nn6PtYNn_w'
  },
 // googleApi:"https://maps.googleapis.com/maps/api/place/nearbysearch/json?language=fr&key=AIzaSyApHUafQ3nK0kx_XeR55p8uCEOOJvdCzc4",
  apiUrl:"http://localhost:3001/api/v1/",
  apiUrlSocket:"http://localhost:3001"
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
