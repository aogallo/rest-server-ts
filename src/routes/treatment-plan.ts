import { Router } from 'express'

import {
  deleteTratamientPlan,
  getTratamientPlan,
  getTratamientPlans,
  postTratamientPlan,
  putTratamientPlan,
} from '@controllers/treatment-plan'

const tratamientPlanRouter = Router()

tratamientPlanRouter.get('/', getTratamientPlans)
tratamientPlanRouter.get('/:id', getTratamientPlan)
tratamientPlanRouter.post('', postTratamientPlan)
tratamientPlanRouter.put('/:id', putTratamientPlan)
tratamientPlanRouter.delete('/:id', deleteTratamientPlan)

export default tratamientPlanRouter
