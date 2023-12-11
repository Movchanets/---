import { FunctionComponent, useEffect } from 'react'




import { TotalPrice } from './TotalPrice/TotalPrice'
import { Operation } from './Quantifier/Quantifier'
import classes from './cart.module.scss'
import { useLocation, useNavigate } from 'react-router-dom'
import { useTypedSelector } from '../../../hooks/useTypedSelector'
import { useActions } from '../../../hooks/useActions'
import { Quantifier } from './Quantifier/Quantifier'
import { APP_ENV } from '../../../env'
import photo from "../../../assets/placeholder_image.jpg";
import { Button } from 'react-bootstrap'
import { ICartItem } from '../../../store/orders/types'


export const Cart: FunctionComponent = () => {
  const {cart} = useTypedSelector((store) => store.order.cart);
    const {user} = useTypedSelector((store) => store.login);
  const location = useLocation();
    const {RemoveFromCart, IncreaseQuantity, DecreaseQuantity, ClearCart, CreateOrder} = useActions();
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location])

  const handleRemoveProduct = (productId: number): void => {
    RemoveFromCart(productId);
  }
const navigate = useNavigate();
  const handleUpdateQuantity = (productId: number, operation: Operation) => {
    if (operation === 'decrease') {
      DecreaseQuantity(productId);
      
    }
    else
   IncreaseQuantity(productId);
  }

const  MakeOrder = () => {
   
    const finalDetails = cart.details.filter((item) => item.quantity != 0);
    const finalCart : ICartItem = { email: user?.email  , details: finalDetails };
    console.log("MakeOrder " , finalCart );
    CreateOrder(finalCart);
    ClearCart();
    navigate("/settings/orders");
}

  const getProducts = () => Object.values(cart.details || {})

  const totalPrice = getProducts().reduce((accumulator, detail) => accumulator + (detail.product.price * detail.quantity), 0)

  return (
    <section className={classes.cart}>
      <h1>Order Cart</h1>
    <div className={classes.container}>
        {getProducts().length === 0 ? 
            <>
            <p>Your cart is empty.</p>
            <Button onClick={()=>navigate("/")} className='btn btn-danger' >Go to products</Button>
            </>
         : (<>
            {getProducts().map((detail) => (
                <div className={classes.product} key={detail.ProductId}>
                    <img
                        src={
                            detail.product.images.length > 0
                                ? APP_ENV.REMOTE_HOST_IMAGE_URL + detail.product.images[0].name
                                : photo
                        }
                        alt={detail.product.name}
                    />
                    <h3>{detail.product.name}</h3>
                    <Quantifier
                        removeProductCallback={() => handleRemoveProduct(detail.ProductId)}
                        detail={detail}
                        handleUpdateQuantity={handleUpdateQuantity}
                    />
                </div>
            ))}
          {totalPrice !=0 ?   <Button onClick={()=>MakeOrder()} className='btn btn-success' >Confirm order</Button> : ""}
        </>
        )}

    </div>
    <TotalPrice amount={totalPrice} />
    </section>
    )
    
     
}