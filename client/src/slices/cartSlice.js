import { createSlice } from '@reduxjs/toolkit'
import { updateCart } from '../utils/cartUtils'

const initialState = localStorage.getItem('cart')
  ? JSON.parse(localStorage.getItem('cart'))
  : { cartItems: [], shippingAddress: {}, paymentMethod: '' }

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload

      const existItem = state.cartItems.find((x) => x._id === item._id)

      if (existItem) {
        state.cartItems = state.cartItems.map((x) =>
          x._id === existItem._id ? item : x
        )
      } else {
        state.cartItems = [...state.cartItems, item]
      }

      return updateCart(state)
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item._id !== action.payload
      )
      return updateCart(state)
    },
    saveShipphingAddress: (state, action) => {
      state.shippingAddress = action.payload
      localStorage.setItem('cart', JSON.stringify(state))
    },
    savePaymentMethod: (state, action) => {
      state.paymentMethod = action.payload
      localStorage.setItem('cart', JSON.stringify(state))
    },
    clearCart: (state) => {
      state.cartItems = []
      localStorage.setItem('cart', JSON.stringify(state))
    },
    clearShippingAddress: (state) => {
      state.shippingAddress = {}
      localStorage.setItem('cart', JSON.stringify(state) )
    }
  },
})

export const {
  addToCart,
  removeFromCart,
  saveShipphingAddress,
  savePaymentMethod,
  clearCart,
  clearShippingAddress,
} = cartSlice.actions
export default cartSlice.reducer
