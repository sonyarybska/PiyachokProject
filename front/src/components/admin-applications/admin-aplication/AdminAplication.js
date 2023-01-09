import {updateEstablishments} from "../../../services/establishment.service";


export function AdminApplication({item}) {
    return (
        <div>
            <h1>{item.title}</h1>
            <button onClick={() => updateEstablishments({
                approved: true,
                pending: false,
                rejected: false
            }, item.establishment_id)}>Approve
            </button>

            <button onClick={() => updateEstablishments({
                rejected: true,
                approved: false,
                pending: false
            }, item.establishment_id)}>Reject
            </button>
        </div>
    )
}

