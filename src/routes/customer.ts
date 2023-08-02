import { Router } from 'express'

import {
  getCustomer,
  getCustomers,
  postCustomer,
  putCustomer,
} from '@controllers/customer'

const customerRouter = Router()

customerRouter.get('/:id', getCustomer)
customerRouter.get('/', getCustomers)
customerRouter.post('/', postCustomer)
customerRouter.put('/:id', putCustomer)

export default customerRouter
