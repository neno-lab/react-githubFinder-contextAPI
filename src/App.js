import React, { Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import User from './components/users/User';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';
import About from './components/pages/About';
import axios from 'axios';
import './App.css';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      users: [],
      user: {},
      repos: [],
      loading: false,
      alert: null,
    };
  }

  searchUsers = async (text) => {
    const REACT_APP_GITHUB_CLIENT_ID = 'd718b743274c01537665';
    const REACT_APP_GITHUB_CLIENT_SECRET =
      'd715f5288eb9c12c12d27321d4464bcdc6ace9b4';

    this.setState({
      loading: true,
    });

    const res = await axios.get(
      `https://api.github.com/search/users?q=${text}&client_id=${REACT_APP_GITHUB_CLIENT_ID}&client_secret=${REACT_APP_GITHUB_CLIENT_SECRET}`
    );

    this.setState({ users: res.data.items, loading: false });
  };

  getUser = async (username) => {
    const REACT_APP_GITHUB_CLIENT_ID = 'd718b743274c01537665';
    const REACT_APP_GITHUB_CLIENT_SECRET =
      'd715f5288eb9c12c12d27321d4464bcdc6ace9b4';

    this.setState({
      loading: true,
    });

    const res = await axios.get(
      `https://api.github.com/users/${username}?client_id=${REACT_APP_GITHUB_CLIENT_ID}&client_secret=${REACT_APP_GITHUB_CLIENT_SECRET}`
    );

    this.setState({ user: res.data, loading: false });
  };

  getUserRepos = async (username) => {
    const REACT_APP_GITHUB_CLIENT_ID = 'd718b743274c01537665';
    const REACT_APP_GITHUB_CLIENT_SECRET =
      'd715f5288eb9c12c12d27321d4464bcdc6ace9b4';

    this.setState({
      loading: true,
    });

    const res = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${REACT_APP_GITHUB_CLIENT_ID}&client_secret=${REACT_APP_GITHUB_CLIENT_SECRET}`
    );

    this.setState({ repos: res.data, loading: false });
  };

  clearUsers = () => {
    this.setState({ users: [], loading: false });
  };

  setAlert = (msg, type) => {
    this.setState({
      alert: { msg: msg, type: type },
    });

    setTimeout(() => {
      this.setState({ alert: null });
    }, 5000);
  };

  render() {
    const { loading, user, users, repos, alert } = this.state;
    return (
      <Router>
        <div className='App'>
          <Navbar title='Github Finder' icon='fab fa-github' />
          <div className='container'>
            <Alert alert={alert} />
            <Switch>
              <Route
                exact
                path='/'
                render={(props) => (
                  <Fragment>
                    <Search
                      searchUsers={this.searchUsers}
                      clearUsers={this.clearUsers}
                      showClear={users.length > 0 ? true : false}
                      setAlert={this.setAlert}
                    />
                    <Users loading={loading} users={users} />
                  </Fragment>
                )}
              />
              <Route exact path='/about' component={About} />
              <Route
                exact
                path='/user/:login'
                render={(props) => (
                  <User
                    {...props}
                    getUser={this.getUser}
                    getUserRepos={this.getUserRepos}
                    user={user}
                    repos={repos}
                    loading={loading}
                  />
                )}
              />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;

// async componentDidMount() {
//   const REACT_APP_GITHUB_CLIENT_ID = 'd718b743274c01537665';
//   const REACT_APP_GITHUB_CLIENT_SECRET =
//     'd715f5288eb9c12c12d27321d4464bcdc6ace9b4';

//   this.setState({
//     loading: true,
//   });

//   const res = await axios.get(
//     `https://api.github.com/users?client_id=${REACT_APP_GITHUB_CLIENT_ID}&client_secret=${REACT_APP_GITHUB_CLIENT_SECRET}`
//   );

//   this.setState({ users: res.data, loading: false });
// }
