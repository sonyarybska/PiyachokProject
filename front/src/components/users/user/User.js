import './User.css';

export function User({item}){

    return(
        <div className={'user-item'}>
            <img src={item.picture} alt=""/>
            {item.name}
        </div>
    )
}