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
    const [{ basket, width, cartDisplay,}, dispatch] = useStateValue();
    const [displayData, setDisplayData] = React.useState({currency:[],products:[]});
    const [prevCurrency, setPrevCurrency] = React.useState(['USD', 'USD']);
    const { loading, error, data, previousData } = useQuery(PRODUCTS, { variables: { currency: activeCurrency } });

    React.useEffect(() => {
        if(data === undefined) {
          
          setDisplayData(previousData);
          
          setPrevCurrency(() => {
            
            // In case the clicked the bad guy multiple times, prevCurrency 
            // will only change once
            if(prevCurrency[prevCurrency.length-1] === activeCurrency){
               return [...prevCurrency];
            }

            return [prevCurrency[prevCurrency.length-1], activeCurrency,];
          });

          console.log(prevCurrency)
        }else{
         
          setDisplayData(data);

          setPrevCurrency([prevCurrency[prevCurrency.length-1], activeCurrency]);
        }
        
        if(basket.some((item: cartItems) => item.currency !== activeCurrency)){
          
            // If they have some items in the array and selected a different currency
            // Remove all cart items with previous currency, only keep cart items which currency 
            // matches the latest currency choice
            
            const newBasket = basket.filter((item: cartItems) => item.currency === (error ? prevCurrency[0] : activeCurrency));
            dispatch({ type: 'DECREMENT_ITEM', basket: newBasket });
        }
       
    }, [activeCurrency, prevCurrency, previousData, basket, dispatch, error, data]);
    
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
            
            (
           
            <div className='w_100p'>
                  <div className='products_top p_2'>
                    <div className='flex d_row gap flex_baseline'>
                      {/** hide some these text whenever the cart is showing */}
                      <div className={`p_1 ${ cartDisplay === 'block' ? ' under_cart ' : ' ' }`}>
                        <div className='page_title_text1 thin_text text_left'>All Products</div>
                        <div className='page_title_text2 thin_text text_left'>A 360 look at Lumin</div>
                      </div>
                      <div className='pl_2'>
                      <select 
                        style={{width: '130px', height: '30px', border: '1px solid gray'}} 
                        defaultValue={  error ? prevCurrency[0] : activeCurrency } 
                        onChange={(e) => setCurrency(e.target.value)}>
                          { 
                            displayData?.currency.map((item: any) => <option value={item} onClick={() => 
                              setCurrency(item)}>Currency &nbsp; { item }</option>)
                          }
                      </select>
                      </div>
                    </div>
                  <div>
                </div>
                {/** Show custom error message whenever there is an error and display previous data instead */}
                {error ? <div className='p_l w_100p'>We couldn't display products related to {activeCurrency}, we're showing you {prevCurrency[0]}</div>:''}
              </div>
              
              <div className='products_grid'>

              {displayData?.products.map((item: { id: number, title: string, image_url: string, price: number, }) =>
                <SingleProduct id={item.id}
                  title={item.title}
                  image_url={item.image_url}
                  price={item.price}
                  currency={ error ? prevCurrency[0] : activeCurrency }
                />)
              }
              </div>
            </div>
             
            ) 
            
            }
          <Cart />
        </div>
      )
    }


export default Products;


