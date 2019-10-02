const API_KEY = `${process.env.VUE_APP_GOOGLE_MAPS_API_KEY}`;
const CALLBACK_NAME = 'init';

// @ts-ignore
let initialized = !!window.google;
// @ts-ignore
let resolveInitPromise;
// @ts-ignore
let rejectInitPromise;
// This promise handles the initialization
// status of the google maps script.
const initPromise = new Promise((resolve, reject) => {
  resolveInitPromise = resolve;
  rejectInitPromise = reject;
});

export default function init() {
  // If Google Maps already is initialized
  // the `initPromise` should get resolved
  // eventually.
  if (initialized) { return initPromise; }

  initialized = true;
  // The callback function is called by
  // the Google Maps script if it is
  // successfully loaded.
  // @ts-ignore
  window[CALLBACK_NAME] = () => resolveInitPromise(window.google);

  // We inject a new script tag into
  // the `<head>` of our HTML to load
  // the Google Maps script.
  const script = document.createElement('script');
  script.async = true;
  script.defer = true;
  script.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&callback=${CALLBACK_NAME}`;
  // @ts-ignore
  script.onerror = rejectInitPromise;

  // @ts-ignore
  document.querySelector('head').appendChild(script);

  return initPromise;
}


// import WindowGoogleInterface from '@/interfaces/WindowGoogleInterface';
// import AppendScriptHelper from '@/interfaces/AppendScriptHelper';
//
// class GoogleMapsHelper {
//
//   // Your personal API key.
//   // Get it here: https://console.cloud.google.com/google/maps-apis
//   public apiKey: string;
//   public callbackName: string;
//   public initialized: boolean;
//   public resolveInitPromise: any;
//   public rejectInitPromise: any;
//   public google: any;
//   // public window: WindowGoogleInterface;
//   public window: any;
//
//   constructor() {
//     this.apiKey = `${process.env.VUE_APP_GOOGLE_MAPS_API_KEY}`;
//     this.callbackName = 'init';
//     this.resolveInitPromise = null;
//     this.rejectInitPromise = null;
//     this.window = window;
//     this.initialized = !!this.window.google;
//     this.google = this.window.google;
//   }
//
//   // This promise handles the initialization
//   // status of the google maps script.
//   public initPromise() {
//     return new Promise((resolve, reject) => {
//       this.resolveInitPromise = resolve;
//       this.rejectInitPromise = reject;
//     });
//   }
//
//   public async init() {
//     // If Google Maps already is initialized
//     // the `initPromise` should get resolved
//     // eventually.
//     if (this.initialized) {
//       return this.initPromise;
//     }
//
//     this.initialized = true;
//     // The callback function is called by
//     // the Google Maps script if it is
//     // successfully loaded.
//     // @ts-ignore
//     // window[this.callbackName] = () => this.resolveInitPromise(this.google);
//
//     // const scriptUrl = `https://maps.googleapis.com/maps/api/js?key=${this.apiKey}&callback=${this.callbackName}`;
//     const scriptUrl = `https://maps.googleapis.com/maps/api/js?key=${this.apiKey}`;
//     const appendScriptHelper = new AppendScriptHelper();
//     await appendScriptHelper.init(scriptUrl);
//
//     return this.initPromise();
//   }
// }
//
// export default GoogleMapsHelper;
