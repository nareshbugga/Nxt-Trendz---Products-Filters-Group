/* eslint-disable no-unused-vars */
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import FiltersGroup from '../FiltersGroup'
import ProductCard from '../ProductCard'
import ProductsHeader from '../ProductsHeader'

import './index.css'

const categoryOptions = [
  {
    name: 'Clothing',
    categoryId: '1',
  },
  {
    name: 'Electronics',
    categoryId: '2',
  },
  {
    name: 'Appliances',
    categoryId: '3',
  },
  {
    name: 'Grocery',
    categoryId: '4',
  },
  {
    name: 'Toys',
    categoryId: '5',
  },
]

const sortbyOptions = [
  {
    optionId: 'PRICE_HIGH',
    displayText: 'Price (High-Low)',
  },
  {
    optionId: 'PRICE_LOW',
    displayText: 'Price (Low-High)',
  },
]

const ratingsList = [
  {
    ratingId: '4',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-four-stars-img.png',
  },
  {
    ratingId: '3',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-three-stars-img.png',
  },
  {
    ratingId: '2',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-two-stars-img.png',
  },
  {
    ratingId: '1',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-one-star-img.png',
  },
]
const ViewsList = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class AllProductsSection extends Component {
  state = {
    productsList: [],
    listView: '',
    activeOptionId: sortbyOptions[0].optionId,
    category: '',
    titleSearch: '',
    rating: '',
  }

  componentDidMount() {
    this.getProducts()
  }

  getProducts = async () => {
    this.setState({listView: ViewsList.inProgress})
    const jwtToken = Cookies.get('jwt_token')

    // TODO: Update the code to get products with filters applied

    const {activeOptionId, category, titleSearch, rating} = this.state
    const apiUrl = `https://apis.ccbp.in/products?sort_by=${activeOptionId}&category=${category}&title_search=${titleSearch}&rating=${rating}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.products.map(product => ({
        title: product.title,
        brand: product.brand,
        price: product.price,
        id: product.id,
        imageUrl: product.image_url,
        rating: product.rating,
      }))
      this.setState({
        productsList: updatedData,
        listView: ViewsList.success,
      })
    } else {
      this.setState({
        listView: ViewsList.failure,
      })
    }
  }

  changeSortby = activeOptionId => {
    this.setState({activeOptionId}, this.getProducts)
  }

  clickCategory = name => {
    this.setState({category: name}, this.getProducts)
  }

  clickRating = id => {
    this.setState({rating: id}, this.getProducts)
  }

  clearFilter = () => {
    this.setState(
      {
        productsList: [],
        listView: '',
        activeOptionId: sortbyOptions[0].optionId,
        category: '',
        titleSearch: '',
        rating: '',
      },
      this.getProducts,
    )
  }

  searchInput = value => {
    this.setState({titleSearch: value}, this.getProducts)
  }

  renderProductsList = () => {
    const {productsList, activeOptionId} = this.state

    // TODO: Add No Products View
    if (productsList.length === 0) {
      return (
        <div className="no-product-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-no-products-view.png"
            alt=" no products"
            className="no-product-image"
          />
          <h1 className="no-product-heading">No Products Found</h1>
          <p className="filter-line">
            We could not find any products. Try other filters.
          </p>
        </div>
      )
    }
    return (
      <div className="all-products-container">
        <ProductsHeader
          activeOptionId={activeOptionId}
          sortbyOptions={sortbyOptions}
          changeSortby={this.changeSortby}
        />
        <ul className="products-list">
          {productsList.map(product => (
            <ProductCard productData={product} key={product.id} />
          ))}
        </ul>
      </div>
    )
  }

  renderLoader = () => (
    <div className="products-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  // TODO: Add failure view

  renderFailureView = () => (
    <div className="no-product-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-products-error-view.png"
        alt="products failure"
        className="no-product-image"
      />
      <h1 className="no-product-heading">Oops! Something Went Wrong</h1>
      <p className="filter-line">
        We are having some trouble processing your request.Please try again.
      </p>
    </div>
  )

  ResultView = () => {
    const {listView} = this.state
    switch (listView) {
      case ViewsList.success:
        return this.renderProductsList()
      case ViewsList.failure:
        return this.renderFailureView()
      case ViewsList.inProgress:
        return this.renderLoader()
      default:
        return null
    }
  }

  render() {
    const {category, rating} = this.state

    return (
      <div className="all-products-section">
        {/* TODO: Update the below element */}
        <FiltersGroup
          categoryOptions={categoryOptions}
          ratingsList={ratingsList}
          clickCategory={this.clickCategory}
          clickRating={this.clickRating}
          clearFilter={this.clearFilter}
          searchInput={this.searchInput}
          categoryValue={category}
          ratingValue={rating}
        />

        {this.ResultView()}
      </div>
    )
  }
}

export default AllProductsSection
