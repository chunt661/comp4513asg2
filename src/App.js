import { useState, useEffect } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Layout } from 'antd';

import Nav from './components/Nav.js';
import Browse from './components/Browse.js';
import Details from './components/Details.js';
import Favourites from './components/Favourites.js';
import FavouritesContextProvider from './components/FavouritesContext.js';

import './App.less';

const App = () => {
    const [ user, setUser ] = useState(null);
    
    useEffect(() => {
        const getUserData = async () => {
            try {
                // First attempt to get the ID of the logged-in user
                fetch('/auth')
                    .then(response => response.json())
                    .then(data => {
                        // If successful, fetch the user's info
                        if (data.userID) {
                            fetch('/api/user/' + data.userID)
                                .then(response => response.json())
                                .then(userData => setUser(userData[0]));
                        }
                    });
            } catch (err) {
                console.error(err);
            }
        };
        
        if (!user) {
            getUserData();
        }
    }, []);
    
    return (
        <FavouritesContextProvider>
            <BrowserRouter>
                <Route path='/' exact>
                    <Layout>
                        <Nav user={user} />
                        <Layout>
                            <Favourites visible={true} />
                            <Browse query='' />
                        </Layout>
                    </Layout>
                </Route>
                <Route path='/play/:id'>
                    <Layout>
                        <Nav user={user} />
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
