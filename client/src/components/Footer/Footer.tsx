import React from "react";
import {Container, Image, Row} from "react-bootstrap";
import logo from './../../assets/img/logo.png'
import s from './Footer.module.scss'

const Footer = () => {
    return (
        <div className={s.footerWrapper}>
            <Container >
                <Row>
                    <Image src={logo} className={s.logo}/>
                </Row>
            </Container>
        </div>
    )
}

export default Footer