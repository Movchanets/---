import { useNavigate } from "react-router-dom"
import classes from './index.module.scss'
import { useTypedSelector } from "../../../hooks/useTypedSelector"
import shoppingCart from '../../../assets/shopping-cart.svg'
export const CartCounter = () => {
    const navigate = useNavigate()
    const {cart} = useTypedSelector((store) => store.order.cart)
    const navigateToCart = () => {
      navigate('/cart')
    }
  
    return (
      <button className={classes.contain} onClick={navigateToCart}>
        <span className={classes.productsCount}>{cart.details.length}</span>
        <img src={shoppingCart} className={classes.shoppingCart} alt="Go to Cart" />
      </button>
    )
  }