import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import s from './Catalog.module.scss';
import FormHP from '../HomePage/FormHP/FormHP';
import ContactsHP from '../Footer/Contacts/Contacts';
import { BsArrowLeft } from 'react-icons/bs';
import { BsArrowRight } from 'react-icons/bs';
import { connect } from 'react-redux';
import { RootState } from '../../redux/redux-store';
import { getProductsThunk } from '../../redux/portfolio/thunks';
import { Product } from '../../redux/portfolio/types';
import Loader from '../Loader/Loader';
import { NavLink } from 'react-router-dom';
import { setModalOpen } from '../../redux/connects/actions';

function ScrollToTopOnMount() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return null;
}

type PropsType = {
  products: Array<Product>
  total: number
  getProductsThunk(limit: number, page: number, filters: {}): any
  setModalOpen(isOpen: boolean): void
}

const Catalog = (props: PropsType) => {
  const [page, setPage] = useState(1);


  useEffect(() => {
    props.getProductsThunk(10, page, {});
  }, [props.products, page]);

  if (props.products.length === 0) {
    return <Loader />;
  }

  let smallItems: Array<any> = [];
  let items: Array<any> = [];

  if (window.innerWidth < 768) {
    items = props.products.map(item => {
      return (
        <Col className={s.contentWrapper}>
          <NavLink to={`/portfolio/${item.prettyId}`}>
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
      )
    })
  } else {
    const setSmallItems = (item: any) => {
      if (smallItems.length === 3) {
        console.log(item);
        smallItems.push(
          <Col className={s.contentWrapper__small}>
            <NavLink to={`/portfolio/${item.prettyId}`}>
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
          <Col className={s.contentWrapper}>
            <Row sm={2} className={s.contentContainer__small}>
              {smallItems}
            </Row>
          </Col>,
        );
        return smallItems = [];
      } else {
        if (props.products.indexOf(item) === props.products.length - 1) {
          smallItems.push(
            <Col className={s.contentWrapper__small}>
              <NavLink to={`/portfolio/${item.prettyId}`}>
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
            for (let i = smallItems.length ; i < 4; i++) {
              smallItems.push(
                <Col className={s.contentWrapper__small}>
                  <div className={s.contentItem__small}>
                    <div className={s.imageContainer__small__add}>
                    </div>
                  </div>
                </Col>,
              );
            }

          }
          items.push(
            <Col className={s.contentWrapper}>
              <Row sm={2} className={s.contentContainer__small}>
                {smallItems}
              </Row>
            </Col>,
          );
        } else
          return (
            smallItems.push(
              <Col className={s.contentWrapper__small}>
                <NavLink to={`/portfolio/${item.prettyId}`}>
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
      if (props.products.indexOf(item) % 10 === 0 || props.products.indexOf(item) % 10 === 9) {
        return (
          items.push(
            <Col className={s.contentWrapper}>
              <NavLink to={`/portfolio/${item.prettyId}`}>
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
    props.products.forEach(item => {
      setBigItems(item);
    });
    if (items.length % 2 === 1) {
      items.push(
        <Col className={s.contentWrapper}>
          <div className={s.contentItem__large}>
            <div className={s.imageContainer__large__add}>
            </div>
          </div>
        </Col>,
      );
    }

  }

  const pages: Array<number> = []
  const pagesCount = Math.ceil(props.total / 10)
  for (let  i = 1; i <= pagesCount; i++) {
    pages.push(i)

  }
  console.log(pagesCount)

  return (
    <>
      <ScrollToTopOnMount />
      <Container className={s.catalogWrapper} fluid={'md'}>
        <Row className={s.titleContainer}>
          <h2 className={s.title}>Портфолио</h2>
        </Row>
        <Row xs={2} className={s.contentContainer}>
          {items}
        </Row>
        <Row className={s.pagination}>
          <Button className={s.paginationButton} onClick={() => setPage(1)} disabled={page === 1}>
            <BsArrowLeft />
          </Button>
          {pages.map(i => {
            return <Button className={s.paginationButton} onClick={() => setPage(i)} disabled={page === i}>{i}</Button>
          })}
          <Button className={s.paginationButton} onClick={() => setPage(pagesCount)} disabled={page === pagesCount}>
            <BsArrowRight />
          </Button>

        </Row>
      </Container>
      <FormHP openModal={props.setModalOpen} />
    </>
  );
};

let mapDispatchToProps = (state: RootState) => {
  return {
    products: state.portfolio.products,
    total: state.portfolio.total
  };
};

export default connect(mapDispatchToProps, { getProductsThunk, setModalOpen })(Catalog);