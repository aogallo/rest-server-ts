import { Request, Response } from 'express'

import { TreatmentPlan, TreatmentPlanModel } from '@schemas/treatment-plan'

export const getTratamientPlan = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const treatmentPlan = await TreatmentPlanModel.findById(id)

    if (treatmentPlan == null) {
      return res.status(404).json({
        success: false,
        message: 'No exite el plan de tratamiento',
      })
    }

    res.json({
      success: true,
      data: treatmentPlan,
    })
  } catch (error) {
    if (error instanceof Error) {
      console.log(`Error to retrieve a treatment plan ${error.message}`)
    }

    res
      .status(500)
      .json({ success: false, error: 'Comuniquese con su administrador' })
  }
}

export const getTratamientPlans = async (_req: Request, res: Response) => {
  try {
    const treatmentPlans = await TreatmentPlanModel.find()

    res.json({
      success: true,
      data: treatmentPlans,
    })
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(`Error to retrieve the treatment plans ${error.message}`)
    }

    res
      .status(500)
      .json({ success: false, error: 'Comuniquese con su administrador' })
  }
}

export const postTratamientPlan = async (req: Request, res: Response) => {
  try {
    const body = req.body as TreatmentPlan

    const treatmentPlan = await TreatmentPlanModel.create(body)

    res.status(201).json({
      success: true,
      data: treatmentPlan,
    })
  } catch (error) {
    if (error instanceof Error) {
      console.log(`Error to create a treatment plan ${error.message}`)
    }

    res
      .status(500)
      .json({ success: false, error: 'Comuniquese con su administrador' })
  }
}

export const putTratamientPlan = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const body = req.body as TreatmentPlan

    const treatmentPlan = await TreatmentPlanModel.findById(id)

    if (treatmentPlan == null) {
      return res.status(404).json({
        success: false,
        message: 'Usuario no encontrado',
      })
    }

    await TreatmentPlanModel.findByIdAndUpdate(id, body)

    res.status(204).send()
  } catch (error) {
    if (error instanceof Error) {
      console.log(`Error to update a treatment plan ${error.message}`)
    }

    res
      .status(500)
      .json({ success: false, error: 'Comuniquese con su administrador' })
  }
}

export const deleteTratamientPlan = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const treatmentPlan = await TreatmentPlanModel.findById(id)

    if (treatmentPlan == null) {
      return res.status(404).json({
        success: false,
        message: 'Usuario no encontrado',
      })
    }

    await TreatmentPlanModel.findByIdAndDelete(id)

    res.status(204).send()
  } catch (error) {
    if (error instanceof Error) {
      console.log(`Error to delete a treatment plan ${error.message}`)
    }

    res
      .status(500)
      .json({ success: false, error: 'Comuniquese con su administrador' })
  }
}
