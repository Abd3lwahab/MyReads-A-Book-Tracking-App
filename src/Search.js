import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import * as BooksAPI from './BooksAPI'
import BooksGrid from './BooksGrid'

export default class Search extends Component {
  state = {
    searchResult: [],
    searchValue: '',
  }

  handleChange = (e) => {
    const value = e.target.value

    this.setState({
      searchValue: value,
    })

    if (value.length > 0) {
      BooksAPI.search(value)
        .then((books) => {
          if (books.error) {
            this.setState({ searchResult: [] })
          } else {
            this.setState({ searchResult: books })
          }
        })
        .catch(this.setState({ searchResult: [] }))
    } else {
      this.setState({ searchResult: [] })
    }
  }

  render() {
    const { books, onChangeShelf } = this.props
    this.state.searchResult.forEach(function(searchedBook) {
      books.forEach(function(book) {
        if (book.id === searchedBook.id) {
          searchedBook.shelf = book.shelf
        }
      })
      if (!searchedBook.shelf) {
        searchedBook.shelf = 'none'
      }
    })

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              onChange={this.handleChange}
            />
          </div>
        </div>
        <div className="search-books-results">
          {<BooksGrid books={this.state.searchResult} onChangeShelf={onChangeShelf} />}
        </div>
      </div>
    )
  }
}
