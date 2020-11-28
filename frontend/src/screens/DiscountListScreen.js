import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'

import {createDiscount, listDiscounts, deleteDiscount} from '../actions/discountActions'

import { DISCOUNT_CREATE_RESET } from '../constants/discountConstants'

const DiscountListScreen = ({ history, match }) => {
  
  const dispatch = useDispatch()

  const discountList = useSelector((state) => state.discountList)
  const { loading, error, discounts } = discountList



  const discountDelete = useSelector((state) => state.discountDelete)
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = discountDelete

  const discountCreate = useSelector((state) => state.discountCreate)
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    discount: createdDiscount,
  } = discountCreate

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    dispatch({ type: DISCOUNT_CREATE_RESET })

    if (!userInfo || !userInfo.isAdmin) {
      history.push('/login')
    }

    if (successCreate) {
      history.push(`/admin/discount/${createdDiscount._id}/edit`)
    } else {
      dispatch(listDiscounts())
    }
  }, [
    dispatch,
    userInfo,
    successDelete,
    successCreate,
    createdDiscount,
  ])

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure')) {
      dispatch(deleteDiscount(id))
    }
  }

  const createDiscountHandler = () => {
    dispatch(createDiscount())
  }


  return (
    <>
     
       <Row className='align-items-center'>
        <Col>
          <h1>Discounts</h1>
        </Col>
        <Col className='text-right'>
          <Button className='my-3' onClick={createDiscountHandler}>
            <i className='fas fa-plus'></i> Create Discount
          </Button>
        </Col>
      </Row>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
      {loadingCreate && <Loader />}
      {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>Code</th>
                <th>Amount</th>
             
                <th></th>
              </tr>
            </thead>
            <tbody>
              {discounts.map((discount) => (
                <tr key={discount._id}>
                  <td>{discount._id}</td>
                  <td>{discount.code}</td>
                  <td>{discount.amount}%</td>
                 
                  <td>
                    <LinkContainer to={`/admin/discount/${discount._id}/edit`}>
                      <Button variant='light' className='btn-sm'>
                        <i className='fas fa-edit'></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      variant='danger'
                      className='btn-sm'
                      onClick={() => deleteHandler(discount._id)}
                    >
                      <i className='fas fa-trash'></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
      
        </>
      )}
    </>
  )
}

export default DiscountListScreen
