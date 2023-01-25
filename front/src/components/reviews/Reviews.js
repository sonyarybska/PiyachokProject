import {useEffect, useState} from "react";
import ReactStars from 'react-stars'

import './Reviews.css';
import {fetchReviewsByEstablishmentId, postReview} from "../../services/review.service";
import {useDispatch, useSelector} from "react-redux";
import {Review} from "./review/Review";
import {useLocation} from "react-router-dom";
import {AuthRequest} from "../auth-request/AuthRequest";

export function Reviews({establishment_id}) {
    const {state} = useLocation();
    const {user: {user_id}} = useSelector(state => state.userReducer);

    let {reviews} = useSelector(state => state.reviewReducer);

    const dispatch = useDispatch();

    const [review, setReview] = useState({text: '', check: '', rating: 0});

    const [fetching, setFetching] = useState(true);

    useEffect(() => {
        if (establishment_id) {
            dispatch(fetchReviewsByEstablishmentId(establishment_id))
            setFetching(false);
        }
    }, [dispatch, establishment_id, fetching])

    const onChange = (e) => {
        setReview({...review, [e.target.name]: e.target.value});
    }

    const onChangeRating = (rating) => {
        setReview({...review, rating})
    }

    const createReview = async (e) => {
        e.preventDefault();
        await postReview({...review, establishment_id, user_id}).finally(()=>setFetching(true));
    }


    return (
        <div className={'reviews-box'}>
            {
                state?.loginRequest && <AuthRequest/>
            }

            <div>
                Reviews about establishments
            </div>
            <ReactStars className={state?.loginRequest?'disable_actions':''} count={5} value={review?.rating} onChange={onChangeRating}/>
            <form className={'input-form'} onSubmit={createReview} action="">
                <input onChange={onChange} className={state?.loginRequest?'disable_actions':''} name={'text'} value={review.text} type="text"/>
                <input onChange={onChange} className={state?.loginRequest?'disable_actions':''} name={'check'} value={review.check} type="number"/>

                <button className={state?.loginRequest?'disable_actions':''}>Send</button>
            </form>

            {
              reviews.length && reviews.map(review => <Review key={review.review_id} review={review}/>)
            }
        </div>
    )
}