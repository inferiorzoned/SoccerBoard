// import http from "..services/httpService";
import http from "../services/httpService";

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
  // console.log(start, end);

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
      title: i % 5 === 0 ? "session " + i : "",
      description: "",
      eventType: "",
      color: 4,
      time: "",
    });
    i++;
  }
  // console.log("i = > ", i);
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
  //const servedEvents = await http.get(apiEndPoint);
  // const servedEvents = [
  //     {
  //         _id: "60b96df886f0732d980ce804",
  //         title: "Training 1",
  //         day: "fri",
  //         date: 4,
  //         month: "June",
  //         year: 2021,
  //         description: "foot work",
  //         eventType: "training"
  //     },
  //     {
  //         _id: "60b96e2886f0732d980ce805",
  //         title: "Training 2",
  //         day: "fri",
  //         date: 6,
  //         month: "June",
  //         year: 2021,
  //         description: "passing work",
  //         eventType: "training"
  //     },
  //     {
  //         _id: "60b96ef386f0732d980ce806",
  //         title: "Practice Match 1",
  //         day: "tue",
  //         date: 13,
  //         month: "June",
  //         year: 2021,
  //         description: "game work",
  //         eventType: "match"
  //     },
  //     {
  //         _id: "60b96f1986f0732d980ce807",
  //         title: "Team Dinner",
  //         day: "tue",
  //         date: 1,
  //         month: "June",
  //         year: 2021,
  //         description: "game work",
  //         eventType: "off-field"
  //     },
  //     {
  //         _id: "60b96f2686f0732d980ce808",
  //         title: "Team Dinner",
  //         day: "wed",
  //         date: 30,
  //         month: "June",
  //         year: 2021,
  //         description: "game work",
  //         eventType: "off-field"
  //     }
  // ];

  const res = await getEvents(getMonthName(month), year);
  const servedEvents = res.data;

  // console.log("served ", servedEvents);
  for (let j = 0; j < servedEvents.length; j++) {
    for (let k = 0; k < events.length; k++) {
      let eventDate = new Date(servedEvents[j].time);
      if (eventDate.getDate() === events[k].date) {
        events[k].title = servedEvents[j].title;
        events[k].description = servedEvents[j].description;
        events[k].eventType = servedEvents[j].eventType;
        events[k]._id = servedEvents[j]._id;
        events[k].time = renderTimeString(eventDate);
        events[k].color = 2;
      }
    }
  }
  // console.log(events, new Date(1618434400000));
  return { events, month: getMonthNameCap(month) };
}

function renderTimeString(event) {
  let min = event.getMinutes();
  min = min.length < 2 ? "0" + min : min;
  let hr = event.getHours();
  hr = hr.length < 2 ? "0" + hr : hr;
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
