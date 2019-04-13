import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './AppHeader.css';

class AppHeader extends Component {
    render() {
        var isAdmin = 'ROLE_USER';
        
        if(null != this.props.currentUser){
            const roles = this.props.currentUser.roles;
            for(var i=0; i < roles.length; i++){
                if('ROLE_ADMIN' === roles[i].name)
                    isAdmin = 'ROLE_ADMIN';
            }
        }

        return (
            <header className="app-header">
                <div className="container">
                <img alt="ElShoppe" style={{ width: '65px' }} src={ require('../img/elshoppe.png') } />
                    <div className="app-options">
                        <nav className="app-nav">
                                { this.props.authenticated? (
                                    <ul>
                                        <li>
                                            {isAdmin === 'ROLE_ADMIN' ? (
                                                    <div>
                                                    <label>[[&nbsp;&nbsp;Welcome, {this.props.currentUser.name}&nbsp;&nbsp;(Admin)&nbsp;&nbsp;]]</label>
                                                    <NavLink to="/manage">Manage</NavLink>
                                                    <NavLink to="/browse">Browse</NavLink>
                                                    </div>
                                                ): (
                                                    <div></div>
                                                )   
                                            }

                                            {isAdmin !== 'ROLE_ADMIN' ? (
                                                    <div>
                                                    <label>[[&nbsp;&nbsp;Welcome, {this.props.currentUser.name}&nbsp;&nbsp;(User)&nbsp;&nbsp;]]</label>
                                                    <NavLink to="/browse">Browse</NavLink>
                                                    </div>
                                                ): (
                                                    <div></div>
                                                )   
                                            }
                                        </li>
                                        <li>
                                            <a onClick={this.props.onLogout}>Logout</a>
                                        </li>
                                    </ul>
                                ): (
                                    <ul>
                                        <li>
                                            <NavLink to="/login">Login</NavLink>        
                                        </li>
                                        <li>
                                            <NavLink to="/signup">Signup</NavLink>        
                                        </li>
                                    </ul>
                                )}
                        </nav>
                    </div>
                </div>
            </header>
        )
    }
}

export default AppHeader;