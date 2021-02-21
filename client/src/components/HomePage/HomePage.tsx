import React, { useEffect } from 'react';
import TitleHP from './TitleHP/TitleHP';
import AboutHP from './AboutHP/AboutHP';
import CatalogHP from './CatalogHP/CatalogHP';
import FormHP from './FormHP/FormHP';
import Loader from '../Loader/Loader';
import { gql, useQuery } from '@apollo/client';
import ErrorPage from '../Loader/ErrorPage';
import { doc } from 'prettier';

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
  productUrls: Array<string>
}

const HomePage = (props: PropsType) => {

  const { data, loading, error } = useQuery(GET_PRODUCTS, {
    variables: {
      page: 1,
      limit: 4,
      filters: {},
    },
    onCompleted: ((data) => {
      const productsUrls = data.getProducts.products.map((item: any) => {
        return item.prettyId;
      });
      props.setProductsUrls(productsUrls);
    })
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [data]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorPage />;
  }

  return (
    <>
      <TitleHP openModal={props.setModalOpen} />
      <AboutHP />
      <CatalogHP products={data.getProducts.products} />
      <FormHP openModal={props.setModalOpen} />
    </>
  );
};


export default HomePage;