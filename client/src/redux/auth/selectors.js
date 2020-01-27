import { createSelector } from "reselect";

const getLoading = state => state.auth.loading;

const getRole = state => state.auth.role;

const getErr = state => state.auth.err;

export const getAuth = state => state.auth.auth;

const getUserId = state => state.auth.user_id;
export const getUserIdSelector = createSelector(getUserId, user_id => {
  return user_id;
});
export const getRoleSelector = createSelector(getRole, role => {
  return role;
});
export const getAuthSelector = createSelector(getAuth, auth => {
  return auth;
});

export const getLoadingSelector = createSelector(getLoading, loading => {
  return loading;
});

export const getErrSelector = createSelector(getErr, err => {
  return err;
});
