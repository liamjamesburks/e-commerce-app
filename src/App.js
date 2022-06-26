import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { createUserDocumentFromAuth, onAuthStateChangedListener } from "./utils/firebase/firebase.utils";
import { setCurrentUser } from "./store/user/user.action";
import { useDispatch } from "react-redux";

import Navbar from "./components/navbar/navbar.component";
import Home from "./pages/home/home.page";
import Authentication from "./pages/sign-in/authentication";
import Shop from './pages/shop/shop.component';
import Checkout from "./pages/checkout/checkout.component";

import './App.css';

const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const unsubscribe = onAuthStateChangedListener(async (user) => {
            if (user) {
                await createUserDocumentFromAuth(user);
            }
            dispatch(
                setCurrentUser(user)
            );
        });
        return unsubscribe;
    }, []);

    return (
        <Routes>
            <Route path='/' element={<Navbar />}>
                <Route index={true} element={<Home />} />
                <Route path="shop/*" element={<Shop />} />
                <Route path="auth" element={<Authentication />} />
                <Route path="auth" element={<Authentication />} />
                <Route path="checkout" element={<Checkout />}/>
            </Route>
        </Routes>
    );

}

export default App;