import { Request, Response } from 'express'

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

export const postTratamientPlan = (req: Request, res: Response) => {
  const body = req.body

  res.json({
    msg: 'crear tratamient',
    body,
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
