import {instanceAPI } from './InstanceApi'


export const  getAllUsers = async  (offset) => {
    const res = await instanceAPI.get(`/api/admin/users?offset=${offset}`)
    return res.data
}

export const blackListUsers = async (id,statusType = '') => {
    
    const res = await instanceAPI.post("/api/admin/black-list", {
        data: {
            id:id,
            statusType:statusType
        }
    })
    return res.data
}

 export const getBlackListedUsers = async (offset) => {
     const res = await instanceAPI.get(`/api/admin/black-list?offset=${offset}`)
     return res.data
 }

 export const unBlockUsers = async (id) => {
    const res = await instanceAPI.post("/api/admin/unblock", {
        data:{
            id:id
        }
    })
    return res.data
 }


export const  reportedUsers = async  (offset) => {
    const res = await instanceAPI.get(`/api/admin/reported?offset=${offset}`)
    return res.data
}

export const getUncheckedUsers = async  (offset) => {
    const res = await instanceAPI.get(`/api/admin/check?offset=${offset}`)
    return res.data
}

export const postCheckUser = async  (id) => {
    const res = await instanceAPI.post("/api/admin/check", {
        data:{
            id:id
        }
    })
    return res.data
}

