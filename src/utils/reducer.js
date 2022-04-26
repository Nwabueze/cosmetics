export const initialState = {
    basket: [],
    cartDisplay: 'none',
    currency: 'USD',
    width: '100vw',
    productsData: { currency: [], products: [], },
};


export const getBasketTotal = (basket) => {
    return basket?.reduce((amount, item) => (item.price * item.quantity) + amount, 0);
}

const reducer = (state, action) => {
    switch(action.type){
        case 'ADD_TO_CART':
            
            return {
                ...state,
                basket: [ ...state.basket, action.item ],
            }
            
        case 'REMOVE_FROM_CART':
            
            const index = state.basket.findIndex(basketItem => basketItem.id === action.id);

            let newBasket = [...state.basket];

            if(index >= 0) {
                newBasket.splice(index, 1);
            } else {
                console.warn(`This item is not in basket`);
            }
                
            return { ...state, basket: newBasket } 
        
        case 'INCREMENT_ITEM': 
            return { ...state, basket: action.basket }
        
        case 'DECREMENT_ITEM': 
            return { ...state, basket: action.basket }
         
        case 'CART_DISPLAY':
            return { ...state, cartDisplay: action.display, }

        case 'SET_WIDTH':
            return { ...state, width: action.width, }
        
        case 'SET_CURRENCY':
            return { ...state, currency: action.currency, }

        case 'PRODUCTS_DATA':
            return { ...state, productsData: action.data, }

        default: 
            return state;
        
//PRODUCTS_DATA
    }
};

export default reducer;