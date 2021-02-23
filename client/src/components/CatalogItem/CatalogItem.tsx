import React, { useEffect, useState } from 'react';
import { NavLink, useLocation, useParams } from 'react-router-dom';
import { Product } from '../../redux/portfolio/types';
import { Carousel, Container, Modal } from 'react-bootstrap';
import s from './CatalogItem.module.scss';
import { GrClose } from 'react-icons/gr';
import { Redirect } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';
import Loader from '../Loader/Loader';

const GET_PRODUCT = gql`
    query GetProduct($prettyId: String!) {
        getProductByPrettyId(prettyId: $prettyId) {
            title
            description
            prettyId
            price
            imageUrls
        }
    }
`;

type PropsType = {
    products: Array<string>
    fromCatalog: boolean
}

interface ParamTypes {
    prettyId: string
}

const CatalogItem = (props: PropsType) => {
    const [imageActiveIndex, setImageActiveIndex] = useState(0);
    const [nextId, setNextId] = useState('');
    let { prettyId } = useParams<ParamTypes>();

    const isOpen = true;

    const { data, error, loading, refetch } = useQuery(GET_PRODUCT, { variables: { prettyId }, errorPolicy: 'all' });

    useEffect(() => {
        setNextId('');
        refetch().then(() => {
        });
        setImageActiveIndex(0)
    }, [prettyId]);

    let location = useLocation();

    const path = location.pathname.split('/')[1];

    if (error) {
        return <Redirect to={'/home'} />;
    }

    if (loading || !data) {
        return <Loader />;
    }

    let product: Product = data.getProductByPrettyId;

    if (nextId !== '') {
        return <Redirect to={`/${path}/${nextId}`} />;
    }

    const currentIndex = props.products.findIndex(item => item === prettyId);

    const nextHandler = () => {
        if (currentIndex + 1 < props.products.length) {
            return setNextId(props.products[currentIndex + 1]);
        }
    };

    const prevHandler = () => {
        if (currentIndex > 0) {
            return setNextId(props.products[currentIndex - 1]);
        }
    };

    const nextIcon = <svg onClick={nextHandler} className={`${s.controls} ${s.control_next}`} width="60" height="60"
                          style={currentIndex + 1 === props.products.length ? {opacity: 0.2} : {}}
                          viewBox="0 0 80 80"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg">
        <path d="M40 70.8326C57.0266 70.8326 70.8333 57.0293 70.8333 39.9993C70.8333 22.9726 57.0266 9.16598 40 9.16598C22.9733 9.16598 9.16663 22.9726 9.16663 39.9993C9.16663 57.0293 22.9733 70.8326 40 70.8326Z" />
        <path d="M35.1923 51.57L46.8123 40L35.1923 28.43" />
    </svg>;
    const prevIcon = <svg onClick={prevHandler} className={`${s.controls} ${s.control_prev}`} width="60" height="60"
                          style={currentIndex === 0 ? {opacity: 0.2} : {}}
                          viewBox="0 0 80 80"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg">
        <path d="M40 9.16736C22.9734 9.16736 9.1667 22.9707 9.1667 40.0007C9.1667 57.0274 22.9734 70.834 40 70.834C57.0267 70.834 70.8334 57.0274 70.8334 40.0007C70.8334 22.9707 57.0267 9.16736 40 9.16736Z" />
        <path d="M44.8077 28.43L33.1877 40L44.8077 51.57" />
    </svg>;

    const images = product.imageUrls.map(image => {
        return (
            <Carousel.Item key={image}>
                <div className={s.imageContainer}>
                    <img src={image} className={s.image} alt={product.title} />
                </div>
            </Carousel.Item>
        );
    });

    const bullets: Array<any> = [];
    for (let i = 0; i < product.imageUrls.length; i++) {
        bullets.push(
            <div key={i} onClick={() => setImageActiveIndex(i)} className={s.bullet}>
                <svg className={imageActiveIndex === i ? s.bulletSvg__active : s.bulletSvg} viewBox="0 0 14 14"
                     width="14" height="14" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="7" cy="7" r="5" />
                </svg>
            </div>,
        );
    }

    const handleSelect = (selectedIndex: any, e: any) => {
        setImageActiveIndex(selectedIndex);
    };

    return (
        <Modal
            show={isOpen}
            animation={false}
            contentClassName={s.itemWrapper}
        >
            <NavLink to={`/${path}`} className={s.backdrop}>

            </NavLink>
            <Container className={s.itemContainer} fluid={true}>
                {prevIcon}
                <div className={s.carouselContainer}>
                    <NavLink to={`/${path}`}>
                        <GrClose className={s.closeButton} />
                    </NavLink>
                    <div className={s.imageContainer}>
                        <Carousel onSelect={handleSelect} controls={false}
                                  activeIndex={imageActiveIndex} indicators={false}>
                            {images}
                        </Carousel>
                        <div className={s.bulletsContainer}>{bullets}</div>
                    </div>


                    <div className={s.sideContainer}>

                        <div className={s.price}>
                            {product.price} BYN
                        </div>
                        <div className={s.title}>
                            {product.title}
                        </div>
                        <div className={s.description}>
                            Классический кружевной бюстгальтер с косточками. Нежная цветовая гамма для самого
                            интимного
                            образа.
                            Состав: 89% Полиамид, 11% Эластан
                        </div>
                    </div>
                </div>
                {nextIcon}
            </Container>
        </Modal>
    );
};

// let mapDispatchToProps = (state: RootState) => {
//   return {
//     products: state.portfolio.products,
//   };
// };
//
// export default connect(mapDispatchToProps, { getProductThunk })(CatalogItem);

export default CatalogItem;