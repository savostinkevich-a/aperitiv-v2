import React, { useEffect, useState } from 'react';
import { Col, Container, Image, Row } from 'react-bootstrap';
import s from './CatalogHP.module.scss';
import { NavLink } from 'react-router-dom';
import { Product } from '../../../redux/portfolio/types';

type PropsType = {
    products: Array<Product>
}

const CatalogHP = (props: PropsType) => {

    const items = props.products.map(item => {
        return (
            <Col className={s.itemWrapper} key={item._id}>
                <NavLink to={`/home/${item.prettyId}`} >
                    <div className={s.itemContainer}>
                        <div className={s.imageContainer}>
                            <Image src={item.imageUrls[0]} className={s.image} />
                        </div>
                        <div className={s.itemTitle}>
                            {item.title}
                        </div>
                    </div>
                </NavLink>
            </Col>

        );
    });

    return (
        <Container className={s.catalogWrapper} fluid={'md'}>
            <Row className={s.titleContainer}>
                <h2 className={s.title}>Каталог</h2>
            </Row>
            <Row xs={2} sm={2} md={3} lg={4} xl={4} className={s.itemsWrapper}>
                {items}
            </Row>
            <Row className={s.linkContainer}>
                <NavLink to={'/catalog'} className={s.link}>Перейти в каталог</NavLink>
            </Row>
        </Container>
    );
};

export default CatalogHP;