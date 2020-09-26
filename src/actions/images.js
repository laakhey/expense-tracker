import unsplash from "../api/unsplash";
import {
    ADD_PAGE,
    CLEAR_IMAGES,
    FETCH_IMAGES,
    LOAD_MORE,
    RESET_LOADING,
    SET_SEARCH_QUERIES,
    START_LOADING
} from "./types";


export const searchImages = (param) => async (dispatch, getState) => {
    if (getState().images.searchQuery === param || getState().images.loading) {
        return;
    }
    dispatch(startLoading());
    dispatch(setSearchQuery(param));
    const response = await search(param, getState().images);
    dispatch(clearImages());
    dispatch({
        type: FETCH_IMAGES, payload: {
            list: response.data.results,
            total: response.data.total,
            totalPage: response.data.total_pages
        }
    });
    dispatch(resetLoading());
};

export const loadMore = () => async (dispatch, getState) => {
    const {images} = getState();
    if (images.loading || images.currentPage >= images.totalPage) {
        return;
    }
    dispatch(startLoading());
    dispatch(addPage(images.currentPage+1));
    const response = await search(images.searchQuery, getState().images);

    dispatch({
        type: LOAD_MORE,
        payload: response.data.results
    });
    dispatch(resetLoading());
};

const search = (param, images) => {
    return unsplash.get('/search/photos', {
        params: {
            query: param,
            page: images.currentPage,
            per_page: images.limit
        }
    });
};

export const clearImages = () => {
    return {
        type: CLEAR_IMAGES
    }
};

export const setSearchQuery = (query) => {
    return {
        type: SET_SEARCH_QUERIES,
        payload: query
    }
};

export const startLoading = () => {
    return {
        type: START_LOADING
    }
};

export const resetLoading = () => {
    return {
        type: RESET_LOADING
    }
};

export const addPage = (page) => {
    return {
        type: ADD_PAGE,
        payload: page
    }
};
