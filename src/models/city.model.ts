import mongoose from 'mongoose'

const Schema = mongoose.Schema

const CitySchema = new Schema({
    title: {type: String, required: true},
    country: {type: mongoose.Schema.Types.ObjectId, req: 'country', required: true},
})

export const CityModel = mongoose.model('city', CitySchema)
