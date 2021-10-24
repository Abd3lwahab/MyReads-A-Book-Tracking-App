import React, { Component } from 'react'
import Book from './Book'

export default class BooksGrid extends Component {
  render() {
    return (
      <ol className="books-grid">
        {this.props.books.map((book) => (
          <li key={book.id}>
            <Book bookDetails={book} onChangeShelf={this.props.onChangeShelf} />
          </li>
        ))}
      </ol>
    )
  }
}
