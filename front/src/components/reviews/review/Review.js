import './Review.css';
import ReactStars from 'react-stars'

export function Review({review}){
    return(
        <div className={'item-review'}>
            <div>
                <ReactStars edit={false} count={5} value={review?.rating}/>
                <h5>{review?.user?.name}</h5>
                {review?.text}
            </div>
        </div>
    )
}