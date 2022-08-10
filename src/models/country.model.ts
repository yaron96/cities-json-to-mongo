import mongoose from 'mongoose'

const Schema = mongoose.Schema

const CountrySchema = new Schema({
    title: {type: String, required: true},
    cities: [{type: Schema.Types.ObjectId, req: 'city'}],
})

export const CountryModel = mongoose.model('country', CountrySchema)
