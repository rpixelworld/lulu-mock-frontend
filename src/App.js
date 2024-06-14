import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {WhatsNew} from "./pages/WhatsNew";
import {Layout} from "./components/Layout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
            <Route index element={<WhatsNew />}/>
            <Route path='/whatsnew/:key/:index' element={<WhatsNew />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
