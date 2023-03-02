import {BsSearch} from 'react-icons/bs'
import './index.css'

const FiltersGroup = props => {
  const {
    categoryOptions,
    ratingsList,
    clickCategory,
    clickRating,
    categoryValue,
    ratingValue,
    searchInput,
    clearFilter,
  } = props

  const Category = prop => {
    const {eachOption} = prop
    const {categoryId, name} = eachOption
    const categoryStyle = categoryId === categoryValue ? 'color' : null
    const onCategory = () => {
      clickCategory(categoryId)
    }
    return (
      <li>
        <p
          type="button"
          className={`Button ${categoryStyle}`}
          onClick={onCategory}
        >
          {name}
        </p>
      </li>
    )
  }

  const Rating = prop => {
    const {eachList} = prop
    const {ratingId, imageUrl} = eachList
    const ratingStyle = ratingId === ratingValue ? 'color' : null
    const onRating = () => {
      clickRating(ratingId)
    }
    return (
      <li className="flex-rating">
        <button type="button" className="Button" onClick={onRating}>
          <img
            src={imageUrl}
            alt={`rating ${ratingId}`}
            className="rating-image"
          />
        </button>
        <p className={`${ratingStyle}`}>& up</p>
      </li>
    )
  }

  const searchResult = event => {
    if (event.key === 'Enter') {
      searchInput(event.target.value)
    }
  }
  const onClear = () => {
    clearFilter()
  }
  return (
    <div className="filters-group-container">
      <div>
        <BsSearch className="search-icon" />
        <input
          type="search"
          placeholder="Search"
          className="input-field"
          onKeyDown={searchResult}
        />
      </div>
      <div>
        <h1 className="category-heading">Category</h1>
        <ul className="category-list">
          {categoryOptions.map(eachOption => (
            <Category eachOption={eachOption} key={eachOption.categoryId} />
          ))}
        </ul>
      </div>
      <div>
        <h1 className="category-heading">Rating</h1>
        <ul>
          {ratingsList.map(eachList => (
            <Rating eachList={eachList} key={eachList.ratingId} />
          ))}
        </ul>
      </div>
      <div className="clear-button">
        <button type="button" className="clear-filter" onClick={onClear}>
          Clear Filters
        </button>
      </div>
    </div>
  )
}

export default FiltersGroup
