import { GET_LIVE } from "../actions/types";

const initialState = {
    live: {},
    loading: true
};


export default function (state = initialState, actins) {
    const { payload, type } = actins;
    switch (type) {
        case GET_LIVE:
            return {
                ...state,
                live: payload.live,
                loading: false
            }
        default:
            return state
    }

}