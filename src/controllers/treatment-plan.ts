import { Request, Response } from 'express'
import { TreatmentPlan, TreatmentPlanModel } from '../schemas/treatment-plan'

export const getTratamientPlan = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const treatmentPlan = await TreatmentPlanModel.findById(id)

    res.json({
      success: true,
      data: treatmentPlan,
    })
  } catch (error) {
    if (error instanceof Error) {
      console.log(`Error to retrieve a treatment plan ${error.message}`)
    }

    res.status(500).json({
      success: false,
      data: null,
    })
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

    res.status(500).json({
      success: false,
      data: [],
    })
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

    res.status(500).json({ success: false, data: null })
  }
}

export const putTratamientPlan = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const body = req.body as TreatmentPlan

    const treatmentPlan = await TreatmentPlanModel.findById(id)

    if (treatmentPlan == null) {
      res.status(400).json({
        success: false,
      })
    }

    await TreatmentPlanModel.updateOne({ id }, body)

    res.status(304).json({
      success: true,
    })
  } catch (error) {
    if (error instanceof Error) {
      console.log(`Error to update a treatment plan ${error.message}`)
    }

    res.status(500).json({ success: false, data: null })
  }
}

export const deleteTratamientPlan = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const treatmentPlan = await TreatmentPlanModel.findById(id)

    if (treatmentPlan == null) {
      res.status(400).json({
        success: false,
      })
    }

    res.status(204).json({
      success: true,
    })
  } catch (error) {
    if (error instanceof Error) {
      console.log(`Error to delete a treatment plan ${error.message}`)
    }

    res.status(500).json({ success: false })
  }
}
