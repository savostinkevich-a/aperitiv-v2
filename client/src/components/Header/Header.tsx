import React from "react";
import {Container, Image, Nav, Navbar} from "react-bootstrap";
import {NavLink} from "react-router-dom";
import logo from './../../assets/img/logo.png'
import s from './Header.module.scss'



const Header = () => {

    return (
        <div className={s.headerWrapper} >

            <Container className={s.headerContainer}>
                <Navbar expand={'lg'} className={s.navbar}>
                    <Navbar.Brand>
                        <NavLink to={'/home'}>
                            <Image src={logo} className={s.logo}/>
                        </NavLink>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" className={s.toggle}/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className={s.nav}>
                            <NavLink to={'/portfolio'} className={s.navItem}>Портфолио</NavLink>
                            <NavLink to={'/about'} className={s.navItem}>Обо мне</NavLink>
                            <NavLink to={'/contacts'} className={s.navItem}>Контакты</NavLink>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </Container>
        </div>
    )
}

export default Header
