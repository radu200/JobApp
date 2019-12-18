import { createSelector } from 'reselect'

const  getMember =  state => state.member.member

export const getMemberSelector = createSelector(getMember, (m) => {
     return m
})