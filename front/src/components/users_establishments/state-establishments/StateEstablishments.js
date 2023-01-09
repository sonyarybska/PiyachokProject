import {useSelector} from "react-redux";
import "./StateEstablishments.css";
import {deleteEstablishment} from "../../../services/establishment.service";
import {useNavigate} from "react-router-dom";

export function StateEstablishments({state}) {
    let {users_establishments} = useSelector(state => state.establishmentReducer);
    const navigate = useNavigate();

    const redirectToEdit = (index) =>{
        navigate('/my-establishments/update',{state:users_establishments[index]});
    }

    return (<div>
        <div className={'est-container'}>
            {users_establishments.map((value, index) => {
                if (value[state]) {
                    return <div key={index} className={'div-est'}>
                        <div onClick={()=>navigate(`/adv/${value.title}`,{state:{establishment_id:value.establishment_id}})} className={'img'} style={{
                            background: `url(${'http://localhost:4000/' + value?.avatar?.replace(/\\/g, '/')}) center center / cover no-repeat`
                        }}></div>
                        <div>
                            <h4>{value.title}</h4>
                            <p>{value.type}</p>
                            <p>{value.location}</p>
                            <p>{value.start_work}-{value.end_work}</p>
                        </div>
                        <button onClick={() => deleteEstablishment(value.establishment_id)}>Delete</button>
                        <button onClick={()=>redirectToEdit(index)}>Edit</button>
                    </div>
                }
                return '';
            })}
        </div>
    </div>)
}