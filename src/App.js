import React from 'react'
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom'

import * as BooksAPI from './BooksAPI'
import Home from './Home'
import Search from './Search'

import './App.css'
class BooksApp extends React.Component {
  state = {
    books: [],
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  shelves = [
    { key: 'currentlyReading', name: 'Currently Reading' },
    { key: 'wantToRead', name: 'Want to Read' },
    { key: 'read', name: 'Read' },
  ]

  onChangeShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then((books) => {
      if (book.shelf === 'none' && shelf !== 'none') {
        this.setState((state) => {
          const newBooks = state.books.concat(book)
          return { books: newBooks }
        })
      }

      const updatedBooks = this.state.books.map((c) => {
        if (c.id === book.id) {
          c.shelf = shelf
        }
        return c
      })

      this.setState({
        books: updatedBooks,
      })

      if (shelf === 'none') {
        this.setState((state) => {
          const newBooks = state.books.filter((deleteBook) => deleteBook.id !== book.id)
          return { books: newBooks }
        })
      }
    })
  }

  render() {
    return (
      <Router>
        <div className="app">
          <Switch>
            <Route path="/" exact>
              <Home
                books={this.state.books}
                shelves={this.shelves}
                onChangeShelf={this.onChangeShelf}
              />
            </Route>
            <Route path="/search">
              <Search books={this.state.books} onChangeShelf={this.onChangeShelf} />
            </Route>
          </Switch>
        </div>
      </Router>
    )
  }
}

export default BooksApp
