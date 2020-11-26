import React, { useState } from "react";
import { Form, Button, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";
import { savePaymentMethod } from "../actions/cartActions";
import axios from "axios";

const PaymentScreen = ({ history }) => {
	const cart = useSelector((state) => state.cart);
	const { shippingAddress } = cart;

	if (!shippingAddress.address) {
		history.push("/shipping");
	}

	const [paymentMethod, setPaymentMethod] = useState("");

	const dispatch = useDispatch();

	const submitHandler = (e) => {
		if(paymentMethod === ''){
			e.preventDefault();
			alert('You Must Select a Payment Method!!!')
	}else{
		e.preventDefault();
		dispatch(savePaymentMethod(paymentMethod));
		
		axios.post('/api/orders/payment', (paymentMethod))
		.then(history.push("/placeorder"))
		.catch(err=>{
			console.error(err)
		})
	}};

	return (
		<FormContainer>
			<CheckoutSteps step1 step2 step3 />
			<h1>Payment Method</h1>
			<p>Select a payment method from the options below, and payment instructions for the payment method of your choice will be E-Mailed to you!</p>
			<Form onSubmit={submitHandler}>
				<Form.Group>
					<Form.Label as="legend">Select Method</Form.Label>
					<Col>
						<Form.Check
							type="radio"
							label="PayPal"
							id="PayPal"
							name="paymentMethod"
							value="PayPal"
							
							onChange={(e) => setPaymentMethod(e.target.value)}
						></Form.Check>
						<Form.Check
							type="radio"
							label="Venmo"
							id="Venmo"
							name="paymentMethod"
							value="Venmo"
							onChange={(e) => setPaymentMethod(e.target.value)}
						></Form.Check>
						<Form.Check
							type="radio"
							label="CashApp"
							id="CashApp"
							name="paymentMethod"
							value="CashApp"
							onChange={(e) => setPaymentMethod(e.target.value)}
						></Form.Check>
						<Form.Check
							type="radio"
							label="BitCoin"
							id="BitCoin"
							name="paymentMethod"
							value="BitCoin"
							onChange={(e) => setPaymentMethod(e.target.value)}
						></Form.Check>
					</Col>
				</Form.Group>

				<Button type="submit" variant="primary">
					Continue
				</Button>
			</Form>
		</FormContainer>
	);
};

export default PaymentScreen;
