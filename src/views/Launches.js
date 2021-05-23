import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import Header from "../components/Header/Header";
import LaunchDetail from "../components/LaunchDetail/LaunchDetail";

class LaunchesView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      launches: [],
      loading: false,
      sort: "Mission",
      filterTerm: new RegExp("", "i"),
    };
  }

  componentDidMount() {
    this.setState({ loading: true });
    var api = axios.create();
    api
      .get("https://api.spacexdata.com/v4/launches")
      .then((launches) => {
        this.setState({
          launches: launches.data,
          loading: false,
        });
      })
      .catch((error) => {
        this.setState({
          loading: false,
        });
      });
  }

  getContent() {
    if (this.state.loading) {
      return <div> LOADING </div>;
    }

    if (!this.state.launches.length) {
      return <div> NO DATA </div>;
    }

    var filteredLaunches = [];
    for (var i = 0; i < this.state.launches.length; i++) {
      var launch = this.state.launches[i];
      if (launch.name.match(this.state.filterTerm)) {
        filteredLaunches.push(launch);
      }
    }

    var launchDetails = [];

    for (var i = 0; i < filteredLaunches.length; i++) {
      var launch = filteredLaunches[i];

      launchDetails.push(
        <LaunchDetail
          name={launch.name}
          key={launch.name}
          id={launch.name}
          rocket={launch.rocket}
          details={launch.details}
        ></LaunchDetail>
      );
    }

    return <ul>{launchDetails}</ul>;
  }

  render() {
    var handleFilterChange = (e) => {
      this.setState({ filterTerm: new RegExp(e.currentTarget.value, "i") });
    };

    var handleSortClick = (sortBy) => {
      var currentSort = this.state.sort;
      var newSort;
      if (currentSort == "Rocket") {
        newSort = "Mission";
      } else {
        newSort = "Rocket";
      }
      this.setState({ sort: newSort });
    };

    return (
      <section>
        <Header
          title="SpaceX Launches"
          handleFilterChange={handleFilterChange}
          sortBy={this.state.sort}
          handleSortClick={() => handleSortClick("Rocket")}
        ></Header>
        {this.getContent()}
      </section>
    );
  }
}

var mapStateToProps = (state) => state;

var mapDispatchToProps = (dispatch) => ({
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(LaunchesView);
