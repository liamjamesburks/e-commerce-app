import { Routes, Route } from "react-router-dom";

import Navbar from "./components/navbar/navbar.component";
import Home from "./pages/home/home.page";
import Authentication from "./pages/sign-in/authentication";
import Shop from './pages/shop/shop.component';
import Checkout from "./pages/checkout/checkout.component";

import './App.css';

const App = () => {
    return (
        <Routes>
            <Route path='/' element={<Navbar />}>
                <Route index={true} element={<Home />} />
                <Route path="shop" element={<Shop />} />
                <Route path="auth" element={<Authentication />} />
                <Route path="auth" element={<Authentication />} />
                <Route path="checkout" element={<Checkout />}/>
            </Route>
        </Routes>
    );

}

export default App;