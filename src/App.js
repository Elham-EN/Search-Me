import React, { Component } from "react";
import { CardList } from "./components/card-list/card-list";
import { SearchBox } from "./components/search-box/search-box";
import "./App.css";

class App extends Component {
  constructor() {
    super(); //help us 'this' by calling React.Component's constructor()
    this.state = {
      //initial state
      monsters: [],
      searchField: "",
    };
    //Make sure the context is defined inside the contructor
    //this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    //called after the component is rendered
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json()) //in json format
      .then((data) => this.setState({ monsters: data }));
  }

  //arrow func bind this to the context it was defined
  onSearchChange = (event) => {
    this.setState({
      searchField: event.target.value,
    });
  };

  //method that actually outputs the HTML to the DOM
  render() {
    const { monsters, searchField } = this.state;
    const filteredMonsters = monsters.filter((monster) => {
      return monster.name.toLowerCase().includes(searchField.toLowerCase());
    });

    return (
      <div className="App">
        <h1>kittens</h1>
        <SearchBox
          placeholder="search kitten"
          handleChange={this.onSearchChange}
        />
        <CardList monsters={filteredMonsters} />
      </div>
    );
  }
}

export default App;
