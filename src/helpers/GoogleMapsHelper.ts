import WindowGoogleInterface from '@/interfaces/WindowGoogleInterface';
import AppendScriptHelper from '@/interfaces/AppendScriptHelper';

class GoogleMapsHelper {

  // Your personal API key.
  // Get it here: https://console.cloud.google.com/google/maps-apis
  public apiKey: string;
  public callbackName: string;
  public initialized: boolean;
  public resolveInitPromise: any;
  public rejectInitPromise: any;
  public google: any;
  public window: WindowGoogleInterface;

  constructor(window: any) {
    this.apiKey = `${process.env.VUE_APP_GOOGLE_MAPS_API_KEY}`;
    this.callbackName = 'gmapsCallback';
    this.resolveInitPromise = null;
    this.rejectInitPromise = null;
    this.window = window;
    this.initialized = !!this.window.google;
    this.google = this.window.google;
  }

  // This promise handles the initialization
  // status of the google maps script.
  public initPromise() {
    return new Promise((resolve, reject) => {
      this.resolveInitPromise = resolve;
      this.rejectInitPromise = reject;
    });
  }

  public async init() {
    // If Google Maps already is initialized
    // the `initPromise` should get resolved
    // eventually.
    if (this.initialized) {
      return this.initPromise;
    }

    this.initialized = true;
    // The callback function is called by
    // the Google Maps script if it is
    // successfully loaded.
    // @ts-ignore
    window[this.callbackName] = () => this.resolveInitPromise(this.google);

    const scriptUrl = `https://maps.googleapis.com/maps/api/js?key=${this.apiKey}&callback=${this.callbackName}`;
    const appendScriptHelper = new AppendScriptHelper();
    await appendScriptHelper.init(scriptUrl);

    return this.initPromise();
  }
}

export default GoogleMapsHelper;
