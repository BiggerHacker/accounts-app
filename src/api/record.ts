import axios from 'axios'
import { api } from './api'

import { IRecordFormState } from '../components/RecordForm'

export const getRecords = () => 
  axios.get(`${api}/records`)

export const createRecord = (body: IRecordFormState) => 
  axios.post(`${api}/records`, body)

export const updateRecord = (id: string, body: IRecordFormState) => 
  axios.put(`${api}/records/${id}`, body)
