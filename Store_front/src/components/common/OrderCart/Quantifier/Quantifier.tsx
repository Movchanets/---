import { FunctionComponent, useState } from 'react'

import classes from './quantifier.module.scss'
import { Button, TextField } from '@mui/material';

import { IDetail } from '../../../../store/orders/types';

export type Operation = 'decrease' | 'increase';

interface Props {
  removeProductCallback: (productId: number) => void
  handleUpdateQuantity: (productId: number, operation: Operation) => void
  detail: IDetail
}


export const Quantifier: FunctionComponent<Props> = ({ removeProductCallback, handleUpdateQuantity, detail }) => {
  const [value, setValue] = useState<number>(detail.quantity)
    const removeProduct = () => {
        removeProductCallback(detail.product.id);
    }
  const reduce = ():void => {
    handleUpdateQuantity(detail.product.id, 'decrease')

    setValue(prevState => {
      const updatedValue = prevState - 1
      
      return updatedValue
    })
  }

  const increase = ():void => {
    if(value < detail.product.quantity){
    handleUpdateQuantity(detail.product.id, 'increase')
    setValue(prevState => prevState + 1)
  }
  }

  return (
    <div className={classes.quantifier}>
      <input type="button" value="-" className={classes.buttonMinus} onClick={reduce} />
    
      <input type="number"
             step="1"
             max=""
             value={value  }
             onChange={e => setValue(parseInt(e.target.value))}
             className={classes.quantityField} />
      <input type="button" value="+" className={classes.buttonPlus} onClick={increase} />
      <Button   onClick={removeProduct} >Remove</Button>
      <h5>{value !=0 ? value > 0 ? "Зі складу:": "На склад" :""}</h5>

    </div>
  )
}