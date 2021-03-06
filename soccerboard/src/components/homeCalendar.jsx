import React, { Component } from "react";
import { serveEvents } from "../utils/eventServices";
// import Pagination from './common/pagination';
// import ListGroup from './common/listGroup';
// import { paginate } from '../utils/paginate';
import EventsCalendar from "./eventCalendar";
import DetailsBox from "./detailsBox";
import LoaderSoccer from "./commons/loaderSoccer";
// import SearchBox from './common/searchBox';
import { Link } from "react-router-dom";
//import { toast } from 'react-toastify';
import _ from "lodash";

class HomeCalendar extends Component {
  state = {
    events: [], // to get movies from memory
    genres: [],
    pageSize: 4,
    year: new Date().getFullYear(),
    selectedEvent: null,
    searchQuery: "",
    eventDictionary: {},
    sortColumn: { path: "title", order: "asc" },
  };

  async componentDidMount() {
    const today = new Date();
    const year = today.getFullYear();
    const m = today.getMonth();
    const { eventDictionary, events, month } = await serveEvents(m, year);
    console.log(events, eventDictionary);
    this.setState({ events, month, year, eventDictionary });
  }

  // handlePageChange = (page) => {
  //     console.log('page required ',page);
  //     this.setState({ currentPage: page });
  //     //starting ending
  // }

  handleEventSelected = (event) => {
    console.log("event required ", event);
    const { eventDictionary } = this.state;
    let date = event.date;
    console.log("event got", eventDictionary[date]);
    this.setState({
      selectedEvent: eventDictionary[date],
      searchQuery: "",
      currentPage: 1,
    });
    //starting ending
  };

  handleMonthIncrease = async () => {
    //change to next month
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const index = monthNames.indexOf(this.state.month);
    console.log("index", index, this.state.month);
    const year = index === 11 ? this.state.year + 1 : this.state.year;
    const { eventDictionary, events, month } = await serveEvents(
      (index + 1) % 12,
      year
    );
    console.log(events, eventDictionary);
    this.setState({
      events,
      month,
      year,
      eventDictionary,
      selectedEvent: null,
    });
    //starting ending
  };

  handleMonthDecrease = async () => {
    //change to prev month
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let index = monthNames.indexOf(this.state.month);

    const year = index === 0 ? this.state.year - 1 : this.state.year;
    index = index === 0 ? 11 : index - 1;
    const { eventDictionary, events, month } = await serveEvents(index, year);
    console.log(events, eventDictionary);
    this.setState({
      events,
      month,
      year,
      eventDictionary,
      selectedEvent: null,
    });
    //starting ending
  };

  // handleSearch = (query) => {

  //     this.setState( {
  //         searchQuery: query,
  //         selectedGenre: null,
  //         currentPage: 1
  //      });
  //     //starting ending
  // }

  getCalendarData = () => {
    const { currentPage, pageSize, selectedEvent, searchQuery, events } =
      this.state;

    if (!events) return null;

    const len = events.length;
    const rows = len / 7;
    const eventsArray = [];
    for (let j = 0; j < rows; j++) {
      eventsArray[j] = [];
      for (let i = j * 7; i < (j + 1) * 7; i++) {
        eventsArray[j].push(events[i]);
      }
    }
    return eventsArray;
  };

  render() {
    // var { length: count } = this.state.movies;
    //if(count === 0) return <p>There are no movies</p>;

    const { month, pageSize, sortColumn, events, selectedEvent } = this.state;

    const eventsArray = this.getCalendarData();
    if (!eventsArray) return null;
    //const { data: movies, totalCount, currentPageCount } = this.getPageData();
    //const { user } = this.props;

    console.log("events ", eventsArray);
    if (events && month) {
      return (
        <div>
          <div className="row">
            <EventsCalendar
              events={eventsArray}
              cellSelected={selectedEvent}
              onCellSelected={this.handleEventSelected}
              month={month}
              onIncrease={this.handleMonthIncrease}
              onDecrease={this.handleMonthDecrease}
            />
          </div>
          <div className="row">
            <DetailsBox eventSelected={selectedEvent} month={month} />
          </div>
        </div>
      );
    }
    return (
      <div className="centered">
        <LoaderSoccer />
      </div>
    );
  }
}

export default HomeCalendar;
