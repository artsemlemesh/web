import * as actionType from './constants'
import { handleServerErrorNew, handleServerSuccessNew } from './common'
import * as Services from '../api/index'
import Analytics from '../../utils/Analytics'
import { getItem, setItem } from '../../helpers/storage'

export const clearCart = () => (dispatch) => dispatch({ type: actionType.CLEAR_CART })

export const getUserCart = () => {
  return (dispatch) => {
    dispatch({
      type: actionType.GET_CART_LOADING,
      payload: { loading: true },
    })
    Services.getCart()
      .then((response) => {
        handleServerSuccessNew(
          actionType.GET_CART_SUCCESS,
          actionType.GET_CART_LOADING,
          response,
          dispatch,
        )
      })
      .catch((err) => {
        handleServerErrorNew(actionType.GET_CART_ERROR, actionType.GET_CART_LOADING, err, dispatch)
      })
  }
}

const LOCAL_CART_KEY = 'localCartData'; 

export const addItemToCart = (req) => {
  return (dispatch) => {
    const currentCart = JSON.parse(getItem(LOCAL_CART_KEY) || '[]');
    const itemExists = currentCart.some(item => item.pk === req.data.pk);
    if (!itemExists) {
      const updatedCart = [...currentCart, req.data];
      setItem(LOCAL_CART_KEY, JSON.stringify(updatedCart));
      dispatch(updateLocalCart(updatedCart)); 

      console.log('Product added to local storage:', updatedCart);
    } else {
      console.log('Product is already in the cart.');
    }
  };
};



// previous version (back )
// export const addItemToCart = (req) => {
//   return (dispatch) => {
//     dispatch({
//       type: actionType.GET_CART_LOADING,
//       payload: { loading: true },
//     })
//     console.log('ADDING TO CART', req.data)
//     Services.addToCart({ product: req.data.pk })
//       .then((response) => {
//         console.log('ADD TO CART RESPONSE', response)
//         if (req.onSuccess) {
//           req.onSuccess(response)
//         }
//         dispatch(getUserCart())
//         handleServerSuccessNew(
//           actionType.ADD_NEW_CART_ITEM_SUCCESS,
//           actionType.GET_CART_LOADING,
//           response,
//           dispatch,
//         )
//         // Analytics.track('Add to Cart', {
//         //   id: req.data.listing.id,
//         //   buyer_price: req.data.listing.buyer_price,
//         //   description: req.data.listing.description,
//         //   slug: req.data.listing.slug,
//         // })
//       })
//       .catch((err) => {
//         console.error("Error adding to cart:", err.response ? err.response.data : err);

//         if (req.onFail) {
//           req.onFail(err)
//         }
//         handleServerErrorNew(
//           actionType.ADD_NEW_CART_ITEM_ERROR,
//           actionType.GET_CART_LOADING,
//           err,
//           dispatch,
//         )
//       })
//   }
// }


export const deleteItemFromCart = (productId) => {
  return (dispatch) => {
    const currentCart = JSON.parse(getItem(LOCAL_CART_KEY) || '[]');
    const updatedCart = currentCart.filter(item => item.pk !== productId);
    setItem(LOCAL_CART_KEY, JSON.stringify(updatedCart));
    dispatch(updateLocalCart(updatedCart));
  };
};


// previous (makes api call to backend)
// export const deleteItemFromCart = (id) => {
//   return (dispatch) => {
//     dispatch({
//       type: actionType.GET_CART_LOADING,
//       payload: { loading: true },
//     })
//     console.log('DELETING FROM CART', id)
//     Services.deleteFromCart(id)
//       .then((response) => {
//         dispatch(getUserCart())
//         handleServerSuccessNew(
//           actionType.DELETE_CART_ITEM_SUCCESS,
//           actionType.GET_CART_LOADING,
//           response,
//           dispatch,
//         )
//       })
//       .catch((err) => {
//         handleServerErrorNew(
//           actionType.DELETE_CART_ITEM_ERROR,
//           actionType.GET_CART_LOADING,
//           err,
//           dispatch,
//         )
//       })
//   }
// }

export const addFavorite = (item) => {
  return async (dispatch) => {
    try {
      const credentials = {
        username: "admin@bynde.com", 
        password: "admin123"  
      };      
      // API call to add favorite to backend
      const response = await Services.addFavorite(item.pk, credentials);

      // If successful, update Redux and localStorage
      dispatch({ type: actionType.ADD_NEW_FAVORITE_ITEM, payload: { item: response } });
    } catch (error) {
      console.error('Error adding favorite:', error);
    }
  };
};


export const deleteFavorite = (id) => {
  return async (dispatch) => {
    try {
      const credentials = {
        username: "admin@bynde.com",
        password: "admin123"
      };
      console.log('Deleting favorite with ID:', id, 'and credentials:', credentials);
      // API call to delete favorite from backend
      const response = await Services.deleteFavorite(id, credentials); 
      // If successful, update Redux and localStorage
      dispatch({ type: actionType.DELETE_FAVORITE_ITEM, payload: { id, response } });
    } catch (error) {
      console.error('Error deleting favorite:', error);
    }
  };
};

export const cartCheckout = (req) => {
  return (dispatch) => {
    Services.cartCheckout(req.cartData)
      .then((response) => {
        if (req.onSuccess) {
          req.onSuccess(response)
        }
        handleServerSuccessNew(
          actionType.CHECKOUT_SUCCESS,
          actionType.CHECKOUT_LODING,
          response,
          dispatch,
        )
        Analytics.track('Checkout', { total: response.total, items: response.count })
      })
      .catch((err) => {
        if (req.onFail) {
          req.onFail(err)
        }
        handleServerErrorNew(actionType.CHECKOUT_ERROR, actionType.CHECKOUT_LODING, err, dispatch)
      })
  }
}

export function updateLocalCart(payload) {
  return {
    type: actionType.UPDATE_LOCAL_CART,
    payload,
  }
}

export function clearLocalCart() {
  return {
    type: actionType.REMOVE_LOCAL_CART,
  }
}
