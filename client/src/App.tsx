import React, { Fragment, useEffect, useState } from 'react';
import './styles/App.scss';
import client from "./graphql/graphql";
import { ApolloProvider } from '@apollo/client';
import Admin from "./components/Admin/Admin";
import Header from "./components/Header/Header";
import { Redirect, Route, Switch } from 'react-router-dom';
import HomePage from "./components/HomePage/HomePage";
import CatalogItem from "./components/CatalogItem/CatalogItem";
import Catalog from "./components/Catalog/Catalog";
import About from "./components/About/About";
import Footer from "./components/Footer/Footer";
import Page404 from "./components/Page404/Page404";
import ModalForm from "./components/Modal/Modal";
import Contacts from './components/Footer/Contacts/Contacts';
import 'normalize.css';


function App() {
    const [isOpen, setIsOpen] = useState(false)
    const [productsUrls, setProductsUrls] = useState<Array<string>>([])

    const appRef = React.createRef<HTMLDivElement>()

    // useEffect(() => {
    //     if (isOpen && appRef.current) {
    //         appRef.current.style.overflow = 'hidden'
    //         console.log(appRef.current.style.overflow)
    //     }
    // }, [isOpen])

    return (
        <div className="App" ref={appRef}>
            <ApolloProvider client={client}>
                <Switch>
                    <Route path={'/admin'}
                           render={() => <Admin/>}
                    />
                    <Fragment>
                        <Header/>
                        <Route exact path={'/'}>
                            <Redirect to={'/home'}/>
                        </Route>
                        <Route path={'/home'}
                               render={() => <HomePage setModalOpen={setIsOpen} setProductsUrls={setProductsUrls} productUrls={productsUrls}/>}
                        />
                        <Route exact path={'/home/:prettyId'}
                               render={() => <CatalogItem fromCatalog={false} products={productsUrls}/>}
                        />
                        <Route path={'/portfolio'}
                               render={() => <Catalog setModalOpen={setIsOpen} setProductsUrls={setProductsUrls}/>}
                        />
                        <Route exact path={'/portfolio/:prettyId'}
                               render={() => <CatalogItem fromCatalog={true} products={productsUrls}/>}
                        />
                        <Route exact path={'/about'}
                               render={() => <About/>}
                        />
                        <Contacts/>
                        <ModalForm isOpen={isOpen} setIsOpen={setIsOpen}/>
                        <Footer/>
                    </Fragment>
                    <Route component={Page404}/>
                </Switch>
            </ApolloProvider>
        </div>
    );
}

export default App;
