import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    cartItems: [],
}

// value: [
//     {_id, name, price, quantity:1},
//     {_id, name, price, quantity:2},
//     {_id, name, price, quantity:3},
// ]

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setReduxcart: (state, action) => {
            // console.log(action);
            state.cartItems = action.payload    // state.value to be replaced by action.payload
        },
        addToReduxCart: (state, action) => {
            let product = action.payload    // state.value to be replaced by action.payload
            let oldItems = [...state.cartItems]
            let { _id, name, price } = product

            /* if already exists .. add to the quantity else create new cart-Item */

            let matched = oldItems.find(el => el._id == _id) // {_id, name, quantity} // undefined

            if (matched) {
                oldItems = oldItems.map(el => {
                    if(el._id === _id){
                        return {...el, quantity: el.quantity + 1}
                    }
                    return el
                })
            } else {
                oldItems.push({ _id, name, price, quantity: 1 })
            }
            state.cartItems = oldItems
        },
        decrement: (state, action) => {
            let _id = action.payload
            let oldItems = [...state.cartItems]

        }
    },
})

// Action creators are generated for each case reducer function
export const { setReduxcart, addToReduxCart } = cartSlice.actions

export default cartSlice.reducer