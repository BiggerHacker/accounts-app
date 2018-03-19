import * as React from 'react'
import { getRecords } from '../api/record'

import Record from './Record'
import RecordForm from './RecordForm'

export interface IRecord {
  id: string;
  date: string;
  title: string;
  amount: number;
  handleUpdate?: (oldRecord: IRecord, newRecord: IRecord) => void;
  handleDelete?: (record: IRecord) => void;
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

  handleUpdate = (oldRecord: IRecord, newRecord: IRecord) => {
    const { records } = this.state
    const recordIndex: number[] = records.map((item: IRecord, index: number) => {
      if (item.id === oldRecord.id) {
        return index
      }
      return -1
    })
    const updateRecords: IRecord[] = records.map((item: IRecord, index: number): IRecord => {
      if (index !== recordIndex[index]) {
        return item
      }
      return {
        ...item,
        ...newRecord
      }
    })
    this.setState({
      records: updateRecords
    })
  }

  handleDelete = (record: IRecord) => {
    const { records } = this.state
    const newRecords: IRecord[] = records.filter((item: IRecord) => {
      return item.id !== record.id
    })
    this.setState({
      records: newRecords
    })
  }

  render () {
    const { records, errMessage, isLoading } = this.state

    const { handleCreate, handleUpdate, handleDelete } = this

    let recordsComponent = null;
    
    let recordItem = null;
    recordItem = records.map(item => {
      return <Record {...item} key={item.date} handleUpdate={handleUpdate} handleDelete={handleDelete} />
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