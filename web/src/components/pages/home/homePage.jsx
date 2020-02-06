import React, { Component, Fragment } from "react";
import Banners from "../../banners/banner";
import Main from "../../main/main";

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      banners: ""
    };
  }
  async componentDidMount() {
    const response = await fetch("http://localhost:8080/api/banners", {
      headers: {
        "Access-Control-Allow-Origin": "*"
      }
    });
    const banners = await response.json();
    this.setState({ banners: banners });
  }
  render() {
    return (
      <Fragment>
        <Banners banners={this.state.banners} />
        <Main />
      </Fragment>
    );
  }
}
export default HomePage;
