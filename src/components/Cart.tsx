import React, { FC, } from 'react'
import { useStateValue } from '../utils/StateProvider';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { cartItems } from '../utils/interface';
import ClearIcon from '@mui/icons-material/Clear';

const Cart: FC = () => {
  const [{ basket, cartDisplay, }, dispatch] = useStateValue();
  
  const setDisplay = (display: string) => {
      dispatch({ type: 'CART_DISPLAY', display: display });
      dispatch({ type: 'SET_WIDTH', width: '100vw' });
  }

  const getBasketTotal = (): number => {
    return basket?.reduce((amount: number, item: cartItems) => (item.price * item.quantity) + amount, 0);
  }
  
  /** Increment a product in cart by 1 */
  const incrementCart = (id: number) => {
    const index = basket.findIndex((basket: cartItems) => basket.id === id);
    const newBasket = [...basket];
    if(index > -1){
       newBasket[index].quantity++;
       dispatch({ type: 'INCREMENT_ITEM', basket: newBasket });
    }
  }
  
  // Deletes a product or decrements aproduct by 1
  const reduceCart = (id: number) => {
    const index = basket.findIndex((basket: cartItems) => basket.id === id);
    const newBasket = [...basket];
    
    if(index > -1){
      if(newBasket[index].quantity <= 1) {
          dispatch({ type: 'REMOVE_FROM_CART', id: id });
      }else{
          newBasket[index].quantity--;
          dispatch({ type: 'DECREMENT_ITEM', basket: newBasket });
      }
    }
  }

  // Get the total number of items in the cart
  const countCart = (): number => {
    return basket?.reduce((count: number, item: cartItems) =>  item.quantity + count, 0)
  }

  return (
    <div className={`cart bdg_dark cart_sidebar`} style={{display: cartDisplay}}>
      <div className='cart_title p_2 flex d_row'>
          <div className='w_100p pt_1 pb_1 tx_center' style={{borderRadius:'25px', border: '1px solid silver'}}>Your cart items: ({ countCart() }) </div>
          <div className='flex d_row flex_end'>
            <ClearIcon className='pointer' style={{position: 'relative',top:'10px', left:'7px'}} onClick={() => setDisplay('none')}/>
          </div>
      </div>
      <div className='w_100p cart_body'>
        {
          basket?.map((item: cartItems) => (
            <div className='cart_item centered mt_2'>
              <div className='p_1'>
              <div className='item_details w_100p flex d_row p_1'>
                {/** Strip potential problematic characters from alt attribute */}
                <img className='cart_image' src={item.image_url} alt={item.title.replace(/"|'|`/g, '')}/>
                <div className='item_priceAndDescription'>
                  <div className='pt_1 pb_1 text_left pl_2 tx_12'>{ item.title }</div>
                  <div className='pt_1 pb_1 text_left pl_2'>Price: {item.currency} { `${item.price * item.quantity}`.match(/\./) ? `${item.price * item.quantity}` : `${item.price * item.quantity}.00` }</div>
                </div>
              </div>
              <div className='item_buttons flex d_row p_1 pt_2'>
                <div style={{paddingTop: '7px', width: '70px'}}>QTY: { item.quantity }</div>
                <div className='flex d_row btn_div'>
                <div className='plus_btn ml_2 tx_center' onClick={() => incrementCart(item.id)}>
                    <AddIcon />
                </div>
                <div className='minus_btn tx_center' onClick={() => reduceCart(item.id)}>
                  <RemoveIcon />
                </div>
                </div>
              </div>
              </div>
            </div>
          ))
        }
      </div>
      <div className='cart_footer p_1 border'>
        <div className='cart_titl_bt p_1'>TOTAL AMOUNT: &nbsp;&nbsp; { basket[0]?.currency || '' } { `${ getBasketTotal() }`.match(/\./) ? getBasketTotal() : `${ getBasketTotal() }.00`  }</div>
      </div>
    </div>
  )
}

export default Cart;