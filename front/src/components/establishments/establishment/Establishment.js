import "./Establishment.css";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import {createRef, useEffect, useState} from "react";
import {addToFavorite, changeFavorite} from "../../../helpers/favorite.helper";

export function Establishment({item}) {
    const {user: {user_id}} = useSelector(state => state.userReducer);

    const [favorite, setFavorite] = useState(false);

    const favoriteIcon = createRef();

    const addToFavoriteList = async (e) => {
        await addToFavorite(e, favoriteIcon, user_id, item);

        setFavorite(true);
    }

    useEffect(() => {
        changeFavorite(item, favoriteIcon);
        setFavorite(false);
    }, [favorite, item]);

    return (
        <div>
            <div className={'establishment-item'}>
                <div>

                    <Link to={`/adv/${item.title}`} state={{establishment_id: item.establishment_id}}>
                        <div className={'avatar'} style={{
                            background: `url(${'http://localhost:4000/' + item?.avatar?.replace(/\\/g, '/')}) center center / cover no-repeat`,
                        }}></div>
                    </Link>
                    <Link to={`/adv/${item.title}`} state={{establishment_id: item.establishment_id}}>
                        <p>{item.title}</p>
                    </Link>
                </div>
                <i ref={favoriteIcon} onClick={addToFavoriteList} className="fa fa-heart" style={{fontSize: "34"}}></i>
            </div>
        </div>
    )
}