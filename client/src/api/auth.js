import {instanceAPI } from './InstanceApi'

export const authRole = async () => {
    const url = `/api/auth/me`;
    const res = await instanceAPI.get(url)
    return res.data
    
}