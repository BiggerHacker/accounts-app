import * as React from 'react'
import { getRecords } from '../api/record'

import Record from './Record'

export interface IRecord {
  id: string;
  date: string;
  title: string;
  amount: number;
}

interface IRecordState {
  errMessage: string;
  isLoading: boolean;
  records: IRecord[];
}

class Records extends React.Component<{}, IRecordState> {
  constructor (props: {}) {
    super(props)
    this.state = {
      errMessage: '',
      isLoading: true,
      records: []
    }
  }

  componentDidMount () {
    getRecords()
         .then((res: {data: IRecord[]}) => {
           this.setState({
             records: res.data,
             isLoading: false
           })
         })
         .catch((err: {message: string}) => {
           this.setState({
             errMessage: err.message,
             isLoading: false
           })
         })
  }

  render () {
    const { records, errMessage, isLoading } = this.state
    
    let recordItem = null;
    recordItem = records.map(item => {
      return <Record {...item} key={item.date} />
    })

    if (errMessage) {
      return <div>{errMessage}</div>
    } else if (isLoading) {
      return <div>loading</div>
    } else {
      return (
        <div>
          <h2>records</h2>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Date</th>
                <th>Title</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {recordItem}
            </tbody>
          </table>
        </div>
      )
    }
  }
}

export default Records