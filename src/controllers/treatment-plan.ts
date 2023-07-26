import { Request, Response } from 'express'
import { MongoDataSource } from '../data-source'
import TreatmentPlan from '../entities/treatment-plan'

export const getTratamientPlan = async (req: Request, res: Response) => {
  const { id } = req.params

  const treatmentPlan = await MongoDataSource.getRepository(
    TreatmentPlan
  ).find()

  res.json({
    success: true,
    data: treatmentPlan,
    id,
  })
}

export const getTratamientPlans = async (req: Request, res: Response) => {
  const treatmentPlans = await MongoDataSource.getRepository(
    TreatmentPlan
  ).find()

  res.json({
    success: true,
    data: treatmentPlans,
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
    data: results,
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
