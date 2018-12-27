import axios from 'axios';
import { API_CONFIG } from '../constants';
import loaderStore from '../stores/LoaderStore';

const instance = axios.create({
  baseURL: `${API_CONFIG.protocol}://${API_CONFIG.hostName}${API_CONFIG.versionPath}`,
  timeout: 1000,
});

class ApiService {
  static getPromise(path) {
    return instance.get(`/${path}`);
  }

  static postPromise(path, requestBody) {
    return instance.post(`/${path}`, requestBody);
  }

  static getPromiseByFullUrl(url) {
    return axios.get(url);
  }

  static async getResultsList(promisesList) {
    let resultsList = [];
    await Promise.all(promisesList).then((results) => {
      resultsList = results.map(result => result.data);
    }).catch(() => {
      // TODO обработка ошибок
    });
    return resultsList;
  }

  static async getResult(promise) {
    let requestResult = null;
    await promise.then((result) => {
      requestResult = result.data;
      loaderStore.hide();
    }).catch(() => {
      // TODO обработка ошибок
    });
    return requestResult;
  }
}

export default ApiService;
