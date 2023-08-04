import { getModelForClass, modelOptions, prop } from '@typegoose/typegoose'

@modelOptions({
  schemaOptions: {
    timestamps: true,
    toJSON: {
      transform: (_doc, ret) => {
        ret.id = ret._id as string
        delete ret._id
        delete ret.__v
        return ret
      },
    },
  },
})
export class Customer {
  @prop()
  id: string

  @prop({ required: true, index: true, unique: true })
  name!: string

  @prop({ unique: true })
  email: string

  @prop()
  address: string

  @prop()
  phone: string
}

export const CustomerModel = getModelForClass(Customer)
