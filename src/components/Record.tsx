import * as React from 'react'
import { IRecord } from './Records'

class Record extends React.Component<IRecord, {}> {
  render () {
    const { date, title, amount } = this.props
    return (
      <tr>
        <td>{date}</td>
        <td>{title}</td>
        <td>{amount}</td>
      </tr>
    )
  }
}

export default Record
