import { NextFunction, Request, Response } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'

//====================================
//  VERIFICACION DE TOKEN
//====================================
export const authToken = (req: Request, _res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split('Bearer ')[1] as string

  const verifyToken: jwt.JwtPayload = jwt.verify(
    token,
    process.env.SECRET as string
  ) as JwtPayload

  console.log('res', verifyToken)

  // jwt.verify(token, process.env.SECRET, (err, decoded) => {
  //   if (err) {
  //     return res.status(401).json({
  //       ok: false,
  //       message: 'Token no valido',
  //     })
  //   }

  //   req.usuario = decoded.usuario

  //   next()
  // })
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
