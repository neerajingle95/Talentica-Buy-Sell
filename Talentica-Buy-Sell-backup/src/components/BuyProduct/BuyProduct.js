import React, { Component } from 'react';
import { data } from '../../constants/Constants.js';

class BuyProduct extends Component {
  constructor(props) {
    super(props);
    this.redirectToBuyersList = this.redirectToBuyersList.bind(this);
    this.handleCardInputsChange = this.handleCardInputsChange.bind(this);
    this.backToBuyersListWithoutBuying = this.backToBuyersListWithoutBuying.bind(this);
    this.state = {
      firstName: '',
      lastName: '',
      cardNumber: '',
      expiryMonth: '',
      expiryYear: '',
      cvv: ''
    }
  }

  redirectToBuyersList = (event) => {
    event.preventDefault();

    // TODO: Add product name in alert according to selected data.id
    alert('Congratulations! You are the owner of ' + data[0].name + '.');
    this.props.history.push('/buyer');
  }

  handleCardInputsChange = (e) => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  backToBuyersListWithoutBuying = (event) => {
    event.preventDefault();
    var returnValue = window.confirm("Are you sure you want to go back to the products list?");
    if ( returnValue === true ) {
      this.props.history.push('/buyer');
    }
  }

  render() {
    const { firstName, lastName, cardNumber, expiryMonth, expiryYear, cvv } = this.state;
    const productName = data[0].name;
    const productPrice = data[0].price;
    const letters = /^[A-Za-z]+$/;
    const sixteenDigitNumber = /^[0-9]{16}$/;
    const twoDigitNumber = /^[0-9]{2}$/;
    const expiryMonthValidation = /0[1-9]|1[0-2]/;
    const threeDigitNumber = /^[0-9]{3}$/;

    return (
      // TODO: Add product name, product price according to selected data.id
      <form className="app-text-align">
        <h1>Buy Product</h1>   
        <p>Product: {productName}</p>
        <p>Price: Rs.{productPrice}</p>
             
        <div>
          <label>First Name (can only contain alphabets): </label>
          <input
            type="text"
            name="firstName"
            id="firstName"
            value={firstName}
            onChange={this.handleCardInputsChange}
          />
          <br /><br />
        </div>

        <div>
          <label>Last Name (can only contain alphabets): </label>
          <input
            type="text"
            name="lastName"
            id="lastName"
            value={lastName}
            onChange={this.handleCardInputsChange}
          />
          <br /><br />
        </div>
        
        <div>
          <label>Card Number (must be of exactly 16 digits): </label>
          <input
            type="text"
            name="cardNumber"
            id="cardNumber"
            maxLength="16"
            value={cardNumber}
            onChange={this.handleCardInputsChange}
          />
          <br /><br />
        </div>

        <div>
          <label>Expiry Date (in MM/YY): </label>
          <input
            type="text"
            name="expiryMonth"
            maxLength="2"
            id="expiryMonth"
            value={expiryMonth}
            onChange={this.handleCardInputsChange}
          />
          <span> / </span>
          <input
            type="text"
            name="expiryYear"
            maxLength="2"
            id="expiryYear"
            value={expiryYear}
            onChange={this.handleCardInputsChange}
          />
          <br /><br />
        </div>

        <div>
          <label>CVV (must be of exactly 3 digits): </label>
          <input
            type="password"
            name="cvv"
            maxLength="3"
            id="cvv"
            value={cvv}
            onChange={this.handleCardInputsChange}
          />
          <br /><br />
        </div>
        
        <button
          onClick={this.backToBuyersListWithoutBuying}
        >
          Back to Buyers' List
        </button>
        &emsp;
        <button
          type="submit"
          onClick={this.redirectToBuyersList}
          disabled={(firstName === '' || !firstName.match(letters)) || 
            (lastName === '' || !lastName.match(letters)) || 
            (cardNumber === '' || !cardNumber.match(sixteenDigitNumber)) || 
            (expiryMonth === '' || !expiryMonth.match(expiryMonthValidation)) || 
            (expiryYear === '' || !expiryYear.match(twoDigitNumber)) || 
            (cvv === '' || !cvv.match(threeDigitNumber))
          }
        >
          Buy
        </button>
      </form>
    );
  }
}

export default BuyProduct;