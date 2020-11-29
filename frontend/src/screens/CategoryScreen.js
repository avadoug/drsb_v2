import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Image, ListGroup, Card} from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Meta from '../components/Meta'
import Product from "../components/Product";

import {
  listCategoryDetails,
  
} from '../actions/categoryActions'
import {listProductsByCategory} from '../actions/productActions'
import axios from 'axios'

const CategoryScreen = ({ history, match }) => {
  const [qty, setQty] = useState(1)

  const [products, setProducts] = useState([]);
  const dispatch = useDispatch()


  


  const categoryDetails = useSelector((state) => state.categoryDetails)
  const { loading, error, category } = categoryDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  const fetchProducts = async() =>{
    const id = match.params.id;

    try{
      const data = await axios.get(`/api/products/categories/${id}`)
      if(data){
        setProducts(data.data)
      
      }else{
        console.log('There Are No Products!')
      }
    }catch(err){
      console.error(err)
    }
    
  }
  useEffect(() => {
    fetchProducts() 
    if (!category._id || category._id !== match.params.id) {
      dispatch(listCategoryDetails(match.params.id))
    }
  }, [dispatch, match])


  return (
    <>
      <Link className='btn btn-light my-3' to='/'>
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Meta title={category.name} />
          <Row>
            <Col md={6}>
              <Image src={category.image} alt={category.name} fluid />
            </Col>
            <Col md={3}>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h3>{category.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
              
                </ListGroup.Item>
                
                <ListGroup.Item>
              
                  Description: {category.description}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            </Row>
            {loading ? (
				<Loader />
			) : error ? (
				<Message variant="danger">{error}</Message>
			) : (
				<>
					<Row>
						{products.map((product) => (
							<Col key={product._id} sm={12} md={6} lg={4} xl={3}>
								<Product product={product} />
							</Col>
						))}
					</Row>
				
				</>
			)}
           
         
        </>
      )}
    </>
  )
}

export default CategoryScreen
