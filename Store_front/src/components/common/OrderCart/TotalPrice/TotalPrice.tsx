import { FunctionComponent } from 'react'


import classes from './total-price.module.scss'

interface Props {
  amount: number
}

  
  export const CurrencyFormatter: FunctionComponent<Props> = ({ amount }) => {
    const formattedAmount = amount.toLocaleString('en-GB', {
      style: 'currency',
      currency: 'UAH'
    })
  
    return <span className={classes.currency}>{formattedAmount}</span>
  }
export const TotalPrice: FunctionComponent<Props> = ({ amount }) => {
return <div className={classes.totalPrice}>Total: {<CurrencyFormatter amount={amount} />}</div>
}