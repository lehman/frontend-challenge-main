import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import Header from "../components/Header/Header";
import LaunchDetail from "../components/LaunchDetail/LaunchDetail";

function sortLaunches(launches, sortBy) {
  let sortedLaunches = [];

  switch (sortBy) {
    case "Mission":
    // are "launch" and "mission" used interchangeably here?
    case "LaunchName":
      sortedLaunches = launches.sort((a, b) => (a.name > b.name ? 1 : -1));
      break;
    case "RocketName":
      sortedLaunches = launches.sort((a, b) =>
        a.rocketName > b.rocketName ? 1 : -1
      );
      break;
    default:
      break;
  }

  return sortedLaunches;
}

var filterTerm = "";

class LaunchesView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      launches: [],
      rockets: [],
      loading: false,
      loadingRocketData: false,
      sort: "Mission",
      filterTerm: new RegExp("", "i"),
    };
  }

  componentDidMount() {
    this.setState({ loading: true, loadingRocketData: true });
    var api = axios.create();

    const getLaunchData = new Promise((resolve, reject) => {
      this.setState({ loading: true });
      var api = axios.create();
      api
        .get("https://api.spacexdata.com/v4/launches")
        .then((launches) => {
          this.setState({
            launches: launches.data,
            loading: false,
          });
          resolve(launches.data);
        })
        .catch((error) => {
          this.setState({
            loading: false,
          });
        });
    });

    const getRocketData = new Promise((resolve, reject) => {
      this.setState({ loadingRocketData: true });
      var api = axios.create();
      api
        .get("https://api.spacexdata.com/v4/rockets")
        .then((rockets) => {
          this.setState({
            rockets: rockets.data, // right now we only need name and id
            loadingRocketData: false,
          });
          resolve(rockets.data);
        })
        .catch((error) => {
          this.setState({
            loadingRocketData: false,
          });
        });
    });

    Promise.all([getLaunchData, getRocketData]).then((values) => {
      let launches = values[0];
      let rockets = values[1];

      let launchesWithRocketName = launches.map((launch) => {
        let rocket = rockets.find((rocket) => rocket.id == launch.rocket);
        let result = {};
        rocket === undefined
          ? (result = { ...launch, rocketName: null })
          : (result = { ...launch, rocketName: rocket.name });
        return result;
      });

      this.setState({
        launches: launchesWithRocketName,
      });
    });
  }

  getContent() {
    if (this.state.loading) {
      return <div> LOADING </div>;
    } else if (this.state.loadingRocketData) {
      return <div> LOADING ROCKET DATA </div>;
    } else if (!this.state.launches.length) {
      return <div> NO DATA </div>;
    }

    var filteredLaunches = [];
    for (var i = 0; i < this.state.launches.length; i++) {
      var launch = this.state.launches[i];
      if (launch.name.includes(filterTerm)) {
        filteredLaunches.push(launch);
      }
    }

    var sortedFilteredLaunches = sortLaunches(
      filteredLaunches,
      this.state.sort
    );
    var launchDetails = [];

    for (var i = 0; i < sortedFilteredLaunches.length; i++) {
      var launch = sortedFilteredLaunches[i];

      launchDetails.push(
        <LaunchDetail
          name={launch.name}
          key={launch.name}
          id={launch.name}
          rocket={launch.rocket}
          rocketName={launch.rocketName}
          details={launch.details}
        ></LaunchDetail>
      );
    }

    return <ul>{launchDetails}</ul>;
  }

  render() {
    var handleFilterChange = (e) => {
      filterTerm = e.currentTarget.value;
    };

    var handleSortClick = (sortBy) => {
      var currentSort = this.state.sort;
      var newSort;
      if (currentSort == "RocketName") {
        newSort = "Mission";
      } else {
        newSort = "RocketName";
      }
      this.setState({ sort: newSort });
    };

    return (
      <section>
        <Header
          title="SpaceX Launches"
          handleFilterChange={handleFilterChange}
          sortingBy={
            this.state.sort === "RocketName" ? "Rocket" : this.state.sort
          }
          toggleSortText={this.state.sort === "Mission" ? "Rocket" : "Mission"}
          handleSortClick={() => handleSortClick("RocketName")}
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
