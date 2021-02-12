import React, {useEffect, useState} from "react";
import {Button, Col, Container, Nav, Row, Tab} from "react-bootstrap";
import Login from "./Login/Login";
import {useCookies} from "react-cookie";
import CreateProduct from "./CreateProduct/CreateProduct";
import Connects from "./Connects/Connects";


const Admin = () => {
    const [auth, setAuth] = useState(false)
    const [cookies, setCookie, removeCookie] = useCookies(['token']);

    useEffect(() => {
        if (cookies.token && cookies.token !== '') {
            setAuth(true)
        }
    })

    const logOut = () => {
        removeCookie('token')
        setAuth(false)
    }

    if (!auth) {
        return <Login setAuth={setAuth}/>
    }
    return (
        <Container className='mt-3'>
            <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                <Row>
                    <Col sm={3}>
                        <Nav variant="pills" className="flex-column">
                            <Nav.Item>
                                <Nav.Link eventKey="first">Добавить</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="second">Настройки</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="third">Заказы</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Col>
                    <Col sm={9}>
                        <Tab.Content>
                            <Tab.Pane eventKey="first">
                              <CreateProduct/>
                            </Tab.Pane>
                            <Tab.Pane eventKey="second">
                                <Button onClick={logOut}>Выйти</Button>
                            </Tab.Pane>
                            <Tab.Pane eventKey="third">
                                <Connects/>
                            </Tab.Pane>
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>

        </Container>
    )
}


export default Admin