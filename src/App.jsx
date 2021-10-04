import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Home from './components/Home'
import Pokemon from './components/Pokemon'
import Navbar from './components/Navbar'
import Search from './components/Search'
import "./styles/global.css"

const App = () => {
    return (
        <BrowserRouter>
        <Navbar />
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/pokemon/search" component={Search} />
                <Route path="/pokemon/:id" component={Pokemon} />
            </Switch>

        </BrowserRouter>
    )
}

export default App
