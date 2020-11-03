import { GET_PROFILE, PROFILE_ERROR } from "../actions/constants";

const initState = {
    profile: null,
    profiles: [],
    loading: true,
    error: {}
}

export default function(state = initState, action){
    const {type, payload} = action;

    switch(type){
        case GET_PROFILE:
            return {...state, profile:payload, loading:false};
            break;
        case PROFILE_ERROR:
            return {...state, error:payload, loading:false}
            break;
        default:
            return state;
            break;
    }
}