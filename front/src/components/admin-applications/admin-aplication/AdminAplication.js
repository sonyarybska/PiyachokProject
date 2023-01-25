import './AdminAplication.css'

export function AdminApplication({item, updateState}) {

    return (<div className={'aplication-item'}>
        <div>
            <div style={{
                background: `url(${'http://localhost:4000/' + item?.avatar?.replace(/\\/g, '/')}) center center / cover no-repeat`,
                width: 200,
                height: 150
            }}></div>
            <h4>{item?.title}</h4>
        </div>
        <div>
            <button onClick={() => updateState('approve',item.establishment_id)}>Approve
            </button>

            <button onClick={() => updateState('reject',item.establishment_id)}>Reject
            </button>
        </div>
    </div>)
}

