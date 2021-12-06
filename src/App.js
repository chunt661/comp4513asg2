import { Layout } from 'antd';

import {BrowserRouter, Route} from 'react-router-dom';

import Nav from './components/Nav.js';
import Browse from './components/Browse.js';
import Details from './components/Details.js';
import Favourites from './components/Favourites.js';
import FavouritesContextProvider from './components/FavouritesContext.js';

//import 'antd/dist/antd.less';
import './App.less';


const App = () => {
    return (
        <BrowserRouter>
            <Route path='/' exact>
                <Layout>
                    <Nav />
                    <Layout>
                        <FavouritesContextProvider>
                            <Favourites visible={true} />
                            <Browse query='' />
                            </FavouritesContextProvider>
                    </Layout>
                </Layout>
            </Route>
            <Route path='/play/:id'>
                <Layout>
                    <Nav />
                    <Layout>
                        <FavouritesContextProvider>
                            <Favourites visible={false} />
                            <Details />
                        </FavouritesContextProvider>
                    </Layout>
                </Layout>
            </Route>
        </BrowserRouter>
    );
}

export default App;
