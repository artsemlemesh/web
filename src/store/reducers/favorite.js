import * as actionType from '../actions/constants';
import { getItem, setItem } from '../../helpers/storage'; 

const LOCAL_FAVORITES_KEY = 'favorites'; 

const initialState = {
  success: false,
  error: null,
  favorites: getItem(actionType.LOCAL_FAVORITES_KEY) ? JSON.parse(getItem(LOCAL_FAVORITES_KEY)) : [], 
};

// eslint-disable-next-line @typescript-eslint/default-param-last
export default (state = initialState, action) => {
  switch (action.type) {
    case actionType.ADD_NEW_FAVORITE_ITEM: {
      const product = action.payload.item;
      const updatedFavorites = [...state.favorites, { ...product }];
      
      // Save to local storage
      setItem(LOCAL_FAVORITES_KEY, JSON.stringify(updatedFavorites));
      
      return {
        ...state,
        favorites: updatedFavorites,
      };
    }
    case actionType.DELETE_FAVORITE_ITEM: {
      const updatedFavorites = state.favorites.filter((favorite) => favorite.pk !== action.payload.id);
      
      // Update local storage
      setItem(LOCAL_FAVORITES_KEY, JSON.stringify(updatedFavorites));
      
      return {
        ...state,
        favorites: updatedFavorites,
      };
    }
    case actionType.USER_LOGOUT: {
      // Clear favorites from local storage on logout
      setItem(LOCAL_FAVORITES_KEY, JSON.stringify([]));
      return initialState;
    }
    default:
      return state;
  }
};