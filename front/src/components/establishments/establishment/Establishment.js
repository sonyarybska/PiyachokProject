import "./Establishment.css";
import {Link} from "react-router-dom";
import {addUsersFavorite} from "../../../services/user.service";
import {useSelector} from "react-redux";

export function Establishment({item}) {
    const {user: {user_id}} = useSelector(state => state.userReducer);

    const addToFavorite = async (e) => {
        await addUsersFavorite(user_id,item.establishment_id);
        console.log(e.target.style.color = "red");
    }

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
                <i onClick={addToFavorite} className="fa fa-heart" style={{fontSize: "34"}}></i>
            </div>
        </div>
    )
}