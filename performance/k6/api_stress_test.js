import http from 'k6/http';

import {
    check,
    sleep
} from 'k6';


import {
    stressScenario
} from './scenarios.js';



export const options = {


    scenarios:{


        api_stress: stressScenario


    },


    thresholds:{


        http_req_duration:[

            'p(95)<2000'

        ],


        http_req_failed:[

            'rate<0.05'

        ]

    }


};



export default function(){


    const response = http.get(

        'http://127.0.0.1:8000/api/products'

    );



    check(response,{


        'status is 200':

        (r)=>r.status === 200,



        'response time < 2s':

        (r)=>r.timings.duration < 2000


    });



    sleep(1);


}