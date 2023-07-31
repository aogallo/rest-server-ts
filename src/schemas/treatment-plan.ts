import {
  getModelForClass,
  prop,
  index,
  modelOptions,
} from '@typegoose/typegoose'
import { Expose, Transform } from 'class-transformer'

@modelOptions({
  options: { customName: 'treatment_plans' },
  schemaOptions: {
    timestamps: true,
  },
})
@index({ name: 1 }, { unique: true })
export class TreatmentPlan {
  @Expose()
  @Transform((value) => {
    console.log('value', value)
    return value.value
  })
  @prop()
  id: string

  @prop({ required: true })
  name!: string
}

// let document = await KittenModel.create({ name: 'Kitty' })
// "document" has proper (manual) typescript types of KittenClass

export const TreatmentPlanModel = getModelForClass(TreatmentPlan)
