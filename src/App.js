import { BrowserRouter, Route } from 'react-router-dom';
import { Layout } from 'antd';

import Nav from './components/Nav.js';
import Browse from './components/Browse.js';
import Details from './components/Details.js';
import Favourites from './components/Favourites.js';
import FavouritesContextProvider from './components/FavouritesContext.js';

import './App.less';

const App = () => {
    return (
        <FavouritesContextProvider>
            <BrowserRouter>
                <Route path='/' exact>
                    <Layout>
                        <Nav />
                        <Layout>
                            <Favourites visible={true} />
                            <Browse query='' />
                        </Layout>
                    </Layout>
                </Route>
                <Route path='/play/:id'>
                    <Layout>
                        <Nav />
                        <Layout>
                            <Favourites visible={false} />
                            <Details />
                        </Layout>
                    </Layout>
                </Route>
            </BrowserRouter>
        </FavouritesContextProvider>
    );
}

export default App;
