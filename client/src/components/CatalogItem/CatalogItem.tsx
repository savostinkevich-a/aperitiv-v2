import React, {useEffect} from "react";
import {NavLink, useParams} from 'react-router-dom'
import {Product} from "../../redux/portfolio/types";
import {Button, Carousel, Container} from "react-bootstrap";
import s from './CatalogItem.module.scss'
import {GrClose} from 'react-icons/gr'
import {connect} from "react-redux";
import {RootState} from "../../redux/redux-store";
import {getProductThunk} from "../../redux/portfolio/thunks";
import Loader from "../Loader/Loader";

type PropsType = {
    getProductThunk(prettyId: string): void
    product: Product | undefined
    fromCatalog: boolean
}

interface ParamTypes {
    prettyId: string
}

const CatalogItem = (props: PropsType) => {

    let {prettyId} = useParams<ParamTypes>();

    let product: Product | undefined = props.product

    useEffect(() => {
        props.getProductThunk(prettyId)
    }, [props.product])

    if (!product) {
        return <Loader/>
    }

    const items = product.imageUrls.map(item => {
        return (
            <Carousel.Item>
                <div className={s.carouselItem}>
                    <img
                        className={` ${s.image}`}
                        src={item}
                        alt="First slide"
                    />
                </div>
            </Carousel.Item>
        )
    })

    return (
        <div className={s.itemWrapper}>
            <Container className={s.itemContainer}>
                <Carousel className={s.carouselContainer} slide={false} interval={null}>
                    {items}
                </Carousel>
                <div className={s.sideContainer}>
                    {props.fromCatalog
                        ? <NavLink to={'/portfolio'}>
                            <GrClose className={s.closeButton}/>
                        </NavLink>
                        : <NavLink to={'/home'}>
                            <GrClose className={s.closeButton}/>
                        </NavLink>
                    }

                    <div className={s.price}>
                        {product.price} BYN
                    </div>
                    <div className={s.title}>
                        {product.title}
                    </div>
                    <div className={s.description}>
                        {product.description}
                    </div>
                </div>
            </Container>
        </div>

    )
}

let mapDispatchToProps = (state: RootState) => {
    return {
        product: state.portfolio.currentProduct
    }
}

export default connect(mapDispatchToProps, {getProductThunk})(CatalogItem)