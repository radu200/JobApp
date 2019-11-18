import * as  axios from "axios";
const instance  = axios.create()

export const searchCandidate = async (location, category, experienceMax, offset) => {
    const url = `/api/candidate-search?location=${location}&category=${category}&experience_max=${experienceMax}`;
     const res = await instance.post(url, {
        offset: offset
    })
     return res.data
}
export const getCandidateDetails = async (id) => {
    const res = await  instance.get(`/api/candidate-details/${id}`)
    return res.data
}
