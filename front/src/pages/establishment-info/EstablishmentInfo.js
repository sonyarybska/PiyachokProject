import {createRef, useEffect, useState} from "react";
import {Route, Routes, Link, useLocation} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import './EstablishmentInfo.css';

import {fetchOneEstablishment} from "../../services/establishment.service";
import {addToFavorite, changeFavorite} from "../../helpers/favorite.helper";
import {getOneEstablishments} from "../../redux/actions/actions";
import {News, Reviews} from "../../components/index";


export function EstablishmentInfo() {
    const {one_establishment} = useSelector(state => state.establishmentReducer);

    const {user: {user_id}, isAuth, isForbidden} = useSelector(state => state.userReducer);

    const dispatch = useDispatch();
    const {state} = useLocation();

    let [image, setImage] = useState(state?.image === undefined ? 0 : state?.image);

    const [favorite, setFavorite] = useState(false);

    const imagesLength = one_establishment?.photos?.length;

    const favoriteIcon = createRef();

    useEffect(() => {
        fetchOneEstablishment(state?.establishment_id).then(item => dispatch(getOneEstablishments(item.data)));
    }, [dispatch, state?.establishment_id])

    const prevImage = () => {
        if (image > 0) {
            setImage(--image)
        } else {
            setImage(imagesLength - 1)
        }
    }

    const nextImage = () => {
        if (image < imagesLength - 1) {
            setImage(++image);
        } else {
            setImage(0)
        }
    }

    const addToFavoriteList = async (e) => {
        await addToFavorite(e, favoriteIcon, user_id, one_establishment);

        setFavorite(true);
    }

    useEffect(() => {
        if (isAuth && favoriteIcon.current) {
            changeFavorite(one_establishment, favoriteIcon);
            setFavorite(false);
        } else if (favoriteIcon.current) {
            favoriteIcon.current.style = 'black';
        }
    }, [favorite, favoriteIcon, isAuth, one_establishment]);

    return (
        <div className={'info-container'}>
            {one_establishment.title && <div>
                <h1>{one_establishment.title}</h1>
                {
                    <div className={'slider'}>
                        <button disabled={!!isForbidden} onClick={prevImage}>{'<'}</button>

                        <div className={`slide`}>
                            <Link style={{pointerEvents: isForbidden ? "none" : ''}} to={`previewSlider?index=${image}`}
                                  state={{title: one_establishment.title}}>
                                <div className={`image`} style={{
                                    background: `url(${'http://localhost:4000/' + one_establishment?.photos?.[image]?.replace(/\\/g, '/')}) center center / cover no-repeat`,
                                }}>
                                    <div className={'swiper-container'}>
                                        {
                                            one_establishment?.photos?.map((item, index) => {
                                                return (
                                                    <div key={index}
                                                         className={index === image ? 'active swiper-pagination' : 'swiper-pagination'}></div>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            </Link>

                            <i onClick={(e) => addToFavoriteList(e)} ref={favoriteIcon} className="fa fa-heart"
                               style={{fontSize: "34", color: 'black'}}></i>
                        </div>
                        <button disabled={!!isForbidden} onClick={nextImage}>{'>'}</button>
                    </div>
                }
            </div>}
            <div className={'news-box'}>
                <p>News</p>
                {one_establishment?.user_id === user_id ? <News/> : ''}
            </div>
            <Routes>
                <Route path={'/'} element={<Reviews establishment_id={one_establishment?.establishment_id}/>}/>
            </Routes>
        </div>
    )
}