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

    const burger = <svg className={s.burger} onClick={openMenu} width="35" height="15" viewBox="0 0 35 15" xmlns="http://www.w3.org/2000/svg">
        <rect width="35" height="2" fill={location.pathname === '/home' ? '#fff' : '#3E3C3C' }/>
        <rect y="14" width="35" height="2" fill={location.pathname === '/home' ? '#fff' : '#3E3C3C' }/>
        <rect y="7" width="35" height="2" fill={location.pathname === '/home' ? '#fff' : '#3E3C3C' }/>
    </svg>

    return (
        <div className={s.headerWrapper} >
            {burger}
            <Container className={s.headerContainer} ref={nav} fluid={'md'}>
                <Navbar expand={'md'} className={s.navbar}>
                    <svg className={s.closeButton} onClick={closeMenu} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18.672 0L10 8.67608L1.32796 0L0 1.31988L8.67654 10.0002L0 18.6807L1.32796 20L10 11.3242L18.672 20L20 18.6807L11.3235 10.0002L20 1.31988L18.672 0Z" fill="#F8F7F5"/>
                    </svg>
                    <Navbar.Brand>
                        <NavLink to={'/home'} onClick={closeMenu} className={s.logoLink}>
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
