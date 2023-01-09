import './ConfirmationPage.css';

export function ConfirmationPage({setAge}) {
    return (
        <div className={'confirmation-container'}>
            <div className={'confirm-window'}>
                <p>Please confirm that you are over 18 years old</p>
                <div className={'confirm-buttons'}>
                    <button onClick={()=>setAge(1)}>I am over 18</button>
                    <button>I am under 18</button>
                </div>
            </div>
        </div>
    )
}