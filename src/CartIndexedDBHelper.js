import Constants from "./Constants";

let db;
let sampleItem1 = {
    itemKey:'prod10550089_56496_2',
    productId: 'prod10550089',
    productName:'Love Long Sleeve Shirt',
    colorAlt: 'Pink Peony',
    size: '2',
    imageUrl: 'http://api-lulu.hibitbyte.com/static/images/productImages/prod10550089/56496/prod10550089_56496_img0.jpg',
    price: 58,
    amount: 2,
    createdAt: Date.now(),
    updatedAt: Date.now()
}
let sampleItem2 = {
    itemKey:'prod10890058_45772_',
    productId: 'prod10890058',
    productName:'Curved Wristlet',
    colorAlt: 'Brier Rose',
    size: '',
    imageUrl: 'http://api-lulu.hibitbyte.com/static/images/productImages/prod10890058/45772/prod10890058_45772_img0.jpg',
    price: 48,
    amount: 1,
    createdAt: Date.now(),
    updatedAt: Date.now()
}

export const openIndexedDb = ()=> {
    console.log("openIndexedDb ...", Constants.INDEXED_DB_NAME);
    let req = window.indexedDB.open(Constants.INDEXED_DB_NAME, Constants.INDEXED_DB_VERSION);
    req.onsuccess = function (evt) {
        // Equal to: db = req.result;
        db = this.result;
        console.log("openDb DONE");
    };
    req.onerror = function (evt) {
        console.error("openDb:", evt.target);
    };

    req.onupgradeneeded = function (evt) {
        console.log("openDb.onupgradeneeded");
        let store = evt.currentTarget.result.createObjectStore(Constants.INDEXED_DB_STORE_NAME, {keyPath: "itemKey"});

        store.createIndex('productId', 'productId', {unique: false})
        store.createIndex('productName', 'productName', {unique: false})
        store.createIndex('colorAlt', 'colorAlt', {unique: false})
        store.createIndex('size', 'size', {unique: false})
        store.createIndex('imageUrl', 'imageUrl', {unique: false})
        store.createIndex('price', 'price', {unique: false})
        store.createIndex('amount', 'amount', {unique: false})
        store.createIndex('createdAt', 'createdAt', {unique: false})
        store.createIndex('updatedAt', 'updatedAt', {unique: false})
    };
}

const getObjectStore = (mode)=> {
    console.log("openIndexedDb ...", Constants.INDEXED_DB_NAME);
    let req = window.indexedDB.open(Constants.INDEXED_DB_NAME, Constants.INDEXED_DB_VERSION);
    req.onsuccess = function (evt) {
        // Equal to: db = req.result;
        db = req.result;
        console.log("openDb DONE", db);
        let tx = db.transaction(Constants.INDEXED_DB_STORE_NAME, mode);
        console.log("transaction", tx);
        console.log('store', tx.objectStore(Constants.INDEXED_DB_STORE_NAME))
        return tx.objectStore(Constants.INDEXED_DB_STORE_NAME);
    };
    req.onerror = function (evt) {
        console.error("openDb:", evt.target);
    };
}

export const addItem = (item, onSuccess, onError)=> {
    console.log("adding item to the cart", item)
    let openReq = window.indexedDB.open(Constants.INDEXED_DB_NAME, Constants.INDEXED_DB_VERSION);
    openReq.onsuccess = function (evt) {
        // Equal to: db = req.result;
        db = openReq.result;
        console.log("openDb DONE", db);
        let tx = db.transaction(Constants.INDEXED_DB_STORE_NAME, Constants.INDEXED_DB_READWRITE_MODE);
        // console.log("transaction", tx);
        let store = tx.objectStore(Constants.INDEXED_DB_STORE_NAME);
        // console.log('store', store)

        let addReq= store.add(item);
        addReq.onsuccess = () => {
            console.log('item inserted successfully', item)
            onSuccess && onSuccess();
        }
        addReq.onerror = () => {
            console.error('item inserted failed', addReq)
            onError && onError();
        }
    };
    openReq.onerror = function (evt) {
        console.error("openDb:", evt.target);
    };
    // let store = getObjectStore(Constants.INDEXED_DB_READWRITE_MODE)
    // console.log(store)
}

export const insertOrUpdateItem = (key, item, onSuccess, onError) => {
    console.log('insertOrUpdate item from cart', key)
    let openReq = window.indexedDB.open(Constants.INDEXED_DB_NAME, Constants.INDEXED_DB_VERSION);
    openReq.onsuccess = ()=> {
        let tx = db.transaction(Constants.INDEXED_DB_STORE_NAME, Constants.INDEXED_DB_READWRITE_MODE);
        let store = tx.objectStore(Constants.INDEXED_DB_STORE_NAME);

        let getReq = store.get(key)
        getReq.onsuccess = (event) => {
            let record = event.target.result;

            //no found, insert
            if (typeof record == 'undefined') {
                let addReq= store.add(item);
                addReq.onsuccess = () => {
                    console.log('item inserted successfully', item)
                    onSuccess && onSuccess();
                }
                addReq.onerror = () => {
                    console.error('item inserted failed', addReq)
                    onError && onError();
                }
            }
            //found, update
            else{
                // let newItem = JSON.parse(JSON.stringify(record))
                item.amount = record.amount + item.amount;
                if (item.amount>5) {
                    console.log('amout>5, throw' )
                    const errorEvent = new Event('error');
                    errorEvent.message = 'Exceeded maximum allowed quantity per line item.';
                    errorEvent.name = 'ExceedAmountLimit';
                    getReq.dispatchEvent(errorEvent);
                }
                else {
                    let updateReq = store.put(item);
                    updateReq.onsuccess = (event) => {
                        // console.log("evt:", event);
                        // console.log("evt.target:", event.target);
                        // console.log("evt.target.result:", event.target.result);
                        console.log("item updated successful", item);
                        onSuccess && onSuccess();
                    };
                    updateReq.onerror = function (event) {
                        console.error("update item failed by ", updateReq);
                        onError && onError()
                    };
                }
            }
        }
        getReq.onerror = (event) => {
            console.error('insertOrUpdateItem failed', event);
            onError && onError(event)
        }
    }
}

export const deleteItem = (key, onSuccess, onError) => {
    console.log('delete item from cart', key)
    let openReq = window.indexedDB.open(Constants.INDEXED_DB_NAME, Constants.INDEXED_DB_VERSION);
    openReq.onsuccess = ()=> {
        let tx = db.transaction(Constants.INDEXED_DB_STORE_NAME, Constants.INDEXED_DB_READWRITE_MODE);
        let store = tx.objectStore(Constants.INDEXED_DB_STORE_NAME);

        let getReq = store.get(key)
        getReq.onsuccess = (event) => {
            let record = event.target.result;
            console.log("record:", record);
            if (typeof record == 'undefined') {
                console.log("no matching record found by ", key)
                onError && onError()
                return;
            }

            let deleteReq = store.delete(key);
            deleteReq.onsuccess = (event) => {
                // console.log("evt:", event);
                // console.log("evt.target:", event.target);
                // console.log("evt.target.result:", event.target.result);
                console.log("item delete successful", key);
                onSuccess && onSuccess();
            };
            deleteReq.onerror = function () {
                console.error("delete item failed by ", key, deleteReq);
                onError && onError()
            };
        }
        getReq.onerror = (event)=> {
            console.error("delete item failed by ", key, event.target.errorCode);
            onError && onError()
        }
    }
}

export const updateItem = (key, item, onSuccess, onError) => {
    console.log('update item by ', key, item)
    let openReq = window.indexedDB.open(Constants.INDEXED_DB_NAME, Constants.INDEXED_DB_VERSION);
    openReq.onsuccess = ()=> {
        let tx = db.transaction(Constants.INDEXED_DB_STORE_NAME, Constants.INDEXED_DB_READWRITE_MODE);
        let store = tx.objectStore(Constants.INDEXED_DB_STORE_NAME);

        let getReq = store.get(key)
        getReq.onsuccess = (event) => {
            let record = event.target.result;
            console.log("record:", record);
            if (typeof record == 'undefined') {
                console.log("no matching record found by ", key)
                onError && onError()
                return;
            }

            let updateReq = store.put(item);
            updateReq.onsuccess = (event) => {
                // console.log("evt:", event);
                // console.log("evt.target:", event.target);
                // console.log("evt.target.result:", event.target.result);
                console.log("item updated successful", item);
                onSuccess && onSuccess();
            };
            updateReq.onerror = function (event) {
                console.error("update item failed by ", updateReq);
                onError && onError()
            };
        }
        getReq.onerror = (event)=> {
            console.error("update item failed by ", getReq);
            onError && onError()
        }
    }

}


export const getAllItems = (onSuccess, onError) => {
    console.log('get total amount in cart')
    let openReq = window.indexedDB.open(Constants.INDEXED_DB_NAME, Constants.INDEXED_DB_VERSION);
    openReq.onsuccess = ()=> {
        let tx = db.transaction(Constants.INDEXED_DB_STORE_NAME, Constants.INDEXED_DB_READONLY_MODE);
        let store = tx.objectStore(Constants.INDEXED_DB_STORE_NAME);

        let getReq = store.getAll()
        getReq.onsuccess = ()=> {
            const allItems = getReq.result
            const totalAmount = allItems.reduce((sum, item)=>sum+item.amount, 0)
            const totalCost = allItems.reduce((sum, item)=>sum+item.amount*item.price, 0)
            // console.log(allItems)
            onSuccess && onSuccess({
                total: totalAmount,
                totalCost: totalCost,
                items: allItems
            })
        }
        getReq.onerror = ()=> []
    }
    openReq.onerror = ()=> []
}
openIndexedDb()
// addItem(sampleItem1)
// addItem(sampleItem2)



