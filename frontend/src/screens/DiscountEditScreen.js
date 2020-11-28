import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { listDiscountDetails, updateDiscount } from '../actions/discountActions'
import { DISCOUNT_UPDATE_RESET } from '../constants/discountConstants'

const DiscountEditScreen = ({ match, history }) => {
  const discountId = match.params.id

  const [code, setCode] = useState('')
  const [amount, setAmount] = useState(0)
  
  
  const dispatch = useDispatch()

  const discountDetails = useSelector((state) => state.discountDetails)
  const { loading, error, discount } = discountDetails

  const discountUpdate = useSelector((state) => state.discountUpdate)
  
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = discountUpdate

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: DISCOUNT_UPDATE_RESET })
      history.push('/admin/discountlist')
    } else {
      if (!discount.code || discount._id !== discountId) {
        dispatch(listDiscountDetails(discountId))
      } else {
        setCode(discount.code)
        setAmount(discount.amount)
       
      }
    }
  }, [dispatch, history, discountId, discount, successUpdate])


  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      updateDiscount({
        _id: discountId,
        code,
        amount,
   
      })
    )
  }

  return (
    <>
      <Link to='/admin/discountlist' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit discount</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='code'>
              <Form.Label>Code</Form.Label>
              <Form.Control
                type='code'
                placeholder='Enter code'
                value={code}
                onChange={(e) => setCode(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='amount'>
              <Form.Label>Amount (%)</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter Amount'
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type='submit' variant='primary'>
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  )
}

export default DiscountEditScreen
