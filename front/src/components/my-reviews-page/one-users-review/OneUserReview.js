import './OneUserReview.css';

export function OneUserReview({value}) {
    return (
        <div className={'review-item'}>
            <div className={'establishment-item-review'}>
                <div className={'establishment-item-review-avatar'} style={{
                    background: `url(${'http://localhost:4000/' + value?.establishment?.avatar?.replace(/\\/g, '/')}) center center / cover no-repeat`,
                }}></div>
                <p>{value?.establishment?.title}</p>
            </div>
            <div className={'review-text'}>{
                <p>{value?.text}</p>

            }</div>
        </div>
    )
}