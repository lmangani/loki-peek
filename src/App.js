import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

//import Autocomplete from  'react-autocomplete';
//import { getStocks, matchStocks } from './labels';

import DateTimeRangePicker from '@wojtekmaj/react-datetimerange-picker';
import proxiedFetch from 'proxied-fetch';

import Highlight from 'react-highlighter';

var urlParams = new URLSearchParams(window.location.search);

class App extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      searchText: urlParams.has('query') ? urlParams.get('query') : '',
      searchRegex: urlParams.has('regex') ? urlParams.get('regex') : '',
      searchServer: process.env.API || urlParams.has('api') ? urlParams.get('api') : 'http://127.0.0.1:3100',
      searchLimit: urlParams.has('limit') ? urlParams.get('limit') : '',
      date: [ new Date(), new Date()],
      streams: [],
      labels: [],
      values: []
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
	// console.log(query,regexp)
    	return { query, regexp };
  }


  getLabels() {
    var {searchServer} = this.state;
    const url = `${searchServer}/api/prom/label`;
    proxiedFetch(url)
      .then(response => response.json())
      .then(responseJson => this.setState({labels: responseJson.values}))
      .catch(function(error) { console.log(error) });
  }

  getLabelValues(label) {
    var {searchServer} = this.state;
    const url = `${searchServer}/api/prom/label/${label}/values`
    proxiedFetch(url)
      .then(response => response.json())
      .then(responseJson => this.setState({values: responseJson.values}))
      .catch(function(error) { console.log(error) });
  }

  onDateChange = date => { 
	this.setState({ date }); this.onSubmit() 
	urlParams.set('start', this.state.date[0].getTime() + '000000');
	urlParams.set('end',   this.state.date[1].getTime() + '000000');
  }

  onChangeHandle(event) {
    this.setState({searchText: event.target.value});
	urlParams.set('query', event.target.value);
  }
  onChangeServer(event) {
    event.preventDefault();
    this.getLabels()
    this.setState({searchServer: event.target.value});
	urlParams.set('api', event.target.value);
  }

  onSubmit(event) {
    if(event) event.preventDefault();
    var {searchText} = this.state;
    var {searchServer} = this.state;
    var {searchLimit} = this.state;
    var dates = this.state.date;
    var parsed =  this.parseQuery(searchText);
    if (parsed.regexp) this.setState({searchRegex: parsed.regexp});
    const time = '&start=' + dates[0].getTime() + '000000' + '&end=' + dates[1].getTime() + '000000';
    const url = `${searchServer}/api/prom/query?query=${parsed.query}&regexp=${parsed.regexp}&limit=${searchLimit}` + time;
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

    const logo = {
      float: "left",
      position: "absolute",
      marginLeft: "10px",
      fontWeight: "bold"
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

    let isLoading = this.loading ? "Loading...." : ""

    return (
    <div className="App">

      <div style={search}>
        <div style={logo}>Loki-Peek</div>
	<DateTimeRangePicker
          onChange={this.onDateChange}
	  onSubmit={event => this.onSubmit(event)}
          value={this.state.date}
        />
        <div>
	    <div className="float" style={left}>
	        <form style={searchGit} onSubmit={event => true }>
	          <label htmlFor="searchServer">Server </label>
	          <input
	            type="text"
	            id="searchServer"
	            value={this.state.searchServer}
	            onChange={event => this.onChangeServer(event)}
		    className="searchForm formField"/>
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
		    className="searchForm formField"/>
		    <button>Search</button>
	        </form>
	    </div>
        </div>
        <UsersList streams={this.state.streams} regex={this.state.searchRegex}/>
      </div>
    </div>
    );

  }
}

class UsersList extends React.Component {
  get streams() {
    try {
        const regex = this.props.regex;
    	return this.props.streams.map(function (stream) {
    	    return stream.entries.map(function (entry) {
    	      	return <User ts={entry.ts} line={entry.line} regex={regex}/>
    	    });
    	});
    } catch(e) {
		return <User ts="" line="No Results" regex={this.props.regex}/>
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

      <div class="logs-rows">
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

      <div class="logs-row">
        <div class="logs-row__level logs-row__level--info"></div>
        <div class="logs-row__time" title="{this.props.ts}">{this.props.ts}</div>
        <div class="logs-row__message"><span><span class=""> <Highlight search={this.props.regex}>{this.props.line}</Highlight></span></span>
        </div>
      </div>

    )
  }
}


export default App;
