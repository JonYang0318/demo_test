import http from 'k6/http';
import {
    check,
    sleep
} from 'k6';


import {
    stressScenario
} from './scenarios.js';



export const options = {

    scenarios: {

        api_stress: stressScenario

    },


    thresholds: {


        // 95% request response time 小於 2 秒

        http_req_duration:[
            'p(95)<2000'
        ],


        // API error rate 小於 5%

        http_req_failed:[
            'rate<0.05'
        ]


    }

};



export default function(){


    const response =
        http.get(
            'https://jsonplaceholder.typicode.com/posts'
        );



    check(response, {


        // 驗證 API 是否正常回應

        'status is 200':
        (r)=>r.status === 200,


        // 驗證基本效能

        'response time < 2s':
        (r)=>r.timings.duration < 2000


    });



    sleep(1);

}