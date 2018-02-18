import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import Header from './../components/Header';
import PostsPage from './../components/PostsPage';
import Comment from './../components/Comments';

const AppRouter = () => (
    <BrowserRouter>
        <div>
            <Header />
            <div className='container'>
                <Switch>
                    <Route path="/" component={PostsPage} exact={true} />
                    <Route path="/comments" component={Comment} />
                </Switch>
            </div>
        </div>
    </BrowserRouter>
);

export default AppRouter;