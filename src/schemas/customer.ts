import { getModelForClass, prop } from '@typegoose/typegoose'

export class Customer {
  @prop()
  id: string

  @prop({ required: true, unique: true })
  name!: string

  @prop({ unique: true })
  email: string

  @prop()
  address: string

  @prop()
  phone: string
}

export const CustomerModel = getModelForClass(Customer)
