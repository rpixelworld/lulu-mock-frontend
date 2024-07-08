const Constants = {
    LOCAL_BASE_URL: 'http://' + window.location.host,
    BASE_URL: 'http://api-lulu.hibitbyte.com',
    MY_KEY: 'rtIpbFi4fzjisRJNgqEtyR4Ags/Yz15jsqAGhE6uXIFkTG7vUSJ/yRYXiqrnlKjfTA2kAUtChiIflImPe/T3uA==',
    ACTION_FETCH_PRODUCTLIST: 'ACTION_FETCH_PRODUCTLIST',
    ACTION_FETCH_PRODUCTLIST_MORE:'ACTION_FETCH_PRODUCTLIST_MORE',
    ACTION_SORT_PRODUCTLIST: 'ACTION_SORT_PRODUCTLIST',
    ACTION_FETCH_FILTERS: 'ACTION_FETCH_FILTERS',
    ACTION_FETCH_TEMPLATE_FILTERS: 'ACTION_FETCH_TEMPLATE_FILTERS',
    ACTION_FETCH_PRODUCT_DETAIL: 'ACTION_FETCH_PRODUCT_DETAIL',
    ACTION_FETCH_PRODUCT_CATAGORY: 'ACTION_FETCH_PRODUCT_CATAGORY',
    ACTION_FETCH_RECOMMENDATIONS: 'ACTION_FETCH_RECOMMENDATIONS',
    ACTION_DISPATCH_SHOPPING_CART: 'ACTION_DISPATCH_SHOPPING_CART',
    ACTION_CLEAR_SHOPPING_CART: 'ACTION_CLEAR_SHOPPING_CART',
    ACTION_DISPATCH_SHIPPING_FEE: 'ACTION_DISPATCH_SHIPPING_FEE',
    ACTION_DISPATCH_ORDER_INFO: 'ACTION_DISPATCH_ORDER_INFO',

    ACTION_DISPATCH_AUTH: 'ACTION_DISPATCH_AUTH',
    ACTION_DISPATCH_CLEAR_AUTH: 'ACTION_DISPATCH_CLEAR_AUTH',
    ACTION_DISPATCH_USERINFO: 'ACTION_DISPATCH_USERINFO',

    INDEXED_DB_NAME: 'LuLuShopping',
    INDEXED_DB_VERSION: 1,
    INDEXED_DB_STORE_NAME: 'cart',
    INDEXED_DB_USER_STORE_NAME: 'user',
    INDEXED_DB_READONLY_MODE: 'readonly',
    INDEXED_DB_READWRITE_MODE: 'readwrite',

}

export default Constants

export const Breadsrumb_CatagoryIndex = {
    Gender: {
        "Men's Clothes":0,
        "Women's Clothes": 1
    },
    Catagory: {
        "Leggings": 0,
        "Shirts": 1,
        "Coats & Jackets":2,
        "Joggers":3,
        "Hoodies & Sweatshirts":4,
        "Accessories":5,
        "Bags":6,
        "Bodysuits":7,
        "Button Down Shirts":8,
        "Capris":9,
        "Dresses":10,
        "Hair Accessories":11,
        "Hats":12,
        "Long Sleeve Shirts":13,
        "Pants":14,
        "Polo Shirts":15,
        "Shoes":16,
        "Short Sleeve Shirts":17,
        "Shorts":18,
        "Socks":19,
        "Sports Bras":20,
        "Sweaters":21,
        "Sweatpants":22,
        "T-Shirts":23,
        "Tank Tops":24,
        "Team Canada":25,
        "Track Pants":26,
        "Trousers":27,
        "Underwear":28,
        "Water Bottles":29,
        "Yoga Accessories":30,
        "Yoga Mats":31,
        "Hoodies":32
    }
}