import React, {useState} from "react";
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import {gql, useMutation} from '@apollo/client';

const LOGIN_GQL = gql`
    mutation Login($login: String!, $password: String!) {
        login(loginData: {login: $login, password: $password}){
            token
        }
    }
`

type PropsType = {
    setAuth(auth: boolean): void
}

const Login = (props: PropsType) => {
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const [loginGQL] = useMutation(LOGIN_GQL)

    const loginHandler = async () => {
        try {
            await loginGQL({variables: {login, password}}).then(result => {
                props.setAuth(!!result.data.login.token)
            })
        } catch (e) {
            setError(e.message)
        }

    }

    return (
        <Container>
            <Row className='justify-content-sm-center align-content-sm-center mt-5'>
                <Col xs={12} sm={12} md={6} lg={6}>
                    <Form className='d-flex flex-column justify-content-sm-center'>
                        {error}
                        <Form.Group controlId="formBasicEmail">
                            <Form.Control type="email" placeholder="Login"
                                          value={login} onChange={event => setLogin(event.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Control type="password" placeholder="Password"
                                          value={password} onChange={event => setPassword(event.target.value)}
                            />
                        </Form.Group>
                        <Button variant="primary" onClick={loginHandler}>
                            Войти
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default Login