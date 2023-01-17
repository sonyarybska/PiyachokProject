import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {fetchFavoritesByUserId} from "../../services/user.service";

export function Favorites() {
    const {user: {user_id}} = useSelector(state => state.userReducer);
    const [favorite, setFavorite] = useState([]);

    useEffect(() => {

        fetchFavoritesByUserId(user_id).then(value => setFavorite([...value.data]));

    }, []);

    return (<div>
        {
            favorite.map(value => <div key={value.favorite_id}>{value?.establishment?.title}</div>)
        }
    </div>)
}