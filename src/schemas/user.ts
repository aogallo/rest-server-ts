import { getModelForClass, modelOptions, prop } from '@typegoose/typegoose'

@modelOptions({
  schemaOptions: {
    timestamps: true,
    toJSON: {
      transform: (_doc, ret) => {
        ret.id = ret._id as string
        delete ret._id
        delete ret.__v
        delete ret.password
        return ret
      },
    },
  },
})
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
