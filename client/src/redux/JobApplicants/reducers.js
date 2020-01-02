import {
  REQUEST_APPLICANT,
  RECEIVED_APPLICANT,
  FAILURE_APPLICANT,
  REQUEST_APPLICANT_D,
  RECEIVED_APPLICANT_D,
  FAILURE_APPLICANT_D,
  GET_MORE_APPLICANTS,
  NO_MORE_APPLICANTS,
  APPLICANT_STATUS
} from "./constants";

const applicantLState = {
  applicants: [],
  currOffset: 0,
  jobId:null,
  status:"",
  limit: 6,
  disable:false,
  loading: false,
  err: null,
};

export const applicantsReducer = (state = applicantLState, action) => {
  switch (action.type) {
    case REQUEST_APPLICANT:
      return { ...state, loading: true };
    case RECEIVED_APPLICANT:
        return {
        ...state,
        loading: false,
        applicants: action.data,
        currOffset: action.offset,
        jobId: action.jobId,
        status:action.status,
        disable:false,
      };
    case GET_MORE_APPLICANTS:
      return {
        ...state,
        loading: false,
        applicants: [...state.applicants, ...action.data],
        currOffset: action.offset,
        jobId: action.jobId,
        status:action.status
      };
    case NO_MORE_APPLICANTS:
      return {...state, loading:false, disable:true}
    case APPLICANT_STATUS:
        return {...state, loading:false, applicants: state.applicants.filter(a => a.userID !== action.userId)}
    case FAILURE_APPLICANT:
      return { ...state, loading: false, err: action.err, disable:true };
    default:
      return state;
  }
};

const applicantDState = {
  applicant: [],
  experience: [],
  loading: false,
  err: null,
};

export const applicantDReducer = (state = applicantDState, action) => {
  switch (action.type) {
    case REQUEST_APPLICANT_D:
      return { ...state, loading: true };
    case RECEIVED_APPLICANT_D:
      const { experience, candidate } = action.data;
      return {
        ...state,
        loading: false,
        applicant:candidate,
        experience,
      };
    case FAILURE_APPLICANT_D:
      return { ...state, loading: false, err: action.err };
    default:
      return state;
  }
};
