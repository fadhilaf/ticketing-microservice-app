import { Schema, Model, model, Document, Types } from "mongoose";

// https://mongoosejs.com/docs/typescript/statics-and-methods.html

// interface Ticket Document
interface ITicket {
  title: string;
  price: number;
  userId: string;
  createdAt: Date;
}

// interface utk parameter fungsi build instance Ticket
interface ITicketBuild {
  title: string;
  price: number;
  userId: string;
}

// An interface that describes the properties that a Ticket Model has
interface TicketModel extends Model<ITicket> {
  build(
    ticket: ITicketBuild
  ): Document<unknown, {}, ITicket> & Omit<ITicket & { _id: Types.ObjectId }, never>; //return type ny dapet dari "const ticket = new Ticket()" type ticket ny
}

const ticketSchema = new Schema<ITicket, TicketModel>(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      min: 0,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      expires: 60 * 60 * 24 * 7, // 7 days
    },
  },
  {
    //kalo mau customize response json dari model, kito bisa pake toJSON
    toJSON: {
      //ikuti cara serialize json dari mongoose
      transform(doc, ret) {
        delete ret.__v; //kalo mau delete field dari object, kito bisa pake "delete {obj}.{field}". (syntax javascript yg jarang dipake)
        ret.id = ret._id; //kalo mau rename field dari object, kito bisa pake {new field name} = {old field name}.
        delete ret._id;
      },
    },
  }
);
ticketSchema.statics.build = (ticket: ITicketBuild) => {
  return new Ticket(ticket);
};

const Ticket = model<ITicket, TicketModel>("Ticket", ticketSchema);

export default Ticket;
