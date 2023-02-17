import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import './App.css';

import {
    AdminMenu, Login, ConfirmationPage, CrudEstablishmentsPage, EstablishmentInfo, Establishments, Favorites,
    MyReviewsPage, ResponseInterceptor, PreviewSlider
} from "./pages/index";

import {checkAuth} from "./services/auth.service";
import {MainLayout} from "./layots/index";
import {AuthRequest} from "./hoc/AuthRequest";

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
                <Route path={"/"} element={<MainLayout/>}>
                    <Route index element={<Establishments/>}/>
                    <Route path={'my-establishments/*'} element={<AuthRequest>
                        <CrudEstablishmentsPage/>
                    </AuthRequest>}/>
                    <Route path={'admin-page/*'} element={<AuthRequest>
                        <AdminMenu/>
                    </AuthRequest>}/>
                    <Route path={'favorites'} element={<AuthRequest>
                        <Favorites/>
                    </AuthRequest>}/>
                    <Route path={'my-reviews'} element={<AuthRequest>
                        <MyReviewsPage/>
                    </AuthRequest>}/>
                    <Route path={'adv/:title/*'} element={<EstablishmentInfo/>}/>
                    <Route path={'auth'} element={<Login/>}/>
                </Route>
                <Route path={'/adv/:title/previewSlider'} element={<PreviewSlider/>}/>
                <Route path={'*'} element={<div>Not found</div>}/>
            </Routes>
        </div> : <ConfirmationPage setAge={setAge}/>}
    </Router>);
}

export default App;
