import {instanceAPI } from './InstanceApi'

export const  postPayment = async (token) => {
    const res =  await instanceAPI.post( "/api/payment",{token});
    return res.data
}