import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      text: '',
    };
  }

  static propTypes = {
    searchUsers: PropTypes.func.isRequired,
    clearUsers: PropTypes.func.isRequired,
    showClear: PropTypes.bool.isRequired,
    setAlert: PropTypes.func.isRequired,
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.text === '') {
      this.props.setAlert('Please enter something', 'light');
    } else {
      this.props.searchUsers(this.state.text);
      this.setState({ text: '' });
    }
  };

  handleChange = (e) => {
    //umjesto da pisemo u setStateu text: e.target.value, pisat cemo  [e.target.name]: e.target.value ako bismo mozda jos nadodavali inputa npr. za email, lozinku...
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { text } = this.state;
    return (
      <div>
        <form onSubmit={this.handleSubmit} className='form'>
          <input
            type='text'
            name='text'
            placeholder='Search Users...'
            value={text}
            onChange={this.handleChange}
          />
          <input
            type='submit'
            value='Search'
            className='btn btn-dark btn-block'
          />
        </form>

        {this.props.showClear && (
          <button
            className='btn btn-light btn-block'
            onClick={this.props.clearUsers}
          >
            Clear
          </button>
        )}
      </div>
    );
  }
}

export default Search;
