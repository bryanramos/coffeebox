import { Schema, model } from 'mongoose';

const localizedCategoryPropertiesSchema = new Schema({
    language: {
        type: String,
        enum: ['en', 'es'],
        required: true
    },
    name: {
        type: String,
        min: 2,
        max: 100,
        required: true
    },
    description: { /* optional */
        type: String,
        max: 255
    }
}, { _id: false });

const categorySchema = new Schema({
    cid: {
        type: String,
        unique: true,
        required: true
    },
    localizedProperties: {
        type: [localizedCategoryPropertiesSchema],
        validate: lp => Array.isArray(lp) && lp.length == ['en', 'es'].length
    }
}, {
    timestamps: { createdAt: 'createdTimestamp', updatedAt: 'updatedTimestamp' }
});

export const Category = model('Category', categorySchema);