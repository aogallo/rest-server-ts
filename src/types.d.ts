import { User } from "@schemas/user"

export interface LoginType {
  username: string
  password: string
}

declare global {
  namespace Express {
    interface Request {
      user: User
    }
  }
}
