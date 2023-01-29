import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import './App.css';


import { AdminMenu, AuthRequest, ConfirmationPage, CrudEstablishmentsPage, EstablishmentInfo, Establishments, Favorites,
    MyReviewsPage, ResponseInterceptor, Settings, PreviewSlider
} from "./pages/index";

import {checkAuth} from "./services/auth.service";
import {MainLayout} from "./layots/index";

function App() {
    const dispatch = useDispatch();

    const [age, setAge] = useState(JSON.parse(localStorage.getItem('age')));

    useEffect(() => {
        if (localStorage.getItem('access_token')) {
            dispatch(checkAuth()).then();
        }
    }, [dispatch]);

    useEffect(() => {
        if (localStorage.getItem('age')) {
            setAge(true);
        }
    }, []);

    return (<Router>
        {age ? <div className="App">
            <ResponseInterceptor/>
            <Routes>
                <Route  path={"/"} element={<MainLayout/>}>
                    <Route index element={<Establishments/>}/>
                <Route path={'my-establishments/*'} element={<CrudEstablishmentsPage/>}/>
                <Route path={'admin-page/*'} element={<AdminMenu/>}/>
                <Route path={'settings'} element={<Settings/>}/>
                <Route path={'favorites'} element={<Favorites/>}/>
                <Route path={'my-reviews'} element={<MyReviewsPage/>}/>
                <Route path={'adv/:title/*'} element={<EstablishmentInfo/>}/>
                <Route path={'auth'} element={<AuthRequest/>}/>
                </Route>
                <Route path={'/adv/:title/previewSlider'} element={<PreviewSlider/>}/>
                <Route path={'*'} element={<div>nor</div>}/>
            </Routes>
        </div> : <ConfirmationPage setAge={setAge}/>}
    </Router>);
}

export default App;
