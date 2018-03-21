import * as React from 'react'

interface IAmountColProp {
  text: string;
  type: string;
  amount: () => number;
}

const AmountCard = (props: IAmountColProp) => {
  const { text, type, amount } = props
  return (
    <div className="card">
      <div className={`card-header bg-${type} text-white`}>
        {text}
      </div>
      <div className="card-body">
        {amount()}
      </div>
    </div>
  )
}

export default AmountCard
