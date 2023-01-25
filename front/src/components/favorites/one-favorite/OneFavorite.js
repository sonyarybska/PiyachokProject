import './OneFavorite.css';

export function OneFavorite({item: {establishment}}) {

    return (
        <div className={'favorite-item'}>
            <div className={'avatar-favorite'} style={{
                background: `url(${'http://localhost:4000/' + establishment?.avatar?.replace(/\\/g, '/')}) center center / cover no-repeat`
            }}></div>
            <p>{establishment.title}</p>
        </div>
    )
}
