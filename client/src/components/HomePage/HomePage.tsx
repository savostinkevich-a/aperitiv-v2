import React, {useEffect, useState} from "react";
import TitleHP from "./TitleHP/TitleHP";
import AboutHP from "./AboutHP/AboutHP";
import CatalogHP from "./CatalogHP/CatalogHP";
import FormHP from "./FormHP/FormHP";
import ContactsHP from "./ContactsHP/ContactsHP";
import Modal from "../Modal/Modal";
import {connect} from "react-redux";
import {RootState} from "../../redux/redux-store";
import {setModalOpen} from "../../redux/connects/actions";
import {Product} from "../../redux/portfolio/types";
import {getProductsThunk} from "../../redux/portfolio/thunks";
import Loader from "../Loader/Loader";

type PropsType = {
    setModalOpen(isOpen: boolean): void
    getProductsThunk(limit: number, page: number, filters: {}): any
    products: Array<Product>
}

const HomePage = (props: PropsType) => {
    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(4)


    useEffect(() => {
        props.getProductsThunk(limit,page,{})
    }, [props.products])

    if (props.products.length === 0) {
        return <Loader/>
    }

    function ScrollToTopOnMount() {
        useEffect(() => {
            window.scrollTo(0, 0);
        }, []);

        return null;
    }

    return (
        <>
            <ScrollToTopOnMount/>
            <TitleHP openModal={props.setModalOpen} />
            <AboutHP/>
            <CatalogHP products={props.products}/>
            <FormHP openModal={props.setModalOpen}/>
            <ContactsHP/>
        </>
    )
}

let mapStateToProps = ( state: RootState ) => {
    return {
        products: state.portfolio.products
    }
}

export default connect(mapStateToProps, {setModalOpen, getProductsThunk})(HomePage)