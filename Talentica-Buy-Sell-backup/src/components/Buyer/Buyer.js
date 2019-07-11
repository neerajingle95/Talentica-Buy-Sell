import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ReactTable from "react-table";
import 'react-table/react-table.css';
import { data } from '../../constants/Constants.js';

class Buyer extends Component {
  constructor(props) {
    super(props);
    this.buyProduct = this.buyProduct.bind(this);
    this.deleteProduct = this.deleteProduct.bind(this);
    this.goToSellerPage = this.goToSellerPage.bind(this);
  }

  buyProduct = (buttonId) => {
    console.log('Row clicked:', buttonId);
    this.props.history.push('/buyer/buyProduct');
  }

  deleteProduct = (deleteProductId) => {
    var returnValue = window.confirm("Are you sure you want to delete this product?");
    if ( returnValue === true ) {
      console.log('Product id to be deleted:', deleteProductId);

      // TODO: Delete selected product
    }
  }

  goToSellerPage = () => {
    this.props.history.push('/seller');
  }

  render() {
    const columns = [
      {
        Header: 'Name',
        accessor: 'name'
      }, 
      {
        Header: 'Price (in Rs.)',
        accessor: 'price'
      }, 
      {
        Header: 'Type',
        accessor: 'type'
      }, 
      {
        Header: 'Category',
        accessor: 'category'
      },
      {
        Header: '',
        accessor: 'id',
        Cell: (props) => (
          <div>
            <button 
              id={props.value}
              onClick={() => this.buyProduct(props.value)}
            >
              Buy
            </button>
            <span>&emsp;</span>

            <button
              id={props.value}
              onClick={() => this.deleteProduct(props.value)}
            >
              x
            </button>
          </div>
        )
      }
    ];

    return (
      <div className="app-text-align">
        <h1>Talentica Buy/Sell</h1>
        <h2>Buyer</h2>
        <ReactTable
          data={data}
          columns={columns}
          pageSize={(data.length > 10) ? ((data.length > 17) ? 17 : data.length) : 10}
        />
        <br />
        <button
          type="submit"
          onClick={this.goToSellerPage}
        >
          Go to Seller's Page
        </button>
        <div>
          <h3>
            <Link to="/">Logout</Link>
          </h3>
        </div>
      </div>
    );
  }
}

export default Buyer;