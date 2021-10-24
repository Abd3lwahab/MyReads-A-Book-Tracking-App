import React, { Component } from 'react'
import BooksGrid from './BooksGrid'

export default class BooksShelf extends Component {
  render() {
    const { books, shelf, onChangeShelf } = this.props
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{shelf.name}</h2>
        <div className="bookshelf-books">
          <BooksGrid books={books} onChangeShelf={onChangeShelf} />
        </div>
      </div>
    )
  }
}
