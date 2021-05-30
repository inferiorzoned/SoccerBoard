// import http from "./httpService";

// export function getGenres() {
//   return http.get("/genres");
// }

function getEvents(){

    const events = [];
    for(let i = 0 ; i < 35 ; ++i ){
        let day;
        if(i%7 === 0) day = "sat";
        else if(i%7 === 1) day = "sun";
        else if(i%7 === 2) day = "mon";
        else if(i%7 === 3) day = "tue";
        else if(i%7 === 4) day = "wed";
        else if(i%7 === 5) day = "thu";
        else if(i%7 === 6) day = "fri";

        events.push({
            day: day,
            _id: i,
            date: i+1,
            title: i%5 === 0 ? 'session '+i : "",
            color: i%5
        });
    }
    
    console.log(typeof(events));
    return { events, month: 'April' };
}

module.exports = {
    getEvents
}
