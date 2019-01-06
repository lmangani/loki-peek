import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import DateTimeRangePicker from '@wojtekmaj/react-datetimerange-picker';
import proxiedFetch from 'proxied-fetch';

class App extends Component {
  constructor() {
    super();
    this.state = {
      searchText: '',
      searchServer: process.env.API || 'http://127.0.0.1:3100',
      date: [new Date(), new Date()],
      streams: []
    };
  }

  parseQuery(input) {
	  const selectorRegexp = /(?:^|\s){[^{]*}/g 
	  const match = input.match(selectorRegexp);
	  let query = '';
	  let regexp = input;

	  if (match) {
	    query = match[0].trim();
	    regexp = input.replace(selectorRegexp, '').trim();
	  }
	console.log(query,regexp)
    	return { query, regexp };
  }

  onDateChange = date => this.setState({ date })

  onChangeHandle(event) {
    this.setState({searchText: event.target.value});
  }
  onChangeServer(event) {
    this.setState({searchServer: event.target.value});
  }

  onSubmit(event) {
    event.preventDefault();
    var {searchText} = this.state;
    var {searchServer} = this.state;
    var dates = this.state.date;
    var parsed =  this.parseQuery(searchText);
    const time = '&start=' + dates[0].getTime() + '000000' + '&end=' + dates[1].getTime() + '000000';
    const url = `${searchServer}/api/prom/query?query=${parsed.query}&regexp=${parsed.regexp}` + time;
    proxiedFetch(url)
      .then(response => response.json())
      .then(responseJson => this.setState({streams: responseJson.streams}))
      .catch(function(error) { console.log(error) });
  }



  render() {

    const left = {
      width: "20%"
    }
    const right = {
      width: "80%"
    }
    const search = {
      margin: "auto",
      fontSize: "18px",
      width: "100%",
      backgroundColor: "#c9c9c9",
      display: "flex",
      flexDirection: "column"
    }

    const searchGit = {
      paddingTop: "10px",
      display: "flex",
      justifyContent: "center",
      backgroundColor: "#808080",
      padding: "10px"
    }


    return (
    <div className="App">
      <div style={search}>
	<DateTimeRangePicker
          onChange={this.onDateChange}
          value={this.state.date}
        />
        <div>
	    <div className="float" style={left}>
	        <form style={searchGit}>
	          <label htmlFor="searchServer">Server </label>
	          <input
	            type="text"
	            id="searchServer"
	            value={this.state.searchServer}
	            onChange={event => this.onChangeServer(event)}
		    className="searchForm"/>
	        </form>
	    </div>
	    <div className="float" style={right}>
	        <form style={searchGit} onSubmit={event => this.onSubmit(event)}>
	          <label htmlFor="searchTextForm">Search </label>
	          <input
	            type="text"
	            id="searchTextForm"
	            onChange={event => this.onChangeHandle(event)}
	            value={this.state.searchText}
		    className="searchForm"/>
	        </form>
	    </div>
        </div>
        <UsersList streams={this.state.streams}/>
      </div>
    </div>
    );

  }
}

class UsersList extends React.Component {
  get streams() {
    try {
    	return this.props.streams.map(function (stream) {
    	    return stream.entries.map(function (entry) {
    	      	return <User ts={entry.ts} line={entry.line}/>
    	    });
    	});
    } catch(e) {
		return <User ts="" line="No Results"/>
    }
  }

  render() {
    const searchResult = {
      paddingTop: "20px",
      display: "flex",
      justifyContent: "space-between",
      flexDirection: "column",
      backgroundColor: "#CFD2E1"
    }

    return (
      <div style={searchResult}>
        {this.streams}
      </div>
    )
  }
}


class User extends React.Component {
  render() {
    const searchUser = {
      display: 'flex',
      flexDirection: 'row',
      paddingLeft: '2%',
      fontSize: '14px',
      textAlign: 'left',
      maxWidth: '90%'
    }

    const userAvatar = {
      maxWidth: '100px',
      maxHeight: '100px',
      margin: '15px',
      boxShadow: "1px 1px 1px #808080"
    }

    const userName = {
      display: 'flex',
      alignItems: 'center',
      textDecoration: 'none'
    }

    return (
        <div style={searchUser}>
          <p>{this.props.ts}: {this.props.line}</p>
        </div>
    )
  }
}


export default App;