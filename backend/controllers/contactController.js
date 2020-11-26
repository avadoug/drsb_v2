import asyncHandler from 'express-async-handler'
import Message from '../models/contactModel.js'


// @desc    Send a new Message
// @route   POST /api/contact
// @access  Public
export const Contact = asyncHandler(async (req, res) => {
    const { name, email, content } = req.body
  
   
 
    const msg = await Message.create({
      name,
      email,
      content,
    })
  
    if (msg) {
      res.status(201).json({
      Message:msg
      })
    } else {
      res.status(400)
      throw new Error('Invalid Message Data')
    }
  })

  // @desc    Get all users
// @route   GET /api/contacts
// @access  Private/Admin
export const getContacts = asyncHandler(async (req, res) => {
    const msg = await Message.find({})
    res.json(msg)
  })
  
  // @desc    Delete user
  // @route   DELETE /api/contacts/:id
  // @access  Private/Admin
  export  const deleteContact = asyncHandler(async (req, res) => {
    const msg = await Message.findById(req.params.id)
  
    if (msg) {
      await msg.remove()
      res.json({ message: 'Message removed' })
    } else {
      res.status(404)
      throw new Error('Message not found')
    }
  })
  
  // @desc    Get user by ID
  // @route   GET /api/users/:id
  // @access  Private/Admin
  export const getContactById = asyncHandler(async (req, res) => {
    const msg = await Message.findById(req.params.id)
  
    if (msg) {
      res.json(msg)
    } else {
      res.status(404)
      throw new Error('Message not found')
    }
  })