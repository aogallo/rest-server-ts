import { Request, Response } from 'express'
import { MongoDataSource } from '../data-source'
import TreatmentPlan from '../entities/treatment-plan'

export const getTratamientPlan = (req: Request, res: Response) => {
  const { id } = req.params

  res.json({
    msg: 'tratamientos',
    id,
  })
}

export const getTratamientPlans = (req: Request, res: Response) => {
  res.json({
    msg: 'todos los tratamientos',
  })
}

export const postTratamientPlan = async (req: Request, res: Response) => {
  const body = req.body

  const treatmentPlan = await MongoDataSource.getRepository(
    TreatmentPlan
  ).create(body)
  const results = await MongoDataSource.getRepository(TreatmentPlan).save(
    treatmentPlan
  )

  res.json({
    msg: 'crear tratamient',
    results,
  })
}

export const putTratamientPlan = (req: Request, res: Response) => {
  const { id } = req.params
  const body = req.body

  res.json({
    msg: 'actualizar tratamiento',
    id,
    body,
  })
}

export const deleteTratamientPlan = (req: Request, res: Response) => {
  const { id } = req.params

  res.json({
    msg: 'eliminar tratamiento',
    id,
  })
}
