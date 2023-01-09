import {useEffect, useState} from "react";
import ReactStars from 'react-stars'

import './Reviews.css';
import {fetchReviews, postReview} from "../../services/review.service";
import {useDispatch, useSelector} from "react-redux";
import {Review} from "./review/Review";

export function Reviews({establishment_id}) {
    const {user: {user_id}} = useSelector(state => state.userReducer);

    let {reviews} = useSelector(state => state.reviewReducer);

    const dispatch = useDispatch();

    const [review, setReview] = useState({text: '', check: '', rating: 0});

    useEffect(() => {
        if (establishment_id) {
            dispatch(fetchReviews(establishment_id))
        }
    }, [])

       const onChange = (e) => {
        console.log(e.target);
        setReview({...review, [e.target.name]: e.target.value});
    }

    const onChangeRating = (rating) => {
        setReview({...review, rating})
    }

    const createReview = async (e) => {
        e.preventDefault();
        await postReview({...review, establishment_id, user_id});
    }

    return (
        <div className={'reviews-box'}>
            <div>
                Reviews about establishments
            </div>
            <ReactStars count={5} value={review?.rating} onChange={onChangeRating}/>
            <form className={'input-form'} onSubmit={createReview} action="">
                <input onChange={onChange} name={'text'} value={review.text} type="text"/>
                <input onChange={onChange} name={'check'} value={review.check} type="number"/>

                <button>Send</button>
            </form>

            {
                reviews.map(review => <Review key={review.review_id} review={review}/>)
            }
        </div>
    )
}