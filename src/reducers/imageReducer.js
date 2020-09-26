import _ from 'lodash';
import {
    ADD_PAGE,
    CLEAR_IMAGES,
    CREATE_IMAGE,
    DELETE_IMAGE,
    EDIT_IMAGE,
    FETCH_IMAGE,
    FETCH_IMAGES,
    LOAD_MORE, RESET_LOADING,
    SET_SEARCH_QUERIES, START_LOADING
} from "../actions/types";

const INITIAL_STATE = {
    searchQuery: "",
    list: [],
    total: 0,
    totalPage: 0,
    currentPage: 1,
    limit: 20,
    loading: false
};

export default (state = INITIAL_STATE, action) => {

    switch (action.type) {
        case FETCH_IMAGES: {
            // return {...state, ..._.mapKeys(action.payload, 'id')};
            const {list, total, totalPage} = action.payload;
            return {...state, list, total, totalPage};
        }
        case LOAD_MORE: {
            // return {...state, ..._.mapKeys(action.payload, 'id')};
            // return {...state, list : [...state.list, action.payload] };
            return {...state, list: state.list.concat(action.payload)};
        }
        case FETCH_IMAGE: {
            return {...state, [action.payload.id]: action.payload};
        }
        case CREATE_IMAGE: {
            return {...state, [action.payload.id]: action.payload};
        }
        case DELETE_IMAGE: {
            return _.omit(state, action.payload);
        }
        case EDIT_IMAGE: {
            return {...state, [action.payload.id]: action.payload};
        }
        case CLEAR_IMAGES: {
            // return _.remove(state.images);
            return {...state, list: [], currentPage: 1, totalPage: 0, total: 0};
        }
        case SET_SEARCH_QUERIES: {
            return {...state, searchQuery: action.payload};
        }
        case ADD_PAGE: {
            return {...state, currentPage: action.payload};
        }
        case START_LOADING: {
            return {...state, loading: true};
        }
        case RESET_LOADING: {
            return {...state, loading: false};
        }
        default:
            return state;
    }
}
