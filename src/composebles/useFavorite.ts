import { computed, ref } from "vue";
import { QuoteType } from "../types/quote.types";


const FAVORITE_ITEMS_KEY = 'FAVORITE_ITEMS_KEY';

const getInitialValue = () => {
    const array = new Map<string, QuoteType>();
    const quotes: QuoteType[] = JSON.parse(localStorage.getItem(FAVORITE_ITEMS_KEY) || '[]') || [];

    quotes.forEach(item => {
        array.set(item._id, item)
    })

    return array;
};

function useFavorite(){
    const favorites = ref<Map<string, QuoteType>>(getInitialValue());

    function addFavorite(favorite: QuoteType){
        favorites.value.set(favorite._id, favorite);
        const str = JSON.stringify([...favorites.value.values()]);
        localStorage.setItem(FAVORITE_ITEMS_KEY, str)
    }

    function deleteFavorite(favorite: QuoteType){
        favorites.value.delete(favorite._id);
        const str = JSON.stringify([...favorites.value.values()]);
        localStorage.setItem(FAVORITE_ITEMS_KEY, str)
    }

    function clearFavorites(){
        favorites.value.clear();
        localStorage.removeItem(FAVORITE_ITEMS_KEY);
    }


    const arrayFavorites = computed(() => [...favorites.value.values()])

    return {
        favorites: arrayFavorites,
        addFavorite,
        deleteFavorite,
        clearFavorites
    }
}

export default useFavorite;