/** Action Types */
export const GET_REQUEST: string = 'stars/GET_REQUEST';
export const GET_SUCCESS: string = 'stars/GET_SUCCESS';
export const GET_FAILURE: string = 'stars/GET_FAILURE';

/** Action Interface */
export interface IStarsAction {
  type: string;
  payload?: {
    count?: number;
    message?: any;
  };
}

/** State Interface */
export interface IStars {
  isFetching?: boolean;
  count?: number;
  error?: boolean;
  message?: any;
}

/** Initial State */
const initialState: IStars = {
  isFetching: false,
};

/** Reducer */
export function starsReducer(state = initialState, action: IStarsAction) {
  switch (action.type) {
    case GET_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
      });

    case GET_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        count: action.payload.count,
      });

    case GET_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        message: action.payload.message,
        error: true,
      });

    default:
      return state;
  }
}

/** Async Action Creator */
export function getStars() {
  return dispatch => {
    dispatch(starsRequest());

    return fetch('https://api.github.com/repos/Aryk/over-reactor')
      .then(res => {
        if (res.ok) {
          return res.json()
            .then(res => dispatch(starsSuccess(res.stargazers_count)));
        } else {
          return res.json()
            .then(res => dispatch(starsFailure(res)));
        }
      })
      .catch(err => dispatch(starsFailure(err)));
  };
}

/** Action Creator */
export function starsRequest(): IStarsAction {
  return {
    type: GET_REQUEST,
  };
}

/** Action Creator */
export function starsSuccess(count: number): IStarsAction {
  return {
    type: GET_SUCCESS,
    payload: {
      count,
    },
  };
}

/** Action Creator */
export function starsFailure(message: any): IStarsAction {
  return {
    type: GET_FAILURE,
    payload: {
      message,
    },
  };
}
