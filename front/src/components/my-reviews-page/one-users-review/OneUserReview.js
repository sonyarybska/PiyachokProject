import './OneUserReview.css';
import ReactStars from "react-stars";

export function OneUserReview({value}) {
    return (
        <div className={'review-item'}>
            <div className={'establishment-item-review'}>
                {
                value?.establishment?.avatar && <div className={'establishment-item-review-avatar'} style={{
                    background: `url(${'http://localhost:4000/' + value?.establishment?.avatar?.replace(/\\/g, '/')}) center center / cover no-repeat`,
                }}></div>}
                <p>{value?.establishment?.title}</p>
            </div>
            <div className={'review-text'}>{
                <div>
                    <p>{value?.text}</p>
                    <ReactStars edit={false} count={5} value={value?.rating}/>
                </div>
            }</div>
        </div>
    )
}