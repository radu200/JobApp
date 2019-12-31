import {
  REQUEST_CANDIDATE,
  RECEIVED_CANDIDATE,
  FAILURE_CANDIDATE,
  REQUEST_CANDIDATE_D,
  RECEIVED_CANDIDATE_D,
  FAILURE_CANDIDATE_D,
  GET_MORE_CANDIDATES,
  NO_MORE_CANDIDATES,
} from "./constants";

const candidatesLState = {
  candidates: [],
  currPage: 0,
  currLocation: "",
  currCategory: "",
  currExperienceMax: 0,
  limit: 6,
  finished: false,
  loading: false,
  err: null,
};

export const candidatesReducer = (state = candidatesLState, action) => {
  switch (action.type) {
    case REQUEST_CANDIDATE:
      return { ...state, loading: true };
    case RECEIVED_CANDIDATE:
      return {
        ...state,
        loading: false,
        candidates: action.data,
        currPage: action.page,
        currLocation: action.location,
        currCategory: action.category,
        currExperienceMax: action.experienceMax,
      };
    case GET_MORE_CANDIDATES:
      return {
        ...state,
        loading: false,
        candidates: [...state.candidates, ...action.data],
        currPage: action.page,
        currLocation: action.location,
        currCategory: action.category,
        currExperienceMax: action.experienceMax,
      };
    case NO_MORE_CANDIDATES:
      return { ...state, loading: false, finished: true };
    case FAILURE_CANDIDATE:
      return { ...state, loading: false, err: action.err };
    default:
      return state;
  }
};

const candidatesDState = {
  candidate: [],
  experience: [],
  loading: false,
  err: null,
};

export const candidatesDReducer = (state = candidatesDState, action) => {
  switch (action.type) {
    case REQUEST_CANDIDATE_D:
      return { ...state, loading: true };
    case RECEIVED_CANDIDATE_D:
      const { experience, candidate } = action.data;
      return {
        ...state,
        loading: false,
        candidate,
        experience,
      };
    case FAILURE_CANDIDATE_D:
      return { ...state, loading: false, err: action.err };
    default:
      return state;
  }
};
