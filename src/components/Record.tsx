import * as React from 'react'
import PropTypes from 'prop-types'

import { IRecord } from './Records'
import { updateRecord } from '../api/record'

interface IRecordState {
  isEdit: boolean
}

class Record extends React.Component<IRecord, IRecordState> {
  static propTypes = {
    id: PropTypes.string.isRequired,
    date: PropTypes.string,
    title: PropTypes.string,
    amount: PropTypes.number,
    handleUpdate: PropTypes.func
  }

  private recordDateVal: HTMLInputElement
  private recordTitleVal: HTMLInputElement
  private recordAmountVal: HTMLInputElement

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

  update = () => {
    const { id, date, amount, title, handleUpdate } = this.props
    const data = {
      date: this.recordDateVal.value,
      title: this.recordTitleVal.value,
      amount: Number(this.recordAmountVal.value)
    }
    const record = {
      id,
      date,
      title,
      amount
    }
    updateRecord(id, data).then((res: {data: IRecord}) => {
      if (handleUpdate) {
        handleUpdate(record, res.data)
      }
      this.setState({
        isEdit: false
      })
    }).catch((err: {message: string}) => {
      console.log(err.message)
    })
  }

  renderRow = () => {
    const { date, title, amount } = this.props
    const { handleToggle } = this
    return (
      <tr>
        <td>{date}</td>
        <td>{title}</td>
        <td>{amount}</td>
        <td>
          <button className="btn btn-info mr-1" onClick={handleToggle}>Edit</button>
          <button className="btn btn-danger">Delete</button>
        </td>
      </tr>
    )
  }

  renderForm = () => {
    const { date, title, amount } = this.props
    const { update, handleToggle } = this
    return (
      <tr>
        <td>
          <input 
            className="form-control" 
            type="text" 
            defaultValue={date}
            ref={(rv: HTMLInputElement) => this.recordDateVal = rv}
          />
        </td>
        <td>
          <input 
            className="form-control" 
            type="text" 
            defaultValue={title}
            ref={(rv: HTMLInputElement) => this.recordTitleVal = rv}
          />
        </td>
        <td>
          <input 
            className="form-control" 
            type="text" 
            defaultValue={String(amount)} 
            ref={(rv: HTMLInputElement) => this.recordAmountVal = rv}
          />
        </td>
        <td>
          <button className="btn btn-info mr-1" onClick={update}>Update</button>
          <button className="btn btn-danger" onClick={handleToggle}>Cancle</button>
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
