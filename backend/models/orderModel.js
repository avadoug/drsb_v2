import asyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";
import Product from "../models/productModel.js";
import nodemailer from "nodemailer";

export const paymentInstructions = asyncHandler(async (req, res) => {
  s;
  res.status(200);
});

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No order items");
    return;
  } else {
    const order = new Order({
      orderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    function reduceQuantity() {
      const orderItems = order.orderItems;
    }

    function sendConfirmation() {
      const content = orderItems
        .map(function (i) {
          return `<li>${i.qty} of ${i.name}</li>`;
        })
        .join("");
      const name = "Orders";
      const email = "no-reply@dankrealmseedbank.com";
      const add = order.shippingAddress;
      const address = `${add.address} | ${add.postalCode} | ${add.country}`;
      const Sender = process.env.MAIL_SENDER;
      const Target = process.env.MAIL_RECIPIENT;
      const Password = process.env.MAIL_PASSWORD;
      const MailHost = process.env.MAIL_HOST;

      const transporter = nodemailer.createTransport({
        port: 465,
        host: MailHost,
        auth: {
          user: Sender,
          pass: Password,
        },
        secure: true,
      });

      const mailData = {
        from: `"${name}" <${Sender}>`,
        replyTo: email, // sender address
        to: Target, // list of receivers
        subject: `Message from ${name}`,

        html: `<h1>${req.user.name}</h1> <h2> Just placed an order for</h2> <br /> <ul>${content}</ul> <br /><p> Total Price:$${totalPrice}</p>
			<p>Payment Selection:${paymentMethod}</p>
			<h2>Address:${shippingAddress.name}, ${address}</h2>`,
      };

      transporter.sendMail(mailData, function (err, info) {
        if (err) console.log(err);
        else console.log(info);
      });
    }

    function sendInstructions() {
      const paypal = process.env.PAYPAL_INFO;
      const venmo = process.env.VENMO_INFO;
      const bitcoin = process.env.BITCOIN_INFO;
      const cashapp = process.env.CASHAPP_INFO;

      function getInstructions() {
        if (order.paymentMethod === "PayPal") {
          return paypal;
        }
        if (order.paymentMethod === "Venmo") {
          return venmo;
        }
        if (order.paymentMethod === "BitCoin") {
          return bitcoin;
        }
        if (order.paymentMethod === "CashApp") {
          return cashapp;
        }
        console.log("");
      }
      const name = "Payment Instructions";
      const email = "no-reply@dankrealmseedbank.com";
      const Sender = process.env.MAIL_SENDER;
      const Password = process.env.MAIL_PASSWORD;
      const MailHost = process.env.MAIL_HOST;
      const user = req.user.email;
      const transporter = nodemailer.createTransport({
        port: 465,
        host: MailHost,
        auth: {
          user: Sender,
          pass: Password,
        },
        secure: true,
      });

      const mailData = {
        from: `"${name}" <${Sender}>`,
        replyTo: email, // sender address
        to: user, // list of receivers
        subject: `Payment Instructions for order ${order._id}`,

        html: `<h2>You have selected to pay with</h2> <h1>${
          order.paymentMethod
        }</h1> <br/> <p>To complete your order, send $${totalPrice} to: <br /> ${getInstructions()} <br />Then keep an eye on your account for fulfillment status`,
      };

      transporter.sendMail(mailData, function (err, info) {
        if (err) console.log(err);
        else console.log(info);
      });
    }

    sendConfirmation();

    		sendInstructions();

    const createdOrder = await order.save();

    res.status(201).json(createdOrder);
  }
});

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

// @desc    Update order to paid
// @route   GET /api/orders/:id/pay
// @access  Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    // order.paymentResult = {
    // 	id: req.body.id,
    // 	status: req.body.status,
    // 	update_time: req.body.update_time,
    // 	email_address: req.body.payer.email_address,
    // };

    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } else {
    res.status(404);
    console.error("Order not found");
  }
});

// @desc    Update order to delivered
// @route   GET /api/orders/:id/deliver
// @access  Private/Admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  const orderItems = order.orderItems;
  orderItems.forEach((i) => {
    const productId = i.product;
    const name = i.name;
    const qty = i.qty;

    async function reduceQuantity(productId, qty) {
      const product = await Product.findById(productId);

      if (product) {
        const inv = product.countInStock;
        console.log(product);
        const reduce = (product.countInStock = product.countInStock - qty);
        console.log(reduce);
        const updatedProduct = await product.save();
        console.log(updatedProduct);
      } else {
        throw new Error("Product not found");
      }
    }

    reduceQuantity(productId, qty);

    console.info(name, "ID:", productId, "Reduce By:", qty);
  });

  // const updatedProduct = await Product.save();

  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();

    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.json(orders);
});

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate("user", "id name");
  res.json(orders);
});

export {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getMyOrders,
  getOrders,
};
