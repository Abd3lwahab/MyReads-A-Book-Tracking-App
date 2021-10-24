import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import { Link } from 'react-router-dom'
import BooksShelf from './BooksShelf'

class Home extends React.Component {
  render() {
    const { books, shelves, onChangeShelf } = this.props

    function getShelfBooks(shelf) {
      return books.filter((book) => book.shelf === shelf.key)
    }

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            {shelves.map((shelf) => (
              <BooksShelf
                key={shelf.key}
                shelf={shelf}
                books={getShelfBooks(shelf)}
                onChangeShelf={onChangeShelf}
              />
            ))}
          </div>
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    )
  }
}

export default Home
