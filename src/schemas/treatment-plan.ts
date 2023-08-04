import {
  getModelForClass,
  prop,
  index,
  modelOptions,
} from '@typegoose/typegoose'

@modelOptions({
  options: { customName: 'treatment_plans' },
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
@index({ name: 1 }, { unique: true })
export class TreatmentPlan {
  @prop()
  id: string

  @prop({ required: true })
  name!: string
}

// let document = await KittenModel.create({ name: 'Kitty' })
// "document" has proper (manual) typescript types of KittenClass

export const TreatmentPlanModel = getModelForClass(TreatmentPlan)
