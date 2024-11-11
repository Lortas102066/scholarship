import { Schema, model, models } from "mongoose";

const ScholarshipSchema = new Schema({
    scholarship_name: {
        type: String,
        required: true,
        trim: true
    },
    provider_name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    capacity: {
        type: Number,
        required: true,
        default: null
    },
    application_start_date: {
        type: Date,
    },
    application_deadline: {
        type: Date,
    },
    award_amount: {
        type: Number,
        default: null
    },
    duration: {
        type: String,
        required: false,
        trim: true
    },
    website_link: {
        type: String,
        required: false,
        trim: true
    },
    field_of_study: {
        type: String,
        trim: true
    },
    education_level: {
        type: String,
        required: true,
        trim: true
    },
    min_GPA: {
        type: Number,
        default: null
    },
    max_GPA: {
        type: Number,
        default: null
    }
});

const Scholarship = models.Scholarship || model('Scholarship', ScholarshipSchema);

export default Scholarship;
