import React from 'react';
import { cartItems } from '../utils/interface';
import { useStateValue } from '../utils/StateProvider';


const SingleProduct = (props: { id: number, title: string, image_url: string, price: number, currency: string }) => {
  
  // eslint-disable-next-line
    const [{ basket, cartDisplay, }, dispatch ] = useStateValue();

    const setDisplay = (display: string) => {
        dispatch({ type: 'CART_DISPLAY', display: display });
        dispatch({ type: 'SET_WIDTH', width: 'calc(100vw - 350px)' });
    }

    const addToCart = () => {
        // If the product already exists in cart, increment tne quantity, 
        // else add to cat
        const index = basket.findIndex((basket: cartItems) => basket.id === props.id);
        const newBasket = [...basket];

        if(index > -1){
            // It exists
            newBasket[index].quantity++;
            dispatch({ type: 'INCREMENT_ITEM', basket: newBasket });
        }else{
            // It does not exist
            dispatch({ type: 'ADD_TO_CART', item: { ...props, quantity: 1 }, });
        }
    }

  return (
    <div className={`singleProduct tx_center ${ cartDisplay === 'block' ? ' under_cart ' : ' '  }`} key={`k_${props.id}`}>
      <div className='product_div centered'>
        <img className='product_image' src={props.image_url} alt={`${ props.title }`}/>
        <div className='product_title tx_center centered'>{ props.title }</div>
        <div className='product_price tx_center'>From { props.currency } { `${props.price}`.match(/\./) ? props.price : `${ props.price }.00` }</div>
        <div className='add_toCart p_1 centered tx_center' onClick={() => { addToCart(); setDisplay('block'); }}>Add to cart</div>
      </div>
    </div>
  )
}

export default SingleProduct;