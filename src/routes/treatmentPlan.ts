import { Router } from 'express'

import { createTratamientPlan } from '@controllers/TreatmentPlan/createTreatment'
import { deleteTratamientPlan } from '@controllers/TreatmentPlan/deleteTreatmentPlan'
import {
  getTratamientPlan,
  getTratamientPlans,
} from '@controllers/TreatmentPlan/readTreatmentPlan'
import { updateTratamientPlan } from '@controllers/TreatmentPlan/updateTreatmentPlan'

const tratamientPlanRouter = Router()

tratamientPlanRouter.post('', createTratamientPlan)
tratamientPlanRouter.get('/', getTratamientPlans)
tratamientPlanRouter.get('/:id', getTratamientPlan)
tratamientPlanRouter.put('/:id', updateTratamientPlan)
tratamientPlanRouter.delete('/:id', deleteTratamientPlan)

export default tratamientPlanRouter
