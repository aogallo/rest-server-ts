import { User } from '@schemas/user'
import { NextFunction, Request, Response } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'

//====================================
//  VERIFICACION DE TOKEN
//====================================
export const authToken = (req: Request, res: Response, next: NextFunction) => {
  const token = (req.headers.authorization?.split('Bearer ')[1] as string) || ''

  if (token == '') {
    return res.status(401).send()
  }

  const verifyToken: jwt.JwtPayload = jwt.verify(
    token,
    process.env.SECRET as string
  ) as JwtPayload

  if (verifyToken.exp != null && Date.now() >= verifyToken.exp * 1000) {
    return res.status(401).json({
      success: false,
    })
  }

  req.user = verifyToken.user as User

  next()
}

//====================================
//  VERIFICACION DE ADMINROLE
//====================================

// export const verificaAdmin_Role = (
//   req: Response,
//   res: Response,
//   next: NextFunction
// ) => {
//   let usuario = req.usuario
//   console.log(usuario)

//   if (usuario.role != 'ADMIN_ROLE') {
//     return res.status(404).json({
//       ok: false,
//       message: 'El usuario no es administrador',
//     })
//   }

//   next()
// }
