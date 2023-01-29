import {addUsersFavorite, deleteFavorite, fetchFavorite} from "../services/favorite.service";

const addToFavorite = async (e, favoriteIcon, user_id, item) => {
    const color = favoriteIcon?.current?.style?.color === 'red';

    if (color && favoriteIcon) {
        e.target.style = 'black';
        await deleteFavorite(user_id, item?.establishment_id);

    } else if (!color && favoriteIcon) {
        e.target.style = 'red';
        await addUsersFavorite(user_id, item?.establishment_id);
    }
}

async function changeFavorite(item, favoriteIcon) {
    const favorite = await fetchFavorite();

    if (favoriteIcon && favorite?.length) {
        favorite?.forEach(value => {

            if (value?.establishment_id === item?.establishment_id && favoriteIcon?.current) {
                favoriteIcon.current.style.color = 'red';
            }
        })
    }
}

export {addToFavorite, changeFavorite}

