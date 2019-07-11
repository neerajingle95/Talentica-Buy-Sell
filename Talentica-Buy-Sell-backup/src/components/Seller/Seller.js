import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { data } from '../../constants/Constants.js';

class Seller extends Component {
  constructor(props) {
    super(props);
    this.handleSellerInputsChange = this.handleSellerInputsChange.bind(this);
    this.addProductToBuyersList = this.addProductToBuyersList.bind(this);
    this.backToBuyersListWithoutSelling = this.backToBuyersListWithoutSelling.bind(this);
    this.state = {
      productName: '',
      productPrice: '',
      productType: '',
      productCategory: ''
    }
  }

  handleSellerInputsChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  addProductToBuyersList = (e) => {
    e.preventDefault();

    var newProduct = {
      name: this.state.productName,
      price: this.state.productPrice,
      type: this.state.productType,
      category: this.state.productCategory
    }
    console.log(newProduct);
    // TODO: Add new product to buyers list without losing it on reload
    data.push(newProduct);

    this.setState({
      productName: '',
      productPrice: '',
      productType: '',
      productCategory: ''
    })
    this.props.history.push("/buyer");
  }

  backToBuyersListWithoutSelling = (event) => {
    event.preventDefault();
    var returnValue = window.confirm("Are you sure you want to go back to the products list?");
    if ( returnValue === true ) {
      this.props.history.push('/buyer');
    }
  }

  render() {
    const { productName, productPrice, productType, productCategory } = this.state;

    return (
      <form className="app-text-align">
        <h1>Talentica Buy/Sell</h1>
        <h2>Seller</h2>

        <div>
          <label>Product Name: </label>
          <input
            name="productName"
            id="productName" 
            type="text"
            placeholder="Enter product name"
            onChange={this.handleSellerInputsChange}
            value={productName}
          >
          </input>
        </div>
        <br />

        <div>
          <label>Product Price (in Rs.): </label>
          <input
            name="productPrice"
            id="productPrice" 
            type="number"
            placeholder="Enter product price"
            onChange={this.handleSellerInputsChange}
            value={productPrice}
          >
          </input>
        </div>
        <br />

        <div>
          <label>Product Type: </label>
          <select
            required
            name="productType"
            id="productType" 
            onChange={this.handleSellerInputsChange}
            value={productType}
          >
            <option value="" hidden>Select product type</option>
            <option value="Vehicle">Vehicle</option>
            <option value="Crockery">Crockery</option>
            <option value="Stationery">Stationery</option>
            <option value="Clothes">Clothes</option>
            <option value="Electronics">Electronics</option>
          </select>
        </div>
        <br />

        <div>
          <label>Product Category: </label>
          <select
            required
            name="productCategory"
            id="productCategory"
            onChange={this.handleSellerInputsChange}
            value={productCategory}
          >
            <option value="" hidden>Select product category</option>
            <option value="Brand New">Brand new</option>
            <option value="Second Hand">Second hand</option>
          </select>
        </div>
        <br />

        <div>
          <button
            onClick={this.backToBuyersListWithoutSelling}
          >
            Back to Buyers' List
          </button>
          &nbsp;
          <button
            type="submit"
            onClick={this.addProductToBuyersList}
            disabled={productName === '' || productPrice === '' || productType === '' || 
              productCategory === ''
            }
          >
            Add to Buyers' List
          </button>
        </div>

        <div>
          <h3>
            <Link to="/">Logout</Link>
          </h3>
        </div>
      </form>
    );
  }
}

export default Seller;