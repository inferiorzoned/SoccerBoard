// import http from "..services/httpService";
import http from "../services/httpService";
import { getCurrentUser } from "../services/authService";

const apiEndpoint = "/events";

function getEvents(month, year) {
  return http.get(apiEndpoint + "/" + month + "/" + year);
}

function getMonthsLastDate(month, year) {
  const leapYear =
    year % 4 === 0
      ? year % 100 === 0
        ? year % 400 === 0
          ? true
          : false
        : true
      : false;
  if (month < 7) {
    if (month === 1) return leapYear ? 29 : 28;
    else if (month % 2 === 0) return 31;
    return 30;
  } else {
    if (month % 2 === 0) return 30;
    return 31;
  }
}

export async function serveEvents(month, year) {
  if (!month || !year) {
    let today = new Date();
    month = today.getMonth();
    year = today.getFullYear();
  }
  const start = new Date(year, month, 1).getDay(); //0=>sun,1=>mon,...
  const end = getMonthsLastDate(month, year) + start;
  console.log(start, end);
  console.log("bog ", new Date().getDay());
  var events = [];
  let i = 0;
  while (i < start) {
    events.push({
      _id: i,
      date: "",
      color: "borderless",
    });
    i++;
  }
  while (i < end) {
    let day;
    if (i % 7 === 0) day = "sun";
    else if (i % 7 === 1) day = "mon";
    else if (i % 7 === 2) day = "tue";
    else if (i % 7 === 3) day = "wed";
    else if (i % 7 === 4) day = "thu";
    else if (i % 7 === 5) day = "fri";
    else if (i % 7 === 6) day = "sat";

    events.push({
      day: day,
      _id: i,
      date: i + 1 - start,
      title: "",
      description: "",
      eventType: "",
      color: 4,
      time: "",
    });
    i++;
  }
  console.log("i = > ", i);
  const fin = i > 35 ? 42 : 35;
  while (i < fin) {
    events.push({
      _id: i,
      date: "",
      color: "borderless",
    });
    i++;
  }
  //now get events from the server

  const res = await getEvents(getMonthName(month), year);
  const servedEvents = res.data;

  let eventDictionary = {};
  console.log("served ", servedEvents);
  for (let j = 0; j < servedEvents.length; j++) {
    for (let k = 0; k < events.length; k++) {
      let eventDate = new Date(servedEvents[j].time);
      if (eventDate.getDate() === events[k].date) {
        if (events[k].title) {
          events[k].title = events[k].title + "\n" + servedEvents[j].title;
        } else {
          events[k].title = servedEvents[j].title;
        }
        events[k].description = servedEvents[j].description;
        events[k].eventType = servedEvents[j].eventType;
        events[k]._id = servedEvents[j]._id;
        events[k].time = renderTimeString(eventDate);
        events[k].color = 2;
        let event = {
          date: events[k].date,
          title: servedEvents[j].title,
          _id: servedEvents[j]._id,
          eventType: servedEvents[j].eventType,
          description: servedEvents[j].description,
          eventId: servedEvents[j].eventId,
          time: renderTimeString(eventDate),
          color: 2,
        };
        let tempList = [];
        if (eventDictionary[eventDate.getDate().toString()]) {
          tempList = [...eventDictionary[eventDate.getDate().toString()]];
        }
        tempList.push(event);
        eventDictionary[eventDate.getDate().toString()] = tempList;
      }
    }
  }
  console.log("event dictionary ", eventDictionary);
  console.log(events, new Date(1618434400000));
  return { eventDictionary, events, month: getMonthNameCap(month) };
}

export function renderSpecificEvent(event) {
  console.log(getCurrentUser());
  const institution = getCurrentUser().institution;
  if (event.eventType === "Training Session") {
    //console.log(getCurrentUser());
    //the institution is not needed that much actually
    window.location = `/Training Session/${event.eventId}`;
  }
}

function renderTimeString(event) {
  let min = event.getMinutes();
  min = min.toString().length < 2 ? "0" + min.toString() : min.toString();
  let hr = event.getHours();
  hr = hr.toString().length < 2 ? "0" + hr.toString() : hr.toString();
  return hr + ":" + min + " hrs";
  // const hr = time.getHours()%12;
  // const min = time.getMinutes();
  // if(time.getHours() > 11)
}

function getMonthName(index) {
  const monthNames = [
    "january",
    "february",
    "march",
    "april",
    "may",
    "june",
    "july",
    "august",
    "september",
    "october",
    "november",
    "december",
  ];
  return monthNames[index];
}

export function getMonthNameCap(month) {
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
  return monthNames[month];
}

function getDay(index) {
  const days = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
  return days[index];
}
