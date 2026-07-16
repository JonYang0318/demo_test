import http from 'k6/http';

import {
    check,
    sleep
} from 'k6';


import {
    loadScenario
} from './scenarios.js';



export const options = {

    scenarios: {

        login_test: loadScenario

    },


    thresholds: {


        // 95% request 必須小於 1 秒

        http_req_duration:[
            'p(95)<1000'
        ],


        // error rate < 1%

        http_req_failed:[
            'rate<0.01'
        ]

    }

};



export default function(){


    const url = 
    'https://www.saucedemo.com/';


    const payload = {

        username:
        'standard_user',


        password:
        'secret_sauce',

    };


    const params = {

        headers:{

            'Content-Type':
            'application/x-www-form-urlencoded'

        }

    };



    let response = http.post(
        url,
        payload,
        params
    );



    check(response,{

        'status is 200':
        (r)=>r.status===200,


        'response time < 1s':
        (r)=>r.timings.duration < 1000

    });



    sleep(1);

}