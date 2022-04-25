import React, { FC, } from 'react';
import { gql, useQuery } from '@apollo/client';
import SingleProduct from './SingleProduct';
import { Skeleton } from '@mui/material';
import Cart from './Cart';
import { useStateValue } from '../utils/StateProvider';
import { cartItems } from '../utils/interface';


const PRODUCTS = gql`
    query GetProducts ($currency: Currency) {
        currency
        products {
            id
            title
            image_url
            price (currency: $currency)
        }
    }
`;

const Products: FC = () => {
    
    // Set initial base currency
    const [activeCurrency, setCurrency] = React.useState('USD');
  
    const { loading, error, data } = useQuery(PRODUCTS, { variables: { currency: activeCurrency } });

    // eslint-disable-next-line
    const [{ basket, width, cartDisplay, }, dispatch] = useStateValue();

    React.useEffect(() => {
        if(basket.some((item: cartItems) => item.currency !== activeCurrency)){
          
            // If they have some items in the array and selected a different currency
            // Remove all cart items with previous currency, only keep cart items which currency 
            // matches the latest currency choice
            
            const newBasket = basket.filter((item: cartItems) => item.currency === activeCurrency);
            dispatch({ type: 'DECREMENT_ITEM', basket: newBasket });
        }
    }, [activeCurrency, basket, dispatch]);

    return (
      <div style={{width: width}}>
        {
          loading ? 
          <div className='products_grid row_gap'>
            { Array.from( new Array(12)).map((_) => 
              <div className='centered' style={{marginTop: '70px'}}>
                <Skeleton variant="rectangular" width={200} height={200} />
              </div>
              ) 
            }
          </div> :
            error ? <div>{`Oops an error occured ${error.message} `}</div> :
              <div className='w_100p'>
                <div className='products_top p_2 flex d_row'>
                  <div className='flex d_row gap flex_baseline'>
                    <div className='p_1'>
                      <div className='page_title_text1 thin_text text_left'>All Products</div>
                      <div className='page_title_text2 thin_text text_left'>A 360 look at Lumin</div>
                    </div>
                    <div className='pl_2'>
                    <select 
                      style={{width: '130px', height: '30px', border: '1px solid gray'}} 
                      defaultValue={activeCurrency} 
                      onChange={(e) => setCurrency(e.target.value)}>
                        { data?.currency.map((item: any) => 
                          <option value={item} onClick={() => setCurrency(item)}>Currency &nbsp; {item}</option>)
                        }
                    </select>
                    </div>
                  </div>
                <div>
              </div>
            </div>
            <div className='products_grid'>
            { data?.products.map((item: { id: number, title: string, image_url: string, price: number, }) =>
              <SingleProduct id={item.id}
                title={item.title}
                image_url={item.image_url}
                price={item.price}
                currency={ activeCurrency }
              />)
            }
            </div>
          </div>
        }
        <Cart />
        {/** Handles the blur effect whenever the cart side nav shows */}
        <div className='backdrop' style={{display: cartDisplay}}></div>
      </div>
    )
}


export default Products;


