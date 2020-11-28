import mongoose from 'mongoose'



const discountSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
     
    amount: {
      type: Number,
      required: true,
      default: 0,
    },
    code: {
      type: String,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
)

const Discount = mongoose.model('Discount', discountSchema)

export default Discount
