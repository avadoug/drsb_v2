import mongoose from 'mongoose'


const messageSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    content: {
      type: String,
      required: true,
    },
   
  },
  {
    timestamps: true,
  }
)


const Message = mongoose.model('Message', messageSchema)

export default Message
