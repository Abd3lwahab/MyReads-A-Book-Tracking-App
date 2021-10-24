import React, { Component } from 'react'

export default class Book extends Component {
  state = {
    shelfValue: this.props.bookDetails.shelf ? this.props.bookDetails.shelf : 'none',
  }

  render() {
    const { bookDetails, onChangeShelf } = this.props

    const handleChange = (e) => {
      console.log(this.props.shelfValue)
      this.setState({
        shelfValue: e.target.value,
      })
      onChangeShelf(bookDetails, e.target.value)
    }

    return (
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: `url("${bookDetails.imageLinks.smallThumbnail}")`,
            }}
          />
          <div className="book-shelf-changer">
            <select onChange={handleChange} value={this.state.shelfValue}>
              <option value="move" disabled>
                Move to...
              </option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{bookDetails.title}</div>
        <div className="book-authors">{bookDetails.authors && bookDetails.authors.join(', ')}</div>
      </div>
    )
  }
}
