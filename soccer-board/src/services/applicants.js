const applicants = [
  {
    _id: "ajskghaksjdfukweryijnh",
    name: "Shahrar Swapnil",
    email: "shahrar@gmail.com",
    mobile: "01654775634",
    age: 24,
    height: 5.75,
    weight: 72,
    proLevel: "student",
    institution: "BUET",
    prefFoot: "right",
    prefPos: ["CB", "RCB", "CDM"],
    profileImg:
      "https://scontent.fdac5-2.fna.fbcdn.net/v/t1.6435-9/106398269_2240773316083662_8177065633024271573_n.jpg?_nc_cat=107&ccb=1-3&_nc_sid=09cbfe&_nc_eui2=AeEh5_73871MMK493DMTwzeZ3PZ6TURE4Grc9npNRETgajWIJMX_e51NZUvKSCmuvmUQcNsDf_iSQo5KE-hnygZw&_nc_ohc=Zd03PfLAawgAX98FKLC&_nc_oc=AQlKPlN9gSxu-h_NNng8-ETRZGHN3u0Xj_e3m-fv84HaVUTLeBwMsKu1Hk1Wm79hVHw&_nc_ht=scontent.fdac5-2.fna&oh=f2486e65794d8cf9c141d622dfb2db3f&oe=60E29766",
  },
  {
    _id: "lkrkhnkjhiusdfhneryuwh",
    name: "Hasibul Hisham",
    email: "hisham@gmail.com",
    mobile: "01654331465",
    age: 23.8,
    height: 5.6,
    weight: 54,
    proLevel: "student",
    institution: "BUET",
    prefFoot: "right",
    prefPos: ["RM", "RB", "ST"],
    profileImg:
      "https://scontent.fdac5-1.fna.fbcdn.net/v/t1.6435-1/c80.0.320.320a/p320x320/88241758_1407765116082453_8609546447760654336_n.jpg?_nc_cat=100&ccb=1-3&_nc_sid=7206a8&_nc_eui2=AeGYzFs54Gyw_fB7O2zIdSSk-VHb7yD8nKL5UdvvIPycogg0UG4afbXcGY5lnNJWPmDnbZhLfse1hRQ4TZSvpMMU&_nc_ohc=bx1tZoC8J2sAX8qrqtn&_nc_ht=scontent.fdac5-1.fna&tp=27&oh=595edab54017c5c64fe98b81b2575d08&oe=60E0A995",
  },
];

export function getApplicants() {
  return applicants;
}

export default {
  getApplicants,
};
