import React, { FC, } from 'react';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useStateValue } from '../utils/StateProvider';
import { cartItems } from '../utils/interface';


const Header: FC = () => {

    const [{ basket, width, cartDisplay }, dispatch] = useStateValue();

    const setDisplay = (display: string) => {

        // Makes the cart and the backdrop to hide or show
        dispatch({ type: 'CART_DISPLAY', display: display });

        // Sets the width of the products main window
        // This makes the window to shrink for cart navbar
        dispatch({ type: 'SET_WIDTH', width: 'calc(100vw - 350px)' });
    }

    const countCart = (): number => {
        return basket?.reduce((count: number, item: cartItems) =>  item.quantity + count, 0)
    }

    return (
        <div className='header_nav bg_white' style={{width: width}}>
            <div className='nav flex d_row'>
                <div className='logo c_darker flex pl_1 pr_1 d_row'>
                    <span>L</span>
                    <span>U</span>
                    <span>M</span>
                    <span>I</span>
                    <span>N</span>
                </div>
                {/** nav options below .under_cart will hide if the width is snall and the cart is showing */}
                <div className={`nav_options flex d_row ${cartDisplay === 'block' ? ' under_cart ': ' '}`}>
                    <div className={`nav_option_div w_50 flex d_row flex_start nav_option_n1`}>
                        <div className='nav_option'>Shop</div>
                        <div className='nav_option'>Learn</div>
                    </div>
                    <div className='nav_option_div flex d_row flex_end nav_option_n2'>
                        <div className='nav_option'>Account</div>
                      <div className='nav_option'>
                        <span className='pointer' onClick={() => setDisplay('block')}>
                        <ShoppingCartIcon />
                        <span className='cart_counter'>{ countCart() }</span>
                        </span>
                      </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header;