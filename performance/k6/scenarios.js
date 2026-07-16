export const smokeScenario = {
    executor: 'constant-vus',
    vus: 5,
    duration: '30s',
};


export const loadScenario = {
    executor: 'ramping-vus',

    startVUs: 0,

    stages: [
        {
            duration: '30s',
            target: 50,
        },
        {
            duration: '1m',
            target: 50,
        },
        {
            duration: '30s',
            target: 0,
        },
    ],
};


export const stressScenario = {

    executor: 'ramping-vus',

    startVUs: 0,

    stages: [

        {
            duration: '1m',
            target: 100,
        },

        {
            duration: '2m',
            target: 300,
        },

        {
            duration: '1m',
            target: 0,
        }

    ],

};