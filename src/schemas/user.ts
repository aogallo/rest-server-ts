import { getModelForClass, prop } from '@typegoose/typegoose'

export class User {
  @prop()
  id: string

  @prop({ required: true })
  username!: string

  @prop({ required: true })
  name!: string

  @prop({ required: true })
  password: string

  @prop({ required: true })
  email: string
}

export const UserModel = getModelForClass(User)
