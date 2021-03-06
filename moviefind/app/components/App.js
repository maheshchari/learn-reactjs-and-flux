var React = require('react');
var AppActions = require('../actions/AppActions');
var AppStore = require('../stores/AppStore');
var SearchForm = require('./SearchForm');
var MovieResults = require('./MovieResults');

function getAppState() {
  return {
    movies: AppStore.getMovieResults()
  };
}

var App = React.createClass({
  getInitialState: function () {
    return getAppState();
  },

  componentDidMount: function() {
    AppStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    AppStore.removeChangeListener(this._onChange);
  },

  render: function () {
    var movieResults = '';
    if (this.state.movies !== undefined && this.state.movies.length > 0) {
      movieResults = <MovieResults movies={this.state.movies} />;
    }
    return(
      <div>
        <SearchForm />
        {movieResults}
      </div>
    );
  },

  _onChange: function() {
    this.setState(getAppState());
  }
});

module.exports = App;