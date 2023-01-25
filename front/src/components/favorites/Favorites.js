import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {fetchFavoritesByUserId} from "../../services/favorite.service";
import {OneFavorite} from "./one-favorite/OneFavorite";
import './Favorites.css';

export function Favorites() {
    const {user: {user_id}} = useSelector(state => state.userReducer);
    const [favorite, setFavorite] = useState([]);

    const [totalCount, setTotalCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [fetching, setFetching] = useState(true);

    useEffect(() => {
        if(fetching){
            fetchFavoritesByUserId(user_id, currentPage, 8).then(value => {
                setFavorite([...favorite,...value.data.favorite])
                setTotalCount(value.data.count);
            }).finally(()=>setFetching(false));
            setCurrentPage(prevState => +prevState+1);
        }
    }, [fetching]);

    const scrollHandler = (e) => {
        if (e?.target?.documentElement?.scrollHeight - (e?.target?.documentElement?.scrollTop + window?.innerHeight) < 100 && favorite?.length < totalCount) {
            setFetching(true);
        }
    }

    useEffect(() => {
        document.addEventListener('scroll', scrollHandler);
        return function () {
            document.removeEventListener('scroll', scrollHandler);
        }
    }, [totalCount]);


    return (<div className={'favorite-box'}>
        {
            favorite.map(value => <OneFavorite item={value}/>)
        }
    </div>)
}