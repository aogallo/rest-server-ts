import { getModelForClass, prop, modelOptions } from '@typegoose/typegoose'

@modelOptions({
  options: { customName: 'treatment_plans' },
  schemaOptions: {
    timestamps: true,
  },
})
export class TreatmentPlan {
  @prop()
  id: string

  @prop({ required: true, unique: true })
  name!: string
}

// let document = await KittenModel.create({ name: 'Kitty' })
// "document" has proper (manual) typescript types of KittenClass

export const TreatmentPlanModel = getModelForClass(TreatmentPlan)
