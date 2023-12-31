import * as actionTypes from './types';

const INITIAL_PROFILE_STATE = {
  informations: {
    _id: 'defaultProfile',
    isAdmin: true,
    name: 'default profile',
    surname: 'default profile',
    email: '<EMAIL>',
    role: 'default profile',
    photo: '<PHOTO>',
  },
  settings: {},
};

const INITIAL_STATE = {
  result: INITIAL_PROFILE_STATE,
  isLoading: false,
  isSuccess: false,
};

const profileReducer = (state = INITIAL_STATE, action) => {
  const { payload = null } = action;
  switch (action.type) {
    case actionTypes.RESET_STATE:
      return INITIAL_STATE;
    case actionTypes.REQUEST_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case actionTypes.REQUEST_FAILED:
      return {
        ...state,
        isLoading: false,
        isSuccess: false,
      };
    case actionTypes.REQUEST_SUCCESS:
      return {
        result: {
          ...state.result,
          informations: payload,
        },
        isLoading: false,
        isSuccess: true,
      };
    default:
      return state;
  }
};

export default profileReducer;
