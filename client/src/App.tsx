import React, {Fragment} from 'react';
import './styles/App.scss';
import client from "./graphql/graphql";
import {ApolloProvider} from "@apollo/client";
import Admin from "./components/Admin/Admin";
import Header from "./components/Header/Header";
import {Redirect, Route, Switch} from 'react-router-dom';
import HomePage from "./components/HomePage/HomePage";
import CatalogItem from "./components/CatalogItem/CatalogItem";
import Catalog from "./components/Catalog/Catalog";
import About from "./components/About/About";
import Footer from "./components/Footer/Footer";
import Page404 from "./components/Page404/Page404";
import ModalForm from "./components/Modal/Modal";


function App() {
    return (
        <div className="App">
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
                               render={() => <HomePage/>}
                        />
                        <Route exact path={'/home/:prettyId'}
                               render={() => <CatalogItem fromCatalog={false}/>}
                        />
                        {/*<Route path={'/portfolio'}*/}
                        {/*       render={() => <Catalog/>}*/}
                        {/*/>*/}
                        {/*<Route exact path={'/catalog/:prettyId'}*/}
                        {/*       render={() => <CatalogItem fromCatalog={true}/>}*/}
                        {/*/>*/}
                        {/*<Route exact path={'/about'}*/}
                        {/*       render={() => <About/>}*/}
                        {/*/>*/}
                        {/*<Route component={Page404}/>*/}
                        <ModalForm/>
                        <Footer/>
                    </Fragment>
                </Switch>
            </ApolloProvider>
        </div>
    );
}

export default App;
