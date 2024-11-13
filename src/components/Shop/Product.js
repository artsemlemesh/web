import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Card, Image, Checkbox, Icon } from 'semantic-ui-react';
import {
  addItemToCart,
  deleteItemFromCart,
  addFavorite,
  deleteFavorite,
} from '../../store/actions/product';

function Product(product) {
  const localCartData = useSelector((state) => {
    const data = state.cart.localCart;
    return Array.isArray(data) ? data : JSON.parse(data || '[]');
  });
  console.log('Type of localCartData:', typeof localCartData);

  const cartItems = useSelector((state) => state.cart.carts || []);
  const favoriteItems = useSelector((state) => state.favorite.favorites || []);

  const dispatch = useDispatch();
  const isItemInCart =
    cartItems.some((cartItem) => cartItem.pk === product.product.pk) ||
    localCartData.some((localItem) => localItem.pk === product.product.pk);

  const isFavorite = favoriteItems.some(
    (favoriteItem) => favoriteItem.pk === product.product.pk
  );

  const [checked, setChecked] = useState(isItemInCart);
  const [favorite, setFavorite] = useState(isFavorite);

  useEffect(() => {
    setChecked(isItemInCart);
    setFavorite(isFavorite);
  }, [isItemInCart, isFavorite]);

  const onToggleCartItem = () => {
    if (isItemInCart) {
      dispatch(deleteItemFromCart(product.product.pk));
    } else {
      dispatch(addItemToCart({ data: product.product }));
    }
  };

  const onToggleFavorite = () => {
    if (favorite) {
      dispatch(deleteFavorite(product.product.pk));
    } else {
      dispatch(addFavorite(product.product));
    }
  };

  const handleCheckboxChange = () => {
    setChecked(!checked);
    onToggleCartItem();
  };
  return (
    <Card
      style={{
        maxWidth: '300px',
        margin: '15px auto',
        padding: '10px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
      }}
    >
      {/* product image */}
      {product.product.images && product.product.images.length > 0 ? (
        <Image
          src={product.product.images[0].image_large}
          alt={product.product.title}
          style={{
            width: '100%',
            height: 'auto',
            objectFit: 'contain',
            borderRadius: '5px',
          }}
        />
      ) : (
        <div
          style={{
            width: '100%',
            height: '150px',
            backgroundColor: '#f5f5f5',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <span>No Image Available</span>
        </div>
      )}
      <Card.Content>
        {/* Category and Brand Name in one line */}
        <Card.Header
          style={{
            fontSize: '1.1em',
            marginBottom: '5px',
            display: 'flex',
            justifyContent: 'space-between',
            gap: '10px',
            alignItems: 'center',
          }}
        >
          <span
            style={{
              color: '#007bff',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              maxWidth: '50%',
              cursor: 'pointer',
            }}
            title={product.product.category || 'Unknown Category'}
          >
            {product.product.category || 'Unknown Category'}
          </span>
          <strong
            style={{
              color: '#28a745',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              maxWidth: '50%',
              cursor: 'pointer',
            }}
            title={product.product.brand || 'Unknown Brand'}
          >
            {product.product.brand || 'Unknown Brand'}
          </strong>
        </Card.Header>
        {/* Size */}
        <Card.Meta style={{ fontSize: '0.9em', color: '#777' }}>
          Size: {product.product.size || 'Unknown Size'}
        </Card.Meta>
      </Card.Content>
      <Card.Content
        extra
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Checkbox
          label="In Cart"
          checked={checked}
          onChange={handleCheckboxChange}
          style={{ fontSize: '1.1em' }}
        />
        <Icon
          name={favorite ? 'heart' : 'heart outline'}
          color={favorite ? 'red' : 'grey'}
          style={{ cursor: 'pointer', marginLeft: 'auto', fontSize: '1.5em' }} 
          onClick={onToggleFavorite}
        />
      </Card.Content>
    </Card>
  );
}

export default Product;
