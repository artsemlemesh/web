import NetworkHelper from './NetworkHelper'
import Config from '../config'

const WebService = (() => {
  const BASE_URL = Config.api_base_url
  const makeUrl = (path: string) => {
    return `${BASE_URL}${path}`
  }

  const signIn = (email: string, password: string) => {
    return NetworkHelper.requestPost(makeUrl('/auth/login'), {
      email,
      password,
    })
  }

  const validateOTP = (email: string, code: string) => {
    return NetworkHelper.requestPatch(makeUrl('/auth/confirm'), {
      email,
      code,
    })
  }

  const forgotPass = (email: string) => {
    return NetworkHelper.requestPost(makeUrl('/auth/forgot'), {
      email,
    })
  }

  const resendEmail = (email: string) => {
    return NetworkHelper.requestPost(makeUrl('/auth/resend'), {
      email,
    })
  }

  const resetPassword = (
    new_password: string,
    confirm_password: string,
    uid: string,
    token: string,
  ) => {
    return NetworkHelper.requestPost(makeUrl(`/auth/reset/${uid}/${token}`), {
      new_password,
      confirm_password,
    })
  }

  const socialSignIn = (provider: string, access_token: string) => {
    return NetworkHelper.requestPost(makeUrl('/auth/oauth2/login'), {
      provider,
      access_token,
    })
  }

  const socialGoogleTap = (credential: string) => {
    return NetworkHelper.requestPost(makeUrl('/auth/social/google-tap'), {
      credential,
    })
  }

  const signUp = (data: unknown) => {
    return NetworkHelper.requestPost(makeUrl('/auth/register'), data)
  }

  const connectStripe = async (data: unknown) => {
    return NetworkHelper.requestPost(makeUrl('/profile/account'), data)
  }

  const disconnectStripe = async () => {
    return NetworkHelper.requestDelete(makeUrl('/profile/account'), {})
  }

  const getShopListings = async (url: string) => {
    let apiURL = makeUrl(`/products/`)
    if (url) {
      apiURL = url
    }
    return NetworkHelper.requestGet(apiURL)
  }

  const getListings = async (id: number | null) => {
    return NetworkHelper.requestGet(makeUrl(`/products/${id ? `?purchased_by=${id}` : ''}`))
  }

  const getUserProfile = async () => {
    return NetworkHelper.requestGet(makeUrl(`/profile`))
  }

  const verifyUser = async (oid: string, token: string) => {
    return NetworkHelper.requestGet(makeUrl(`/auth/verify/${oid}/${token}`))
  }

  const deleteProfile = async () => {
    return NetworkHelper.requestDelete(makeUrl(`/profile/delete`), {})
  }

  const socialApple = async (params: unknown) => {
    return NetworkHelper.requestPost(makeUrl(`/auth/social/apple`), params)
  }

  const getListingDetail = async (id: number) => {
    return NetworkHelper.requestGet(makeUrl(`/products/${id}/`))
  }

  const updateProfile = async (item: unknown) => {
    return NetworkHelper.requestPatch(makeUrl(`/profile`), item)
  }

  const getBundleList = async () => {
    return NetworkHelper.requestGet(makeUrl('/sellings/'))
  }

  const getBundleDetail = async (id: number) => {
    return NetworkHelper.requestGet(makeUrl(`/sellings/${id}/`))
  }

  const createNewBundle = async (
    title: string,
    tags: string[],
    description: string,
    sellerPrice: number,
  ) => {
    return NetworkHelper.requestPost(makeUrl(`/sellings/`), {
      title,
      tags,
      description,
      sellerPrice,
    })
  }

  const updateBundle = async (
    id: number,
    item: { pk: string; title: string; tags: string; description: string; sellerPrice: number },
  ) => {
    const { pk, title, tags, description, sellerPrice } = item
    return NetworkHelper.requestPut(makeUrl(`/sellings/${pk}/`), {
      title,
      tags,
      description,
      sellerPrice,
      created_by: id,
    })
  }

  const publishBundle = async (id: number) => {
    return NetworkHelper.requestPatch(makeUrl(`/sellings/${id}/publish/`), {})
  }

  const deleteBundle = async (id: number) => {
    return NetworkHelper.requestDelete(makeUrl(`/sellings/${id}/`), { id })
  }

  const addItem = async (id: number, item: unknown) => {
    // return NetworkHelper.requestPost(
    return NetworkHelper.requestHttp('POST', makeUrl(`/sellings/${id}/items/`), item)
  }
  // const addItem = async (id: number, item: any) => {
  //
  //   return NetworkHelper.requestPost(
  //     makeUrl(`/sellings/${id}/items/`),
  //     item,
  //
  //   );
  // };

  const updateItem = async (listingId: number, id: number, item: unknown) => {
    return NetworkHelper.requestPatch(makeUrl(`/sellings/${listingId}/items/${id}/`), item)
  }

  const deleteItem = async (listingId: number, id: number) => {
    return NetworkHelper.requestDelete(makeUrl(`/sellings/${listingId}/items/${id}/`), {})
  }
  const getUrl = async (url: string) => {
    return NetworkHelper.requestGet(makeUrl(url))
  }

  const loadItemOptions = () => {
    return NetworkHelper.requestGet(makeUrl(`/item/options/`))
  }

  const getCart = async () => {
    return NetworkHelper.requestGet(makeUrl(`/cart`))
  }

  const addToCart = async (item: unknown) => {
    return NetworkHelper.requestPost(makeUrl(`/products`), item)
  }

  const deleteFromCart = async (itemID: number) => {
    return NetworkHelper.requestDelete(makeUrl(`/products/${itemID}`), {})
  }

  const addFavorite = async (productID: unknown, credentials: any) => {
    return NetworkHelper.requestPost(makeUrl(`/products/${productID}/add-favorite/`), credentials)
  }

  const deleteFavorite = async (productID: number, credentials: any) => {
    return NetworkHelper.requestDelete(makeUrl(`/products/${productID}/remove-favorite/`), credentials)
  }
  
  const cartCheckout = async (cartData: unknown) => {
    return NetworkHelper.requestPost(makeUrl(`/cart/checkout/v2`), cartData)
  }

  const getBuyerOderList = () => {
    const apiURL = makeUrl(`/buyerorder/`)
    return NetworkHelper.requestGet(apiURL)
  }

  return {
    signIn,
    validateOTP,
    socialSignIn,
    signUp,
    updateProfile,
    deleteProfile,
    connectStripe,
    disconnectStripe,
    getShopListings,
    getListings,
    getListingDetail,
    getBundleList,
    getBundleDetail,
    createNewBundle,
    updateBundle,
    deleteBundle,
    publishBundle,
    addItem,
    updateItem,
    deleteItem,
    loadItemOptions,
    getCart,
    addToCart,
    deleteFromCart,
    addFavorite,
    deleteFavorite,
    cartCheckout,
    getUrl,
    verifyUser,
    getUserProfile,
    socialGoogleTap,
    socialApple,
    forgotPass,
    resetPassword,
    resendEmail,
    makeUrl,
    getBuyerOderList,
  }
})()

export default WebService
