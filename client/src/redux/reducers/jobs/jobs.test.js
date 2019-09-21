import {GET_JOBS} from  './../../actions/constants';
import jobsReducer from './Jobs'

describe('Jobs Reducer', () => {
    const initialState = {
        jobs: [],
        auth: ''
    }

    it('should return default state', () => {
        expect(jobsReducer(undefined, {})).toEqual(initialState)
    })



    it('Should return new state if receiving type', () => {
        const state = {
            jobs: [{
                category: "Barista și Barman",
                city: "Balti",
                commission: 'string',
                currency: 'dtrui',
                description: "asdsa",
                employer_id: 5,

            }],
            auth: 'string'
        }
        const newState = jobsReducer(undefined, {
            type: GET_JOBS,
            jobs: state.jobs,
            auth: state.auth
        });
        expect(newState).toEqual(state);

    });
})