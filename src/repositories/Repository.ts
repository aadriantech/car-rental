import axios from 'axios';

// set API Configuration
const apiBaseDomain = `${process.env.VUE_APP_API_DOMAIN}`;
const apiBaseUrl = `${apiBaseDomain}`;

export default axios.create({
  baseURL: apiBaseUrl,
  // set headers here, eg token
});
