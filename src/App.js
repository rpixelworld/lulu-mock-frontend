import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {WhatsNew} from "./pages/WhatsNew";
import {Layout} from "./components/Layout";
import {ProductDetail} from "./pages/ProductDetail";
import {ShoppingCart} from "./pages/ShoppingCart";
import {useEffect} from "react";
import {openIndexedDb} from "./CartIndexedDBHelper";

function App() {

    useEffect(() => {

        // openIndexedDb()
        // console.log('app useeffect')
        // let db
        // const request = window.indexedDB.open("LuluShopingCart");
        // request.onerror = (event) => {
        //     // console.error("Why didn't you allow my web app to use IndexedDB?!");
        //     console.error("openDb:", event.target.errorCode);
        // };
        // request.onsuccess = (event) => {
        //     db = request.result;
        //
        // };
        // request.onupgradeneeded = (event) => {
        //     console.log("openDb.onupgradeneeded");
        //     db = event.currentTarget.result
        //     const objectStore = db.createObjectStore("cart", {keyPath: "itemKey"});
        //     objectStore.createIndex('productId', 'productId', {unique: false})
        //     objectStore.createIndex('productName', 'productName', {unique: false})
        //     objectStore.createIndex('colorAlt', 'colorAlt', {unique: false})
        //     objectStore.createIndex('size', 'size', {unique: false})
        //     objectStore.createIndex('imageUrl', 'imageUrl', {unique: false})
        //     objectStore.createIndex('price', 'price', {unique: false})
        //     objectStore.createIndex('amount', 'amount', {unique: false})
        //
        //
        //
        //     objectStore.transaction.oncomplete = (event) => {
        //         const cartObectStore = db
        //             .transaction("cart", "readwrite")
        //             .objectStore("cart");
        //         let req = cartObectStore.add({
        //             itemKey:'prod10550089_56496_2',
        //             productId: 'prod10550089',
        //             productName:'Love Long Sleeve Shirt',
        //             colorAlt: 'Pink Peony',
        //             size: '2',
        //             imageUrl: 'http://api-lulu.hibitbyte.com/static/images/productImages/prod10550089/56496/prod10550089_56496_img0.jpg',
        //             price: 58,
        //             amount: 2
        //         })
        //         console.log("inserted")
        //         req.onsuccess = (event)=> {
        //             console.log("inserted")
        //         }
        //         req.onerror = (event) => {
        //             console.error(event.target.errorCode)
        //         }
        //     }
        //
        // }
    }, []);

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout/>}>
                    <Route index element={<WhatsNew/>}/>
                    <Route path='/whatsnew/:key/:index' element={<WhatsNew/>}/>
                    <Route path='/product/:productId' element={<ProductDetail/>}/>
                    <Route path='/shop/cart' element={<ShoppingCart/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
