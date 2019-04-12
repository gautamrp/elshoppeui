import React, { Component } from 'react';
import './Home.css';
import { addItem } from '../util/APIUtils';
import Alert from 'react-s-alert';


class Manage extends Component {
    render() {
        return (
            <div className="signup-container">
                <div className="signup-content">
                      <ManageForm {...this.props} />
                </div>
            </div>
        );
    }
}

class ManageForm extends Component {
    constructor(props) {
        super(props);
        this.state = {  
            itemname: '',
            price: '',
            available: 'Yes',
            image: '',
            file: null
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const inputName = target.name;        
        const inputValue = target.value;

        this.setState({
            [inputName] : inputValue,
            file: ((inputName === 'image') ? URL.createObjectURL(event.target.files[0]) : '')
        });        
    }

    handleSubmit(event) {
        event.preventDefault();   

        const addItemRequest = Object.assign({}, this.state);

        addItem(addItemRequest)
        .then(response => {
            Alert.success("Successfully created the Item!");
            this.props.history.push("/browse");
        }).catch(error => {
            Alert.error((error && error.message) || 'Oops! Something went wrong. Please try again!');            
        });
    }

    render() {
        const isFileSelected = this.state.file;
        let showImage;
        if (isFileSelected === null || isFileSelected === '') {
            showImage = '';
          } else {
            showImage = <img alt="file" src={this.state.file}/>;
          }

        return (
            <form onSubmit={this.handleSubmit}>
                <div className="form-item">
                    <input type="text" name="itemname" 
                        className="form-control" placeholder="Item Name"
                        value={this.state.itemname} onChange={this.handleInputChange} required/>
                </div>
                <div className="form-item">
                    <input type="text" name="price" pattern="^\d+(\.\d{1,2})?$"
                        className="form-control" placeholder="Price"
                        value={this.state.price} onChange={this.handleInputChange} required/>
                </div>
                <div className="form-item">
                    <label>Available</label>
                    <select className="form-control" placeholder="available" name="available" 
                        value={this.state.available} onChange={this.handleInputChange}>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                    </select>
                </div>
                <div className="form-item">
                    <input type="file" name="image"
                        className="form-control" placeholder="image"
                        value={this.state.image} onChange={this.handleInputChange} required/>
                        {showImage}
                </div>
                <div className="form-item">
                    <button type="submit" className="btn btn-block btn-primary" >Create Item</button>
                </div>
            </form>                    

        );
    }
}

export default Manage;