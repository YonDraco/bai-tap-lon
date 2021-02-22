import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Message from './../../components/Message/Message';
import { addToCart, removeFromCart } from './../../actions/cartActions'
import { Row, Col, ListGroup, Image, Button, Form, Container, Card } from 'react-bootstrap';
import Meta from '../../components/Helmet/Meta';

const Cart = ({ match, location, history }) => {

    const productId = match.params.id
    const qty = location.search ? Number(location.search.split('=')[1]) : 1

    const dispatch = useDispatch()

    const cartSeed = useSelector((state) => state.cartSeed)
    const { cartItems } = cartSeed

    useEffect(() => {
        if (productId) {
            dispatch(addToCart(productId, qty))
        }
    }, [dispatch, productId, qty])

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id))
    }

    const checkoutHandler = () => {
        history.push('/login?redirect=shipping')
    }

    return (
        <Container style={{ marginTop: '100px', marginBottom: '50px' }}>
            <Meta
                title="Yon | Giỏ hàng"
            />
            <Row>
                <Col md={8}>
                    <h1>Shopping Cart</h1>
                    {
                        cartItems.length === 0 ? (
                            <Message variant='danger'>
                                Giỏ hàng của bạn trống <Link to='/'>Quay lại</Link>
                            </Message>
                        ) : (
                                <ListGroup variant='flush' >
                                    {cartItems.map((item) => (
                                        <ListGroup.Item key={item.seed} style={{ marginTop: '10px' }}>
                                            <Row>
                                                <Col md={2}>
                                                    <Image src={item.image} alt={item.name} fluid rounded />
                                                </Col>
                                                <Col md={3}>
                                                    <Link to={`/dich-vu/purchaseSeeds/${item.seed}`}>{item.name}</Link>
                                                </Col>
                                                <Col md={2}>{item.price} VND</Col>
                                                <Col md={2}>
                                                    <Form.Control
                                                        as='select'
                                                        value={item.qty}
                                                        onChange={(e) =>
                                                            dispatch(
                                                                addToCart(item.seed, Number(e.target.value))
                                                            )
                                                        }
                                                    >
                                                        {[...Array(item.countInStock).keys()].map((x) => (
                                                            <option key={x + 1} value={x + 1}>
                                                                {x + 1}
                                                            </option>
                                                        ))}
                                                    </Form.Control>
                                                </Col>
                                                <Col md={2}>
                                                    <Button
                                                        type='button'
                                                        variant='light'
                                                        onClick={() => removeFromCartHandler(item.seed)}
                                                    >
                                                        <i className='fas fa-trash'></i>
                                                    </Button>
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            )}
                </Col>
                <Col md={4}>
                    <Card style={{ marginTop: '50px' }}>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h2>Tổng có ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) Sản phẩm</h2>
                                {cartItems
                                    .reduce((acc, item) => acc + item.qty * item.price, 0)
                                    .toFixed(3)} VND
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Button
                                    type='button'
                                    className='btn-block'
                                    disabled={cartItems.length === 0}
                                    onClick={checkoutHandler}
                                >
                                    Tiến hành kiểm tra
                                </Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default Cart
