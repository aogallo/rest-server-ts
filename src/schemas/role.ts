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
export class Role {
  @prop()
  id: string

  @prop({ required: true, index: true })
  name!: string

  @prop()
  permissions: [string]
}

export const RoleModel = getModelForClass(Role)
