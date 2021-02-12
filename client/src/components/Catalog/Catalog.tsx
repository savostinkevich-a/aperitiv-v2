import React, {useEffect, useState} from "react";
import {Button, Col, Container, Row} from "react-bootstrap";
import s from "./Catalog.module.scss";
import FormHP from "../HomePage/FormHP/FormHP";
import ContactsHP from "../HomePage/ContactsHP/ContactsHP";
import {BsArrowLeft} from 'react-icons/bs'
import {BsArrowRight} from 'react-icons/bs'
import {connect} from "react-redux";
import {RootState} from "../../redux/redux-store";
import {getProductsThunk} from "../../redux/portfolio/thunks";
import {Product} from "../../redux/portfolio/types";
import Loader from "../Loader/Loader";
import {NavLink} from "react-router-dom";
import {setModalOpen} from "../../redux/connects/actions";

function ScrollToTopOnMount() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return null;
}

type PropsType = {
    products: Array<Product>
    getProductsThunk(limit: number, page: number, filters: {}): any
    setModalOpen(isOpen: boolean): void
}

const Catalog = (props: PropsType) => {
    const [page, setPage] = useState(1)

    useEffect(() => {
        props.getProductsThunk(10, 1, {})
    }, [props.products])

    if (props.products.length === 0) {
        return <Loader/>
    }

    let smallItems: Array<any> = []
    let items: Array<any> = []

    const setSmallItems = (item: any) => {
        if (smallItems.length === 3) {
            smallItems.push(
                <NavLink to={`/portfolio/${item.prettyId}`}>
                    <Col className={s.contentWrapperSmall}>
                        <div className={s.contentItemSmall}>
                            <div className={s.imageContainerSmall}>
                                <img src={item.imageUrls[0]} className={s.image}/>
                            </div>
                            <div className={s.itemTitle}>
                                {item.title}
                            </div>
                        </div>
                    </Col>
                </NavLink>
            )
            items.push(
                <Col sm={6} className={s.contentWrapper}>
                    <Row sm={2} className={s.row}>
                        {smallItems}
                    </Row>
                </Col>
            )
            return smallItems = []
        } else {
            return smallItems.push(
                <NavLink to={`/portfolio/${item.prettyId}`}>
                <Col className={s.contentWrapperSmall}>
                    <div className={s.contentItemSmall}>
                        <div className={s.imageContainerSmall}>
                            <img src={item.imageUrls[0]} className={s.image}/>
                        </div>
                        <div className={s.itemTitle}>
                            {item.title}
                        </div>
                    </div>
                </Col>
                </NavLink>
            )
        }
    }

    const setBigItems = (item: any) => {
        if (props.products.indexOf(item) % 10 === 0 || props.products.indexOf(item) % 10 === 9) {
            items.push(
                <NavLink to={`/portfolio/${item.prettyId}`}>
                <Col sm={6} className={s.contentWrapper}>
                    <div className={s.contentItem}>
                        <div className={s.imageContainerLarge}>
                            <img src={item.imageUrls[0]} className={s.image}/>
                        </div>
                        <div className={s.itemTitle}>
                            {item.title}
                        </div>
                    </div>
                </Col>
                </NavLink>
            )
        } else {
            setSmallItems(item)
        }
    }

    props.products.forEach(item => {
        setBigItems(item)
    })

    return (
        <>
            <ScrollToTopOnMount/>
            <Container className={s.catalogWrapper}>
                <Row className={s.titleContainer}>
                    <h2 className={s.title}>Каталог</h2>
                </Row>
                <Row className={s.contentContainer}>
                    {items}
                </Row>
                <Row className={s.pagination}>
                    <Button className={s.paginationButton} onClick={() => setPage(1)} disabled={page === 1}>
                        <BsArrowLeft/>
                    </Button>
                    <Button className={s.paginationButton} onClick={() => setPage(1)} disabled={page === 1}>1</Button>
                    <Button className={s.paginationButton} onClick={() => setPage(2)} disabled={page === 2}>2</Button>
                    <Button className={s.paginationButton} onClick={() => setPage(3)} disabled={page === 3}>3</Button>
                    <Button className={s.paginationButton} onClick={() => setPage(3)} disabled={page === 3}>
                        <BsArrowRight/>
                    </Button>

                </Row>
            </Container>
            <FormHP openModal={props.setModalOpen}/>
            <ContactsHP/>
        </>
    )
}

let mapDispatchToProps = (state: RootState) => {
    return {
        products: state.portfolio.products
    }
}

export default connect(mapDispatchToProps, {getProductsThunk, setModalOpen})(Catalog)