import axios from 'axios';
import {attachRequestInterceptor} from './RequestInterceptor';
import {attachResponseInterceptor} from './ResponseInterceptor';
import {BASE_URL} from './Urls';
const ApiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {'Content-Type': 'application/json'},
});

attachRequestInterceptor(ApiClient);
attachResponseInterceptor(ApiClient);

export default ApiClient;
