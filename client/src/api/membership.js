import { instanceAPI } from './InstanceApi'

export const  membership = async () => {
    const url = `/api/membership`;
    const res = await instanceAPI.get(url);
    return res.data
}