import { Column, Entity, ObjectId, ObjectIdColumn } from 'typeorm'

@Entity()
export default class TreatmentPlan {
  @ObjectIdColumn()
  id: ObjectId

  @Column()
  name: string
}
