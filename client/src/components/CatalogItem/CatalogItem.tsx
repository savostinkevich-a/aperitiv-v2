import React, { useEffect, useState } from 'react';
import { NavLink, useLocation, useParams } from 'react-router-dom';
import { Product } from '../../redux/portfolio/types';
import {Container } from 'react-bootstrap';
import s from './CatalogItem.module.scss';
import { GrClose } from 'react-icons/gr';
import { connect } from 'react-redux';
import { RootState } from '../../redux/redux-store';
import { getProductThunk } from '../../redux/portfolio/thunks';
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
`

type PropsType = {
  getProductThunk(prettyId: string): void
  products: Array<Product>
  fromCatalog: boolean
}

interface ParamTypes {
  prettyId: string
}

const CatalogItem = (props: PropsType) => {
  const [imageIndex, setImageIndex] = useState(0);
  const [nextId, setNextId] = useState('');
  let { prettyId } = useParams<ParamTypes>();

  const {data, error, loading, refetch} = useQuery(GET_PRODUCT, {variables: {prettyId}, errorPolicy:"all"})

  useEffect(() => {
    setNextId('');
    refetch()
  }, [prettyId]);

  let location = useLocation()
  console.log(location)

  const path = location.pathname.split('/')[1]
  console.log(path)

  if (error) {
    return <Redirect to={'/home'}/>
  }

  if (loading || !data) {
    return <Loader/>
  }

  let product: Product = data.getProductByPrettyId;

  if (nextId !== '') {
    return <Redirect to={`/${path}/${nextId}`} />;
  }



  const nextHandler = () => {
    if (imageIndex >= product.imageUrls.length - 1) {
      const currentIndex = props.products.findIndex(item => item.prettyId === prettyId);
      if (currentIndex + 1 < props.products.length) {
        return setNextId(props.products[currentIndex + 1].prettyId);
      }
    } else {
      setImageIndex(imageIndex => imageIndex + 1);
    }
  };

  const prevHandler = () => {
    if (imageIndex <= 0) {
      const currentIndex = props.products.findIndex(item => item.prettyId === prettyId);
      if (currentIndex > 0) {
        return setNextId(props.products[currentIndex - 1].prettyId);
      }
    } else {
      setImageIndex(imageIndex => imageIndex - 1);
    }
  };

  const nextIcon = <svg onClick={nextHandler} className={`${s.controls} ${s.control_next}`} width="60" height="60" viewBox="0 0 80 80"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd"
          d="M40 70.8326C57.0266 70.8326 70.8333 57.0293 70.8333 39.9993C70.8333 22.9726 57.0266 9.16598 40 9.16598C22.9733 9.16598 9.16663 22.9726 9.16663 39.9993C9.16663 57.0293 22.9733 70.8326 40 70.8326Z"
          stroke="#D4D4D4" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M35.1923 51.57L46.8123 40L35.1923 28.43" stroke="#A3A2A0" stroke-width="1.5" stroke-linecap="round"
          stroke-linejoin="round" />
  </svg>;
  const prevIcon = <svg onClick={prevHandler} className={`${s.controls} ${s.control_prev}`} width="60" height="60" viewBox="0 0 80 80"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd"
          d="M40 9.16736C22.9734 9.16736 9.1667 22.9707 9.1667 40.0007C9.1667 57.0274 22.9734 70.834 40 70.834C57.0267 70.834 70.8334 57.0274 70.8334 40.0007C70.8334 22.9707 57.0267 9.16736 40 9.16736Z"
          stroke="#D4D4D4" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M44.8077 28.43L33.1877 40L44.8077 51.57" stroke="#A3A2A0" stroke-width="1.5" stroke-linecap="round"
          stroke-linejoin="round" />
  </svg>;


  return (
    <div className={s.itemWrapper} >
      <NavLink to={`/${path}`} className={s.backdrop}>

      </NavLink>
      <Container className={s.itemContainer} fluid={true}>
        {prevIcon}
        <div  className={s.carouselContainer}>
             <NavLink to={`/${path}`}>
              <GrClose className={s.closeButton} />
            </NavLink>
          <div className={s.imageContainer}>
            <img src={product.imageUrls[imageIndex]} className={s.image} />
          </div>
          <div className={s.sideContainer}>

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
        </div>
        {nextIcon}
      </Container>
    </div>
  );
};

let mapDispatchToProps = (state: RootState) => {
  return {
    products: state.portfolio.products,
  };
};

export default connect(mapDispatchToProps, { getProductThunk })(CatalogItem);