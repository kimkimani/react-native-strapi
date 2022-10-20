import React from 'react';
import Context from './context';
export default class GlobalState extends React.Component{
    state = {
        userLoggedIn: {}
    }

    setUserLoggedIn = (user) => {
        this.setState({
            userLoggedIn : user
        })
    }

    userLogOut = () => {
        this.setState({
            userLoggedIn: {}
        })
    }

    render(){
        return (
            <Context.Provider
            value={{
                userLoggedIn:this.state.userLoggedIn,
                setUserLoggedIn: this.setUserLoggedIn,
                userLogOut: this.userLogOut
            }}
            >
                {this.props.children}
            </Context.Provider>
        )
    }
}