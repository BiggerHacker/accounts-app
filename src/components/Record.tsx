import * as React from 'react'
import PropTypes from 'prop-types'

import { IRecord } from './Records'

interface IRecordState {
  isEdit: boolean
}

class Record extends React.Component<IRecord, IRecordState> {
  static propTypes = {
    id: PropTypes.string.isRequired,
    date: PropTypes.string,
    title: PropTypes.string,
    amount: PropTypes.number
  }

  constructor (props: IRecord) {
    super(props)
    this.state = {
      isEdit: false
    }
  }

  handleToggle = () => {
    this.setState({
      isEdit: !this.state.isEdit
    })
  }

  renderRow = () => {
    const { date, title, amount } = this.props
    return (
      <tr>
        <td>{date}</td>
        <td>{title}</td>
        <td>{amount}</td>
        <td>
          <button className="btn btn-info mr-1" onClick={this.handleToggle}>Edit</button>
          <button className="btn btn-danger">Delete</button>
        </td>
      </tr>
    )
  }

  renderForm = () => {
    const { date, title, amount } = this.props
    return (
      <tr>
        <td>
          <input className="form-control" type="text" defaultValue={date} />
        </td>
        <td>
          <input className="form-control" type="text" defaultValue={title} />
        </td>
        <td>
          <input className="form-control" type="text" defaultValue={String(amount)} />
        </td>
        <td>
          <button className="btn btn-info mr-1">Update</button>
          <button className="btn btn-danger" onClick={this.handleToggle}>Cancle</button>
        </td>
      </tr>
    )
  }

  render () {
    const { isEdit } = this.state
    if (isEdit) {
      return this.renderForm()
    } else {
      return this.renderRow()
    }
  }
}

export default Record
