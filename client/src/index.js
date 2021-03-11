import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import SnackbarProvider from 'react-simple-snackbar'

import { Provider } from './context'
import withLayout from './components/Layout'
import GlobalStyles from './components/GlobalStyles'
import Main from './containers/main'
import Login from './containers/login'
import CreateBlog from './containers/blogs/create'
import SingleBlog from './containers/blogs/single'
import EditBlog from './containers/blogs/edit'
import MyBlogs from './containers/blogs'

const App = () => {
    return (
        <Provider>
            <SnackbarProvider>
                <Router>
                    <Switch>
                        <Route path="/" exact component={(props) => withLayout(props, Main)} />
                        <Route
                            path="/blogs/create"
                            exact
                            component={(props) => withLayout(props, CreateBlog)}
                        />
                        <Route
                            path="/blogs/:id"
                            exact
                            component={(props) => withLayout(props, SingleBlog)}
                        />
                        <Route
                            path="/blogs/:id/edit"
                            exact
                            component={(props) => withLayout(props, EditBlog)}
                        />
                        <Route
                            path="/blogs"
                            exact
                            component={(props) => withLayout(props, MyBlogs)}
                        />
                        <Route
                            path="/login"
                            exact
                            component={(props) => withLayout(props, Login)}
                        />
                    </Switch>
                    <GlobalStyles />
                </Router>
            </SnackbarProvider>
        </Provider>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))
