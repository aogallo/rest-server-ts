import { Router } from 'express'

import { authToken } from '@src/middlewares/auth'
import { createCustomer } from '@controllers/Customer/createCustomer'
import { getCustomer, getCustomers } from '@controllers/Customer/readCustomer'
import { deleteCustomer } from '@controllers/Customer/deleteCustomer'
import { updateCustomer } from '@controllers/Customer/updateCustomer'

const customerRouter = Router()

customerRouter.get('/:id', getCustomer)
customerRouter.get('/', getCustomers)
customerRouter.post('/', authToken, createCustomer)
customerRouter.put('/:id', updateCustomer)
customerRouter.delete('/:id', deleteCustomer)

export default customerRouter
