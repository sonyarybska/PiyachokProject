import {useNavigate} from "react-router-dom";
import './UserInfoEstablishments.css';

export function UserInfoEstablishments({establishment, deleteItem}) {
    const navigate = useNavigate();

    const redirectToEdit = () => {
        navigate('/my-establishments/update', {state: establishment});
    }

    return (
        <div>
            <div className={'establishment_item'}>

                <div className={'establishment-image'}
                     onClick={() => navigate(`/adv/${establishment.title}`, {state: {establishment_id: establishment.establishment_id}})}
                     style={{
                         background: `url(${'http://localhost:4000/' + establishment?.avatar?.replace(/\\/g, '/')}) center center / cover no-repeat`
                     }}></div>

                <div className={'establishment-details'}>
                    <h4>{establishment.title}</h4>
                    <p>{establishment.type}</p>
                    <p>{establishment.location}</p>
                    <p>{establishment.start_work}-{establishment.end_work}</p>
                </div>
                <button onClick={() => deleteItem(establishment.establishment_id)}>Delete</button>
                <button onClick={() => redirectToEdit()}>Edit</button>
            </div>
        </div>
    )
}