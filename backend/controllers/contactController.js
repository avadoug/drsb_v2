import asyncHandler from 'express-async-handler'
import Message from '../models/contactModel.js'
import nodemailer from 'nodemailer';











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

      function sendContact(){
			
        const content =req.body.content
        const name = 'Contacts';
        const email ='no-reply@dankrealmseedbank.com';
         const Sender = process.env.MAIL_SENDER;
        const Target = req.body.email
        const Password = process.env.MAIL_PASSWORD;
        const MailHost = process.env.MAIL_HOST;
  
        const transporter = nodemailer.createTransport({
          port: 465,               
          host: MailHost,
          auth: {
              user: Sender,
              pass: Password
            },
          secure: true,
          });
        
        
        const mailData = {
          from: `"${name}" <${Sender}>`,
          replyTo:`${Target}`,  // sender address
        to: Sender,   // list of receivers
        subject: `Message from ${name}`,
        
        html: `<h1>${req.body.name}</h1> <h2> Just sent you a message</h2> <p>the contents are below</p> <br /> <ul>${content}</ul> <br />Contact Email:${Target}(you are also able to reply directly to this message)`,
        };
        
        transporter.sendMail(mailData, function (err, info) {
          if(err)
          console.log(err)
          else
          console.log(info);
         })};
         sendContact()





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
