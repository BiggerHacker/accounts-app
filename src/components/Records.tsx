import * as React from 'react'
import { getRecords } from '../api/record'

import Record from './Record'
import RecordForm from './RecordForm'

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
    getRecords().then((res: {data: IRecord[]}) => {
      this.setState({
        records: res.data,
        isLoading: false
      })
    }).catch((err: {message: string}) => {
      this.setState({
        errMessage: err.message,
        isLoading: false
      })
    })
  }

  handleCreate = (record: IRecord) => {
    this.setState({
      isLoading: false,
      records: [
        ...this.state.records,
        record
      ]
    })
  }

  render () {
    const { records, errMessage, isLoading } = this.state

    const { handleCreate } = this

    let recordsComponent = null;
    
    let recordItem = null;
    recordItem = records.map(item => {
      return <Record {...item} key={item.date} />
    })

    if (errMessage) {
      recordsComponent = <div>{errMessage}</div>
    } else if (isLoading) {
      recordsComponent = <div>loading</div>
    } else {
      recordsComponent = (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Date</th>
              <th>Title</th>
              <th>Amount</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {recordItem}
          </tbody>
        </table>
      )
    }

    return (
      <div className="records">
        <h2>records</h2>
        <RecordForm onHandleCreate={handleCreate} />
        {recordsComponent}
      </div>
    )
  }
}

export default Records