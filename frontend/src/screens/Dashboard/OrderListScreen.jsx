import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import OrderList from '../../components/DashBoard/OrderList/OrderList'
import Meta from '../../components/Helmet/Meta'
import SideBarComponents from '../../components/SideBar/SideBarComponents'

const OrderListScreen = () => {
    return (
        <div style={{ marginTop: "110px" }}>
            <Meta
                title="Yon | Admin Đặt hàng"
            />
            <Container fluid>
                <Row>
                    <Col md={3}>
                        <h4>Đặt hàng</h4>
                    </Col>
                    <Col md={9}>
                        <h4 style={{ marginLeft: "30px" }}>Tất cả sản phẩm đặt hàng</h4>
                    </Col>
                </Row>
                <Row>
                    <Col md={3}>
                        <SideBarComponents />
                    </Col>
                    <Col md={9}>
                        <OrderList />
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default OrderListScreen
