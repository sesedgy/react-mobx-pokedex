import axios from 'axios';
import { API_CONFIG } from '../constants';
import loaderStore from '../stores/LoaderStore';

const instance = axios.create({
  baseURL: `${API_CONFIG.protocol}://${API_CONFIG.hostName}${API_CONFIG.versionPath}`,
  timeout: 1000,
});

class ApiService {
  static get(path) {
    return instance.get(`/${path}`);
  }

  static post(path, requestBody) {
    return instance.post(`/${path}`, requestBody);
  }

  static getByFullUrl(url) {
    return axios.get(url);
  }

  static async getList(promisesList) {
    loaderStore.show();
    let resultsList = [];
    await Promise.all(promisesList).then((results) => {
      resultsList = results.map(result => result.data);
      loaderStore.hide();
    }).catch(() => {
      loaderStore.hide();
      // TODO обработка ошибок
    });
    return resultsList;
  }
}

export default ApiService;
