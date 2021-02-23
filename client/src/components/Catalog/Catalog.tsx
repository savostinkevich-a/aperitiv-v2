import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import s from './Catalog.module.scss';
import FormHP from '../HomePage/FormHP/FormHP';
import { BsArrowLeft } from 'react-icons/bs';
import { BsArrowRight } from 'react-icons/bs';
import Loader from '../Loader/Loader';
import { NavLink } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';
import ErrorPage from '../Loader/ErrorPage';

const crypto = require('crypto')

const GET_PRODUCTS = gql`
    query GetProducts($limit: Int!, $page: Int!, $filters: FilterProductsInput){
        getProducts(limit: $limit, page: $page, filters: $filters) {
            products {
                title
                price
                description
                _id
                prettyId
                imageUrls
            }
            total
        }
    }
`;



type PropsType = {
    setProductsUrls(urls: Array<string>): void
    setModalOpen(isOpen: boolean): void
}

const Catalog = (props: PropsType) => {
    const [page, setPage] = useState(1);


    useEffect(() => {
        window.scrollTo(0, 0);
        refetch();
    }, [page]);

    const { data, loading, error, refetch } = useQuery(GET_PRODUCTS, {
        variables: {
            page: page,
            limit: 10,
            filters: {},
        },
        onCompleted: ((data) => {
            const productsUrls = data.getProducts.products.map((item: any) => {
                return item.prettyId;
            });
            console.log(data.getProducts.total)
            props.setProductsUrls(productsUrls);
        })
    });

    if (loading) {
        return <Loader />;
    }

    if (error) {
        return <ErrorPage />;
    }

    let smallItems: Array<any> = [];
    let items: Array<any> = [];

    if (window.innerWidth < 768) {
        items = data.getProducts.products.map((item: any) => {
            return (
                <Col className={s.contentWrapper} key={item._id}>
                    <NavLink to={`/client/${item.prettyId}`}>
                        <div className={s.contentItem__large}>
                            <div className={s.imageContainer__large}>
                                <img src={item.imageUrls[0]} className={s.image__large} />
                            </div>
                            <div className={s.itemTitle}>
                                {item.title}
                            </div>
                        </div>
                    </NavLink>
                </Col>
            );
        });
    } else {
        const setSmallItems = (item: any) => {
            if (smallItems.length === 3) {
                console.log(item);
                smallItems.push(
                    <Col className={s.contentWrapper__small} key={item._id}>
                        <NavLink to={`/client/${item.prettyId}`}>
                            <div className={s.contentItem__small}>
                                <div className={s.imageContainer__small}>
                                    <img src={item.imageUrls[0]} className={s.image__small} />
                                </div>
                                <div className={s.itemTitle}>
                                    {item.title}
                                </div>
                            </div>
                        </NavLink>
                    </Col>,
                );
                items.push(
                    <Col className={s.contentWrapper} key={crypto.randomBytes(20).toString('hex')}>
                        <Row sm={2} className={s.contentContainer__small}>
                            {smallItems}
                        </Row>
                    </Col>,
                );
                return smallItems = [];
            } else {
                if (data.getProducts.products.indexOf(item) === data.getProducts.products.length - 1) {
                    smallItems.push(
                        <Col className={s.contentWrapper__small} key={item._id}>
                            <NavLink to={`/client/${item.prettyId}`}>
                                <div className={s.contentItem__small}>
                                    <div className={s.imageContainer__small}>
                                        <img src={item.imageUrls[0]} className={s.image__small} />
                                    </div>
                                    <div className={s.itemTitle}>
                                        {item.title}
                                    </div>
                                </div>
                            </NavLink>
                        </Col>,
                    );
                    if (smallItems.length < 4) {
                        for (let i = smallItems.length; i < 4; i++) {
                            smallItems.push(
                                <Col className={s.contentWrapper__small} key={crypto.randomBytes(20).toString('hex')}>
                                    <div className={s.contentItem__small}>
                                        <div className={s.imageContainer__small__add}>
                                        </div>
                                    </div>
                                </Col>,
                            );
                        }

                    }
                    items.push(
                        <Col className={s.contentWrapper} key={crypto.randomBytes(20).toString('hex')}>
                            <Row sm={2} className={s.contentContainer__small}>
                                {smallItems}
                            </Row>
                        </Col>,
                    );
                } else
                    return (
                        smallItems.push(
                            <Col className={s.contentWrapper__small} key={item._id}>
                                <NavLink to={`/catalog/${item.prettyId}`}>
                                    <div className={s.contentItem__small}>
                                        <div className={s.imageContainer__small}>
                                            <img src={item.imageUrls[0]} className={s.image__small} />
                                        </div>
                                        <div className={s.itemTitle}>
                                            {item.title}
                                        </div>
                                    </div>
                                </NavLink>
                            </Col>,
                        ));
            }
        };
        const setBigItems = (item: any) => {
            if (data.getProducts.products.indexOf(item) % 10 === 0 || data.getProducts.products.indexOf(item) % 10 === 9) {
                return (
                    items.push(
                        <Col className={s.contentWrapper} key={item._id}>
                            <NavLink to={`/catalog/${item.prettyId}`}>
                                <div className={s.contentItem__large}>
                                    <div className={s.imageContainer__large}>
                                        <img src={item.imageUrls[0]} className={s.image__large} />
                                    </div>
                                    <div className={s.itemTitle}>
                                        {item.title}
                                    </div>
                                </div>
                            </NavLink>
                        </Col>,
                    ));
            } else {
                return setSmallItems(item);
            }
        };
        data.getProducts.products.forEach((item: any) => {
            setBigItems(item);
        });
        if (items.length % 2 === 1) {
            items.push(
                <Col className={s.contentWrapper} key={crypto.randomBytes(20).toString('hex')}>
                    <div className={s.contentItem__large}>
                        <div className={s.imageContainer__large__add}>
                        </div>
                    </div>
                </Col>,
            );
        }
    }

    const pages: Array<number> = [];
    const pagesCount = Math.ceil(data.getProducts.total / 10);
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);

    }

    return (
        <>
            <Container className={s.catalogWrapper} fluid={'md'}>
                <Row className={s.titleContainer}>
                    <h2 className={s.title}>Каталог</h2>
                </Row>
                <Row xs={2} className={s.contentContainer}>
                    {items}
                </Row>
                <Row className={s.pagination}>
                    <Button className={s.paginationButton} onClick={() => setPage(1)} disabled={page === 1}>
                        <BsArrowLeft />
                    </Button>
                    {pages.map(i => {
                        return <Button key={i} className={s.paginationButton} onClick={() => setPage(i)}
                                       disabled={page === i}>{i}</Button>;
                    })}
                    <Button className={s.paginationButton} onClick={() => setPage(pagesCount)}
                            disabled={page === pagesCount}>
                        <BsArrowRight />
                    </Button>

                </Row>
            </Container>
            <FormHP openModal={props.setModalOpen} />
        </>
    );
};

export default Catalog;