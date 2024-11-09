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
        required: true,
        trim: true
    },
    application_deadline: {
        type: Date,
        required: true
    },
    eligibility_requirements: {
        type: String,
        required: true,
        trim: true
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
    contact_email: {
        type: String,
        required: false,
        trim: true
    },
    field_of_study: {
        type: String,
        required: true,
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
