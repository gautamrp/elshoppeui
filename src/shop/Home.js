import React, { Component } from 'react';
import './Home.css';

class Home extends Component {
    render() {
        return (
            <div className="home-container">
                <img alt='ElShoppe' src={ require('../img/elshoppe.png') } />
            </div>
        )
    }
}

export default Home; 