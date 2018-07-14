
import axios from 'axios';
// import {API_URL}  from './Config';
import * as Config from './Config';
export default function callApi(endPoint, method='GET', body) {

    let headers = new Headers();

    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');

    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Credentials', 'true');

    headers.append('GET', 'POST', 'OPTIONS');

    // headers.append('Authorization', 'Basic ' + base64.encode(username + ":" + password));

    return axios({
        method:method,
        url:Config.API_URL+'/'+endPoint,
        data: body
    }).catch(err =>{
        console.log(err);
    });

};
