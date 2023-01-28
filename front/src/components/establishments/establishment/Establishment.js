import "./Establishment.css";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import {createRef, useEffect, useState} from "react";
import {addToFavorite, changeFavorite} from "../../../helpers/favorite.helper";
import {fetchRatingByEstablishmentId} from "../../../services/review.service";
import ReactStars from 'react-stars'

export function Establishment({item, sortFunction, loginRequest}) {
    const {user: {user_id}, isAuth} = useSelector(state => state.userReducer);

    const [rating, setRating] = useState(null);

    const {establishment_id} = item;


    const [favorite, setFavorite] = useState(false);

    const favoriteIcon = createRef();

    const addToFavoriteList = async (e) => {
        await addToFavorite(e, favoriteIcon, user_id, item);

        setFavorite(true);
    }

    useEffect(() => {
        if (establishment_id) {
            fetchRatingByEstablishmentId(establishment_id).then(rate => setRating(rate?.avgRating));
        }
    }, [sortFunction]);


    useEffect(() => {
        if (isAuth) {
            changeFavorite(item, favoriteIcon);
            setFavorite(false);
        } else if (favoriteIcon.current) {
            favoriteIcon.current.style = 'black';
        }
    }, [favoriteIcon, isAuth, item, favorite]);

    return (
        <div>
            {<div className={'establishment-item'}>
                    <div>
                        <Link to={`/adv/${item.title}`} className={loginRequest ? 'disable_link' : ''}
                              state={{establishment_id: item.establishment_id}}>
                            <div className={'avatar'} style={{
                                background: `url(${'http://localhost:4000/' + item?.avatar?.replace(/\\/g, '/')}) center center / cover no-repeat`,
                            }}></div>
                        </Link>
                        <Link className={loginRequest ? 'disable_link' : ''} to={`/adv/${item.title}`}
                              state={{establishment_id: item.establishment_id}}>
                            <p>{item.title}</p>
                            <p>{item.type}</p>
                        </Link>
                    </div>
                    <i ref={favoriteIcon} onClick={addToFavoriteList} className="fa fa-heart"
                       style={{fontSize: "34"}}></i>

                    <ReactStars key={item.establishment_id} count={5} value={rating} edit={false}/>
                </div>
            }

        </div>
    )
}