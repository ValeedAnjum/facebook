import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { logOut } from '../../store/Actions/UserActions'
import Navbar from './Navbar/Navbar';
import UserHome from './UserHome/UserHome';

const Home = ({auth,logOut}) => {
    if(!auth){
        return <Redirect to="/" />
    }
    return (
        <BrowserRouter>
            <Navbar />
            <Switch>
                <Switch>
                    <Route path="/valeed" exact component={UserHome} />
                    {/* <Route path="/valeed/friends" render={() => <h1>friends</h1>} /> */}
                </Switch>
            </Switch>
        </BrowserRouter>
    )
}
const mapState = state => {
    return {
        auth:state.firebase.auth.uid
    }
}
const mapDispatch = dispatch => {
    return {
        logOut:() => dispatch(logOut())
    }
}
export default connect(mapState,mapDispatch)(Home);
