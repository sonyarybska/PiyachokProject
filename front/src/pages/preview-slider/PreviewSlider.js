import {useSearchParams,useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {useState} from "react";
import './PreviewSlider.css';

export function PreviewSlider() {
    const {one_establishment} = useSelector(state => state.establishmentReducer);

    const navigate=useNavigate();
    const [search] = useSearchParams();
    const indexParam = search.get('index');

    let [image, setImage] = useState(+indexParam);

    const prevImage = () => {
        if (image > 0) {
            setImage(--image)
        } else {
            setImage(one_establishment?.photos?.length - 1)
        }
    }

    const nextImage = () => {
        if (image < one_establishment?.photos?.length - 1) {
            setImage(++image);
        } else {
            setImage(0)
        }
    }

    return (
        <div className={'preview_container'}>
            <div className={'pagination'}>
                <button onClick={prevImage}>{'<'}</button>
                {
                    <div className={'preview_slide'}
                         style={{background: `url(${'http://localhost:4000/' +  one_establishment?.photos?.[image]?.replace(/\\/g, '/')}) center center / cover no-repeat`,}}></div>

                }
                <button onClick={nextImage}>{'>'}</button>
            </div>

            <div className={'swiper_container'}>
                {
                    one_establishment?.photos?.map((slide, index) => {
                        return (
                            <div key={index} onClick={() => setImage(index)}
                                 className={+index === +image ? 'swiper_slide act' : 'swiper_slide'} style={{
                                background: `url(${'http://localhost:4000/' + slide.replace(/\\/g, '/')}) center center / cover no-repeat`,
                            }}></div>
                        )
                    })
                }
                {
                <div onClick={()=>navigate(`/adv/${one_establishment?.title}`,{state:{image, establishment_id:one_establishment.establishment_id}})} className={'close_icon'}>{'Close'}</div>
                }
            </div>
        </div>
    )
}