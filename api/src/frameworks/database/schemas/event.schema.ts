import { Schema } from "mongoose";
import { IEventModel } from "../models/event.model";

export const EventSchema: Schema = new Schema<IEventModel>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    },
    pricePerTicket: {
      type: Number,
      required: true,
      min: 0,
    },
    ticketLimit: {
      type: Number,
      required: true,
      min: 1,
    },
    eventLocation: {
      type: String,
      required: false,
    },
    coordinates: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },
      coordinates: {
        type: [Number],
        required: true,
      },
    },
    posterImage: {
      type: String,
    },
    hostId: {
      type: Schema.Types.ObjectId,
      ref: "Client",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

EventSchema.index({ "coordinates.coordinates": "2dsphere" });
