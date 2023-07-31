import { Router } from 'express'

import { getCustomer, getCustomers, postCustomer } from '@controllers/customer'

const customerRouter = Router()

customerRouter.get('/:id', getCustomer)
customerRouter.get('/', getCustomers)
customerRouter.post('/', postCustomer)

export default customerRouter
