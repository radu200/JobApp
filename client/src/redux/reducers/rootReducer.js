import { combineReducers } from 'redux';
import Jobs from './jobs/Jobs';
import Users from './users/Users';

export default combineReducers({
  jobs:Jobs,
  users:Users
});