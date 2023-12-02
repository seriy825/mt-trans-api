import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

type Status = "NO_BORDER" | "US_CITIZEN" | "GREEN_CARD"
type CarType = "box truck" | "sprinter" | "large"

export type DriverDocument = HydratedDocument<Driver>;
@Schema({timestamps:true})
export class Driver{
  _id?:mongoose.Types.ObjectId;
  @Prop({required:true, unique:true})
  id: Number;

  @Prop({ type: [Number] })
  position: Number[];

  @Prop({required:true})
  name: string;

  @Prop()
  owner: string;

  @Prop({ type: Date, default: Date.now, required:true })
  dateAvailable: Date;

  @Prop({required:true})
  phone: string;

  @Prop({required:true})
  typeCar: CarType;

  @Prop({required:true})
  dimension: string;

  @Prop()
  capacity: Number;

  @Prop({required:true})
  status: Status;

  @Prop()
  home: string;

  @Prop({required:true})
  zipCode: Number;

  @Prop({required:true})
  locationName: string;

  @Prop({required:true})
  active: boolean;

  @Prop()
  note: string;

  @Prop()
  telegram:string;
}

export const DriverSchema = SchemaFactory.createForClass(Driver);