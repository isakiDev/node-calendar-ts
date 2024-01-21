import { Schema, model } from 'mongoose'

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
})

// userSchema.method('toJSON', function () {
//   const { _id, __v, ...object } = this.toObject()

//   object.id = _id
//   return object
// })

export const UserModel = model('User', userSchema)
