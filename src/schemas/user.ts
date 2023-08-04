import { getModelForClass, modelOptions, prop, Ref } from '@typegoose/typegoose'
import { Role } from './role'

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

  @prop({ required: true, index: true })
  username!: string

  @prop({ required: true })
  name!: string

  @prop({ required: true })
  password: string

  @prop({ required: true })
  email: string

  @prop({ ref: () => Role, required: true, index: true })
  roles: Ref<Role>[]
}

export const UserModel = getModelForClass(User)
