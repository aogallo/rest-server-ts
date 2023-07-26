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
