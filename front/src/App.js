import './App.css';
import React, {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {Header} from "./components/header/Header";
import {Establishments} from "./components/establishments/Establishments";
import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";
import {checkAuth} from "./services/auth.service";
import {CrudEstablishmentsPage} from "./components/crud-establishments-page/CrudEstablishmentsPage";
import {Settings} from "./components/settings/Settings";
import {EstablishmentInfo} from "./components/establishment-info/EstablishmentInfo";
import {PreviewSlider} from "./components/establishment-info/preview-slider/PreviewSlider";
import {ConfirmationPage} from "./components/confirmation-page/ConfirmationPage";
import {MyReviewsPage} from "./components/my-reviews-page/MyReviewsPage";
import {Favorites} from "./components/favorites/Favorites";
import {AdminMenu} from "./components/admin-menu/AdminMenu";
import {AuthRequest} from "./components/auth-request/AuthRequest";
import {ResponseInterceptor} from "./components/response-interceptor/ResponseInterceptor";

function App() {
    const dispatch = useDispatch();

    const [age, setAge] = useState(null);

    useEffect(() => {
        if (localStorage.getItem('access_token')) {
            dispatch(checkAuth()).then();
        }
    }, [dispatch]);


    return (<Router>
        {age ? <div className="App">
            <ResponseInterceptor/>
            <Routes>
                <Route path={'/adv/:title/previewSlider'} element={<PreviewSlider/>}/>
                <Route path={'/*'} element={<Header/>}/>
            </Routes>
            <Routes>
                <Route path={'/'} element={<Establishments/>}/>
                <Route path={'/my-establishments/*'} element={<CrudEstablishmentsPage/>}/>
                <Route path={'/admin-page/*'} element={<AdminMenu/>}/>
                <Route path={'/settings'} element={<Settings/>}/>
                <Route path={'/favorites'} element={<Favorites/>}/>
                <Route path={'/my-reviews'} element={<MyReviewsPage/>}/>
                <Route path={'/adv/:title/previewSlider'} element={''}/>
                <Route path={'/adv/:title/*'} element={<EstablishmentInfo/>}/>
                <Route path={'/auth'} element={<AuthRequest/>}/>
            </Routes>
        </div> : <ConfirmationPage setAge={setAge}/>}
    </Router>);
}

export default App;
