import axios from 'axios'
import { api } from './api'

export const getRecords = () => axios.get(`${api}/records`)
