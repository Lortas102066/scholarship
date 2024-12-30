import mongoose from "mongoose";
import { stringify } from "querystring";

const { Schema, model, models } = mongoose;

const AmountSchema = new Schema({
    currency: { type: String, required: true },
    amount:   { type: Number, required: true },
    duration: { type: Number, required: false },
}, { _id : false });

const ConditionSchema = new Schema({
    grade:  { type: String, required: false },
    income: { type: Number, required: false },
}, { _id : false });

const ScholarshipSchema = new Schema({
    name: {
      type: String,
      required: true
    },
    link: {
      type: String,
      required: true
    },
    provider: {
      type: String,
      required: true
    },
    desc: {
      type: String,
      required: false
    },
    application_start_date: {
      type: Date,
      required: true
    },
    application_end_date: {
      type: Date,
      required: true
    },
    isGranted: {
      type: Boolean,
      required: true
    },
    isAbroad: {
      type: Boolean,
      required: true
    },
    combination: {
      type: Boolean,
      required: true
    },
    capacity: {
      type: String,
      required: true
    },
    amounts: [AmountSchema],
    conditions: [ConditionSchema],
}, {
    timestamps: true 
});

const Scholarship = models.Scholarship || model('Scholarship', ScholarshipSchema);

export default Scholarship;
