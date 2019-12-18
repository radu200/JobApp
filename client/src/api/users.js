import {instanceAPI } from './InstanceApi'


export const searchCandidate = async (location, category, experienceMax, offset) => {
    const url = `/api/candidate-search?location=${location}&category=${category}&experience_max=${experienceMax}`;
     const res = await instanceAPI.post(url, {
        offset: offset
    })
     return res.data
}
export const getCandidateDetails = async (id) => {
    const res = await  instanceAPI.get(`/api/candidate-details/${id}`)
    return res.data
}


