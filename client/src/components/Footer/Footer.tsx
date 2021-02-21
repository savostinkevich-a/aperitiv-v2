import React from 'react';
import { Container, Image, Row, Col } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import logo from './../../assets/img/logo.png';
import s from './Footer.module.scss';

const Footer = () => {
    return (
        <div className={s.footerWrapper}>
            <Container>
                <Row xs={2}>
                    <Col lg={9} md={8} sm={7} xs={6} className={s.logoCol}>
                        <NavLink to={'/home'}>
                            <Image src={logo} className={s.logo} />
                        </NavLink>
                    </Col>
                    <Col lg={3} md={4} sm={5} xs={6}>
                        <Row className={s.devRow}>
                            <Col className={s.dev_title}>Дизайн</Col>
                            <a  href={'https://www.google.by/'}>
                                <Col className={s.dev_link}>
                                    @repina_eliza
                                </Col>
                            </a>
                        </Row>
                        <Row className={s.devRow}>
                            <Col className={s.dev_title}>Разработка</Col>
                            <a  href={'https://www.google.by/'}>
                                <Col className={s.dev_link}>
                                    @sav_va_
                                </Col>
                            </a>
                        </Row>

                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Footer;