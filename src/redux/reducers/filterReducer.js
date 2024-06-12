import Constants from "../../Constants";

const initialState = {
    filterLibrary:[],
}

export const filterReducer = (state = initialState, action) => {
    switch (action.type) {
        case Constants.ACTION_FETCH_FILTERS:
            console.log('FETCH_FILTERS', action.payload);
            return {...state, filterLibrary:action.payload}
        default:
            return state;
    }
}