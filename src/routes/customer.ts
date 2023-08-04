import { Router } from 'express'

import {
  deleteCustomer,
  getCustomer,
  getCustomers,
  postCustomer,
  putCustomer,
} from '@controllers/customer'
import { authToken } from '@src/middlewares/auth'

const customerRouter = Router()

customerRouter.get('/:id', getCustomer)
customerRouter.get('/', authToken, getCustomers)
customerRouter.post('/', postCustomer)
customerRouter.put('/:id', putCustomer)
customerRouter.delete('/:id', deleteCustomer)

export default customerRouter
