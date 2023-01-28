import './Review.css';
import ReactStars from 'react-stars'
import {useSelector} from "react-redux";

export function Review({review, deleteItem}) {
    const {user: {user_id}} = useSelector(state => state.userReducer);

    return (
        <div className={'item-review'}>
            <div className={'text-review'}>
                <ReactStars edit={false} count={5} value={review?.rating}/>
                <h5>{review?.user?.name}</h5>
                {review?.text}
            </div>
            {user_id === review.user_id && <div>
                <button onClick={()=>deleteItem(review.review_id)}>Delete</button>
            </div>}

        </div>
    )
}