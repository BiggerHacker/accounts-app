import * as React from 'react'

interface IAmountColProp {
  text: string;
  type: string;
}

const AmountCol = (props: IAmountColProp) => {
  const { text, type } = props
  return (
    <div className="card">
      <div className={`card-header bg-${type} text-white`}>
        {text}
      </div>
      <div className="card-body">b</div>
    </div>
  )
}

export default AmountCol
