import AppendScriptInterface from '@/interfaces/AppendScriptInterface';

class AppendScriptHelper implements AppendScriptInterface {

  /**
   * We inject a new script tag into
   * the `<head>` of our HTML to load
   * the Google Maps script.
   */
  public async init(scriptUrl: string): Promise<any> {
    const script = document.createElement('script');
    script.setAttribute(
      'src',
      scriptUrl,
    );
    script.async = true;
    script.defer = true;

    // @ts-ignore
    document.querySelector('head').appendChild(script);
    return new Promise((resolve, reject) => {
      script.onload = () => resolve(true);
      script.onerror = () => reject(new Error('Script could not be loaded.'));
    });
  }
}

export default AppendScriptHelper;
