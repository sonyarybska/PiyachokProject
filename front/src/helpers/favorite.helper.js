import {addUsersFavorite, deleteFavorite, fetchFavorite} from "../services/favorite.service";

const addToFavorite = async (e, favoriteIcon, user_id, item) => {
    const color = favoriteIcon?.current?.style?.color === 'red';

    if (color && favoriteIcon && e.target) {
        e.target.style = 'black';
        await deleteFavorite(user_id, item?.establishment_id);

    } else if (!color && favoriteIcon.current && e.target) {
        e.target.style = 'red';
        await addUsersFavorite(user_id, item?.establishment_id);
    }
}

async function changeFavorite(item, favoriteIcon, user_id) {
    const favorite = await fetchFavorite();

    if (favoriteIcon.current && favorite?.length && user_id) {
        favorite?.forEach(value => {

            if (value?.establishment_id === item?.establishment_id && value?.user_id === user_id && favoriteIcon?.current) {
                favoriteIcon.current.style.color = 'red';
            }
        })
    }
}

export {addToFavorite, changeFavorite}

