import React, { createRef, useEffect, useRef, useState } from 'react';
import {Container, Image, Nav, Navbar} from "react-bootstrap";
import { HashRouter, NavLink, useLocation } from 'react-router-dom';
import logo from './../../assets/img/logo.png'
import s from './Header.module.scss'
import {BiMenu} from 'react-icons/all';
import { IoMdClose} from 'react-icons/io'

const Header = () => {

    const nav = createRef<HTMLDivElement>()

    const openMenu = () => {
        // @ts-ignore

        nav.current.style.display = 'block'
    }

    let location = useLocation()

    const closeMenu = () => {
        if (window.innerWidth < 768) {
            // @ts-ignore
            nav.current.style.display = 'none'
        }
    }

    return (

        <div className={s.headerWrapper} >
            <BiMenu className={s.burger} onClick={openMenu} color={location.pathname === '/home' ? 'white' : 'black'}/>
            <Container className={s.headerContainer} ref={nav} fluid={'md'}>
                <Navbar expand={'md'} className={s.navbar}>
                    <IoMdClose className={s.closeButton} onClick={closeMenu} color='white'/>
                    <Navbar.Brand>
                        <NavLink to={'/home'} onClick={closeMenu}>
                            <Image src={logo} className={s.logo}/>
                        </NavLink>
                    </Navbar.Brand>
                        <Nav className={s.nav}>
                            <NavLink to={'/home'} className={`${s.navItem} ${s.homePageLink}`} onClick={closeMenu}>Главная</NavLink>
                            <NavLink to={'/portfolio'} className={s.navItem} onClick={closeMenu}>Портфолио</NavLink>
                            <NavLink to={'/about'} className={s.navItem} onClick={closeMenu}>Обо мне</NavLink>
                            <HashRouter hashType='noslash'>
                                <NavLink to={'contacts'} className={s.navItem} onClick={closeMenu}>Контакты</NavLink>
                            </HashRouter>
                        </Nav>
                </Navbar>
            </Container>
        </div>
    )
}

export default Header
