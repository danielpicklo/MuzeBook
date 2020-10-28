import {GET_POSTS, POST_ERROR, ADD_POST} from '../actions/constants';

const initState = {
    posts: [],
    post: null,
    loading: true,
    error:{}
}

export default function(state = initState, action){
    const {type, payload} = action;

    switch(type){
        case GET_POSTS:
            return {...state, posts:payload, loading:false};
        case ADD_POST:
            return {...state, posts:[payload, ...state.posts], loading:false};
        case POST_ERROR:
            return {...state, error:payload, loading:false};
        default:
            return state;
    }
}