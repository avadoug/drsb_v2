import asyncHandler from 'express-async-handler'
import Discount from '../models/discountModel.js'

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getDiscounts = asyncHandler(async (req, res) => {
 
  const discounts = await Discount.find()
   
  res.json({discounts})
})

const getDiscountByCode = asyncHandler(async (req, res) => {
  const code = req.params.code
  // const discount = await Discount.find(code)
  console.log(code)
  const discount = await Discount.findOne({ code:code }, function (err, data) {
    if(err){
      console.error(err)
      res.status(404)
      throw new Error('Discount not found')
    }else if (data){
      res.json(data.amount)
    }
  });
  
 
})



// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getDiscountById = asyncHandler(async (req, res) => {
  const discount = await Discount.findById(req.params.id)

  if (discount) {
    res.json(discount)
  } else {
    res.status(404)
    throw new Error('Discount not found')
  }
})

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteDiscount = asyncHandler(async (req, res) => {
  const discount = await Discount.findById(req.params.id)

  if (discount) {
    await discount.remove()
    res.json({ message: 'Discount removed' })
  } else {
    res.status(404)
    throw new Error('Discount not found')
  }
})

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createDiscount = asyncHandler(async (req, res) => {
  const discount = new Discount({
   
    amount: 0,
    user: req.user._id,
    code: 'DISCOUNT'
  })

  const createdDiscount = await discount.save()
  res.status(201).json(createdDiscount)
})

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateDiscount = asyncHandler(async (req, res) => {
  const {
    amount,    
    code
  } = req.body

  const discount = await Discount.findById(req.params.id)

  if (discount) {

    discount.amount = amount
    discount.code = code

  

    const updatedDiscount = await discount.save()
    res.json(updatedDiscount)
  } else {
    res.status(404)
    throw new Error('Discount not found')
  }
})

export {
  getDiscounts,
  getDiscountById,
  getDiscountByCode,
  deleteDiscount,
  createDiscount,
  updateDiscount,

}
