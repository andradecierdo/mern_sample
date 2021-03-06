/* eslint-disable id-blacklist */
import collectionNames from '../collectionNames'
import mongoose from '../config/mongoose'

const Schema = mongoose.Schema
const User = new Schema(
  {
    address: String,
    email: {
      required: true,
      type: String,
      unique: true,
    },
    hashedPassword: {
      required: true,
      type: String,
    },
    name: String,
    parentId: mongoose.Schema.Types.ObjectId,
    type: String,
  },
  {
    collection: collectionNames.users,
    timestamps: true,
  },
)

export default User
