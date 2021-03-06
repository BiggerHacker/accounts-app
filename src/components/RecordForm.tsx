import * as React from 'react'
import { ChangeEvent, FormEvent } from 'react'
import PropTypes from 'prop-types'

import { IRecord } from './Records'
import { createRecord } from '../api/record'

export interface IRecordFormState {
  date: string;
  title: string;
  amount: number | string;
}

interface IRecordFormProp {
  onHandleCreate: (record: IRecord) => void
}

class RecordForm extends React.Component<IRecordFormProp, IRecordFormState> {
  static propTypes = {
    onHandleCreate: PropTypes.func
  }

  constructor (props: IRecordFormProp) {
    super(props)
    this.state = {
      date: '',
      title: '',
      amount: ''
    }
  }

  restoreState = () => {
    this.setState({
      date: '',
      title: '',
      amount: ''
    })
  }

  handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target
    const obj = {}
    this.setState((
      obj['' + name] = value,
      obj
    ))
  }

  handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const {date, title, amount} = this.state
    const data = {
      date,
      title,
      amount: Number(amount)
    }
    this.restoreState()
    createRecord(data).then((res: {data: IRecord}) => {
      this.props.onHandleCreate(res.data)
    }).catch((err: {}) => {
      console.log(err)
    })
  }

  voild = () => {
    const { date, title, amount } = this.state
    return date && title && amount
  }

  render () {
    const {date, title, amount} = this.state
    const { handleChange } = this
    return (
      <form className="form-inline mb-3" onSubmit={this.handleSubmit}>
        <div className="form-group">
          <input 
            className="form-control mr-3" 
            onChange={handleChange}
            type="text" 
            value={date}
            placeholder="Date" 
            name="date" 
          />
        </div>
        <div className="form-group mr-3">
          <input 
            className="form-control" 
            onChange={handleChange}
            type="text" 
            value={title}
            placeholder="Title" 
            name="title" 
          />
        </div>
        <div className="form-group mr-3">
          <input 
            className="form-control" 
            onChange={handleChange}
            type="text" 
            value={amount}
            placeholder="Amount" 
            name="amount" 
          />
        </div>
        <button className="btn btn-primary" type="submit" disabled={!this.voild()}>create</button>
      </form>
    )
  }
}

export default RecordForm
