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

            'p(95)<800'

        ],


        http_req_failed:[

            'rate<0.02'

        ]

    }


};



export default function(){



    let response =
        http.get(
            'https://reqres.in/api/users?page=2'
        );



    check(response,{


        'API status 200':
        (r)=>r.status===200,


        'API response < 800ms':
        (r)=>r.timings.duration < 800


    });



    sleep(1);

}