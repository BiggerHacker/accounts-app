import axios from 'axios'
import { api } from './api'

import { IRecordFormState } from '../components/RecordForm'

export const getRecords = () => axios.get(`${api}/records`)

export const createRecord = (body: IRecordFormState) => axios.post(`${api}/records`, body)
