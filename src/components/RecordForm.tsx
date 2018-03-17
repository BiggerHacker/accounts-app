import * as React from 'react'
import { ChangeEvent } from 'react'

interface IRecordFormState {
  date: string;
  title: string;
  amount: number | string;
}

class RecordForm extends React.Component<{}, IRecordFormState> {
  constructor (props: {}) {
    super(props)
    this.state = {
      date: '',
      title: '',
      amount: ''
    }
  }

  handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target
    const obj = {}
    this.setState((
      obj['' + name] = value,
      obj
    ))
  }

  voild = () => {
    const { date, title, amount } = this.state
    return date && title && amount
  }

  render () {
    return (
      <form className="form-inline">
        <div className="form-group">
          <input 
            className="form-control" 
            onChange={this.handleChange}
            type="text" 
            placeholder="Date" 
            name="date" 
          />
        </div>
        <div className="form-group">
          <input 
            className="form-control" 
            onChange={this.handleChange}
            type="text" 
            placeholder="Title" 
            name="title" 
          />
        </div>
        <div className="form-group">
          <input 
            className="form-control" 
            onChange={this.handleChange}
            type="text" 
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
