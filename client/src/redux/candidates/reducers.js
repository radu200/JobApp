import {
  REQUEST_CANDIDATE,
  RECEIVED_CANDIDATE,
  FAILURE_CANDIDATE,
  REQUEST_CANDIDATE_D,
  RECEIVED_CANDIDATE_D,
  FAILURE_CANDIDATE_D,
} from "./constants";

const candidatesLState = {
  candidates: [],
  loading: false,
  err: null,
};

export const candidatesReducer = (state = candidatesLState, action) => {
  switch (action.type) {
    case REQUEST_CANDIDATE:
      return { ...state, loading: true };
    case RECEIVED_CANDIDATE:
      return { ...state, loading: false, candidates: action.data };
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
      return {
        ...state,
        loading: false,
        candidate: action.data.candidate,
        experience: action.data.experience,
      };
    case FAILURE_CANDIDATE_D:
      return { ...state, loading: false, err: action.err };
    default:
      return state;
  }
};
