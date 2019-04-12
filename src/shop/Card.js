import React, { Component } from 'react';
import './Home.css';
import { deleteItem } from '../util/APIUtils';
import Alert from 'react-s-alert';

class Card extends Component {
    constructor(props) {
        super(props);
        this.state = {
            disabled : false
        };
        this.deleteSubmit = this.deleteSubmit.bind(this);
    }

    deleteSubmit(event) {
        deleteItem(this.props.item.itemId)
        .then(response => {
            Alert.success("Successfully deleted the Item!");
        }).catch(error => {
            Alert.error((error && error.message) || 'Oops! Something went wrong. Please try again!');
        });
    }

    // Handler for on click
    handleClick = (event) => {
        if (this.state.disabled) {
            return;
        }
        this.setState({disabled: true});
        this.refs.form.onSubmit();
    }

    render() {
        const item = this.props.item;
        var isAdmin = 'ROLE_USER';
        
        if(null != this.props.currentUser){
            const roles = this.props.currentUser.roles;
            for(var i=0; i < roles.length; i++){
                if('ROLE_ADMIN' === roles[i].name)
                    isAdmin = 'ROLE_ADMIN';
            }
        }

        return (
            <div className="login-container">
                <div className="login-content">
                    <form onSubmit={this.deleteSubmit}>
                        <div>
                            <div style={{ fontWeight: 'bold' }}><label>Item &nbsp; </label>{item.itemName}</div>
                            <div className="form-item">
                                <img alt="avatar" style={{ width: '250px' }} src={ require(`../img/content/${item.image}`)} />
                            </div>
                            <div><label>Price &nbsp; </label> {item.price}</div>
                            <br></br>
                            {(isAdmin !== 'ROLE_ADMIN' && item.available === 'Yes') ? 
                                    ( <button type="button" className="btn btn-block btn-primary">Buy</button> )
                                  : ( <div></div> ) 
                            }

                            {(isAdmin !== 'ROLE_ADMIN' && item.available === 'No') ? 
                                    ( <button type="button" className="btn btn-block btn-primary">Out Of Stock</button> )
                                  : ( <div></div> ) 
                            }

                            <br></br>
                            {isAdmin === 'ROLE_ADMIN' ?
                                    ( <button type="submit" className="btn btn-block btn-primary">Delete</button> )
                                  : ( <div></div> ) }

                        </div>
                    </form>   
                </div>
            </div>
        )
    }
}

export default Card; 