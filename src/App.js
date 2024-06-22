import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {WhatsNew} from "./pages/WhatsNew";
import {Layout} from "./components/Layout";
import {ProductDetail} from "./pages/ProductDetail";
import {ShoppingCart} from "./pages/ShoppingCart";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
            <Route index element={<WhatsNew />}/>
            <Route path='/whatsnew/:key/:index' element={<WhatsNew />} />
            <Route path='/product/:productId' element={<ProductDetail />} />
            <Route path='/shop/cart' element={<ShoppingCart />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
