import {  createSelector } from 'reselect'

const getLoading  = state => state.auth.loading;

const getRole = state => state.auth.role;

 const getErr  = state => state.auth.err;

 const getAuth = state => state.auth.auth

 export const getRoleSelector = createSelector(getRole, (role) => {
     return role
    })
export const getAuthSelector = createSelector(getAuth, (auth) => {
    return auth
})

export const  getLoadingSelector = createSelector(getLoading, (loading) => {
    return loading
})
    
export const getErrSelector = createSelector(getErr, (err) => {
    return err
})




