import Constants from "../../Constants";

const initState = {
    productList:[],
    pagination: {
        totalProducts: 0,
        perPage:0,
        curPage:0,
        totalPage:0,
    },
    selectedFilters:{}

}

export const productReducer = (state=initState, action)=>{
    switch (action.type){
        case Constants.ACTION_FETCH_FILTERS:
            console.log('FETCH_FILTERS', action.payload);
            return {...state, selectedFilters:action.payload}

        case Constants.ACTION_FETCH_PRODUCTLIST:
            console.log(action.payload['products'])
            return {...state,
                productList: action.payload['products'],
                pagination: action.payload['pageParams'],
                selectedFilters: action.payload['filters']
                // totalNumOfProducts: action.payload['pageParams']['totalProducts'],
                // totalPages: action.payload['pageParams']['totalProducts']
            }

        case Constants.ACTION_FETCH_PRODUCTLIST_MORE:
            const temp = [...state.productList, ...action.payload['products']]
            // temp.push(action.payload['products'])
            console.log('productList.length===>', state.productList.length, 'temp.length===>', temp.length)
            return {...state,
                productList: temp,
                pagination: action.payload['pageParams'],
                selectedFilters: action.payload['filters']
            }

        default:
            return state
    }
    // return state
}