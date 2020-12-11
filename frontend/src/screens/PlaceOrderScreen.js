import React, { useState, useEffect } from "react";
import FormContainer from "../components/FormContainer";
import { ReactComponent as Bitcoin } from "../components/Icons/Bitcoin.svg";

import { Link } from "react-router-dom";
import {
  Form,
  Button,
  Row,
  Col,
  ListGroup,
  Image,
  Card,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import CheckoutSteps from "../components/CheckoutSteps";
import { createOrder } from "../actions/orderActions";
import { ORDER_CREATE_RESET } from "../constants/orderConstants";
import { USER_DETAILS_RESET } from "../constants/userConstants";
import { PRODUCT_UPDATE_RESET } from "../constants/productConstants";
import { updateProduct } from "../actions/productActions";

import axios from "axios";

const PlaceOrderScreen = ({ history }) => {
  const dispatch = useDispatch();
  const [amountOff, setAmountOff] = useState(0);
  const [countInStock, setCountInStock] = useState(0);
  const [bitcoinPrice, setBitcoinPrice] = useState(null);

  const productDetails = useSelector((state) => state.productDetails);
  const { product } = productDetails;
  const convertToBTC = () => {
    axios
      .get("https://api.coindesk.com/v1/bpi/currentprice/USD.json")
      .then((res) => {
        const btc = res.data.bpi.USD.rate_float;
        setBitcoinPrice((1 / btc) * cart.totalPrice);
        console.log(cart.bitcoinPrice);
      })
      .catch((err) => {
        console.error(err);
      });
  };
  const cart = useSelector((state) => state.cart);

  if (!cart.shippingAddress.address) {
    history.push("/shipping");
  } else if (!cart.paymentMethod) {
    history.push("/payment");
  }
  //   Calculate prices
  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  cart.itemsPrice = addDecimals(
    cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );
  cart.shippingPrice = 15;
  cart.taxPrice = addDecimals(Number((0.15 * cart.itemsPrice).toFixed(2)));
  cart.totalPrice = (
    Number(cart.itemsPrice) +
    Number(cart.shippingPrice) +
    Number(cart.taxPrice)
  ).toFixed(2);
  if (amountOff) {
    cart.itemsPrice = cart.itemsPrice - cart.itemsPrice * (amountOff / 100);
    cart.itemsPrice = Number(cart.itemsPrice).toFixed(2);
    cart.totalPrice = (
      Number(cart.itemsPrice) +
      Number(cart.shippingPrice) +
      Number(cart.taxPrice)
    ).toFixed(2);
    convertToBTC();
  }
  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, success, error } = orderCreate;
  const [discount, setDiscount] = useState("");

  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate;

  const submitDiscountHandler = (e) => {
    e.preventDefault();
    if (discount) {
      axios
        .get(`/api/discounts/${discount}`)
        .then((res) => {
          setAmountOff(res.data);
          alert("Discount Added!");
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  useEffect(() => {
    if (cart.paymentMethod === "BitCoin") {
      convertToBTC();
    }
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
    } else {
      setCountInStock(product.countInStock);
      console.log("Updated!");
    }
    if (success) {
      history.push(`/order/${order._id}`);
      dispatch({ type: USER_DETAILS_RESET });
      dispatch({ type: ORDER_CREATE_RESET });
    }

    // eslint-disable-next-line
  }, [dispatch, history, success, successUpdate]);

  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      })
    );
  };
  const placeBTCOrderHandler = () => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: bitcoinPrice,
      })
    );
  };

  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Address:</strong>
                {cart.shippingAddress.name},{cart.shippingAddress.address},{" "}
                {cart.shippingAddress.city} {cart.shippingAddress.postalCode},{" "}
                {cart.shippingAddress.country}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <strong>Method: </strong>
              {cart.paymentMethod}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {cart.cartItems.length === 0 ? (
                <Message>Your cart is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {cart.cartItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x ${item.price} = ${item.qty * item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                  <FormContainer>
                    <Form onSubmit={submitDiscountHandler}>
                      <h2>Discount Code</h2>
                      <Form.Group controlId="discount">
                        <Form.Label>Have a code? Enter it Below...</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter Code"
                          value={discount}
                          onChange={(e) => setDiscount(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <Button type="submit" variant="primary">
                        Apply Code
                      </Button>
                    </Form>
                  </FormContainer>
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${cart.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${cart.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${cart.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              {cart.paymentMethod !== "BitCoin" && (
                <ListGroup.Item>
                  <Row>
                    <Col>Total </Col>
                    <Col>${cart.totalPrice}</Col>
                  </Row>
                </ListGroup.Item>
              )}
              {cart.paymentMethod === "BitCoin" && (
                <ListGroup.Item>
                  <Row>
                    <Col>Total in BitCoin</Col>
                    <Col>{bitcoinPrice}</Col>
                  </Row>
                </ListGroup.Item>
              )}
              <ListGroup.Item>
                {error && <Message variant="danger">{error}</Message>}
              </ListGroup.Item>
              {cart.paymentMethod === "BitCoin" ? (
                <ListGroup.Item>
                  <Button
                    type="button"
                    className="btn-block"
                    disabled={cart.cartItems === 0}
                    onClick={placeBTCOrderHandler}
                  >
                    Place Order
                  </Button>
                </ListGroup.Item>
              ) : (
                <ListGroup.Item>
                  <Button
                    type="button"
                    className="btn-block"
                    disabled={cart.cartItems === 0}
                    onClick={placeOrderHandler}
                  >
                    Place Order
                  </Button>
                </ListGroup.Item>
              )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default PlaceOrderScreen;
