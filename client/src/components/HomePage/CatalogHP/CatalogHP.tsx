import React, {useEffect, useState} from "react";
import {Col, Container, Image, Row} from "react-bootstrap";
import s from "./CatalogHP.module.scss";
import {NavLink} from "react-router-dom";
import {Product} from "../../../redux/portfolio/types";
import CatalogItem from "../../CatalogItem/CatalogItem";

type PropsType = {
    products: Array<Product>
}

const CatalogHP = (props: PropsType) => {

    const items = props.products.map(item => {
        return (
            <NavLink to={`/home/${item.prettyId}`} >
                <Col className={s.itemContainer} key={item._id}>
                    <div className={s.imageContainer} >
                        <Image src={item.imageUrls[0]} className={s.image}/>
                    </div>
                    <div className={s.itemTitle}>{item.title}</div>
                </Col>
            </NavLink>
        )
    })

    return (
        <Container className={s.catalogWrapper}>
            <Row className={s.titleContainer}>
                <h2 className={s.title}>Каталог</h2>
            </Row>
            <Row xs={1} sm={3} md={2} lg={2} xl={4} className={s.itemsWrapper}>
                {items}
            </Row>
            <Row className={s.linkContainer}>
                <NavLink to={'/portfolio'} className={s.link}>Перейти в каталог</NavLink>
            </Row>
        </Container>
    )
}

export default CatalogHP