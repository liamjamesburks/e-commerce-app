import { Routes, Route } from "react-router-dom";

import Navbar from "./components/navbar/navbar.component";
import Home from "./pages/home/home.page";
import Authentication from "./pages/sign-in/authentication";

import './App.css';

const Shop = () => {
    return (
        <div>
            <code>
                Hello this is code
            </code>
        </div>
    )
}

const App = () => {
    return (
        <Routes>
            <Route path='/' element={<Navbar />}>
                <Route index={true} element={<Home />} />
                <Route path="shop" element={<Shop />} />
                <Route path="auth" element={<Authentication />} />
            </Route>
        </Routes>
    );

}

export default App;