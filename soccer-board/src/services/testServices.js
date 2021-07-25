import http from "./httpService";
import auth from "./authService";
import { uploadForm } from "./applicationService";
import { getApplicantionStatus } from "./statusService";

const forms = [
  {
    appType: "player",
    name: "Aam Mia",
    email: "aammia@folbagan.com",
    mobile: "06645923072",
    age: 17,
    height: 172.8,
    weight: 62,
    proLevel: "student",
    institution: "BUET",
    prefFoot: "right",
    prefPosition: ["CAM", "RM", "RW", "CM"],
    avatar:
      "https://upload.wikimedia.org/wikipedia/commons/9/90/Hapus_Mango.jpg",
  },
  {
    appType: "player",
    name: "Jaam Pal",
    email: "jaampal@folbagan.com",
    mobile: "03853387510",
    age: 18,
    height: 177.7,
    weight: 72,
    proLevel: "student",
    institution: "BUET",
    prefFoot: "left",
    prefPosition: ["RCB", "LCB", "CDM", "CM"],
    avatar: "http://www.satvai.com/wp-content/uploads/2019/04/51cEH4okBtL.jpg",
  },
  {
    appType: "player",
    name: "Kathal Haque",
    email: "kathalhaque@folbagan.com",
    mobile: "06442321475",
    age: 17,
    height: 180.4,
    weight: 72,
    proLevel: "student",
    institution: "BUET",
    prefFoot: "right",
    prefPosition: ["LCB", "RCB", "CDM", "LM"],
    avatar:
      "https://media.npr.org/assets/img/2014/05/01/jackfruit-9672612823dce73bcdae08b37a708d8692d248d5-s800-c85.jpg",
  },
  {
    appType: "player",
    name: "Peyara Barua",
    email: "peyarabarua@folbagan.com",
    mobile: "01802177764",
    age: 17,
    height: 180.4,
    weight: 65,
    proLevel: "student",
    institution: "BUET",
    prefFoot: "right",
    prefPosition: ["GK"],
    avatar:
      "https://i.pinimg.com/originals/fd/48/67/fd4867fcabc274f1e82a30cf7ef5865c.png",
  },
  {
    appType: "player",
    name: "Kola Mia",
    email: "kolamia@folbagan.com",
    mobile: "06683403465",
    age: 18,
    height: 177.7,
    weight: 65,
    proLevel: "student",
    institution: "BUET",
    prefFoot: "right",
    prefPosition: ["LW", "LM", "RW", "CAM"],
    avatar:
      "https://images.immediate.co.uk/production/volatile/sites/30/2017/01/Bananas-218094b-scaled.jpg",
  },
  {
    appType: "player",
    name: "Angur Hossain",
    email: "angurhossain@folbagan.com",
    mobile: "01822244116",
    age: 17,
    height: 177.7,
    weight: 67,
    proLevel: "student",
    institution: "BUET",
    prefFoot: "left",
    prefPosition: ["LB", "RB", "LCB", "LM"],
    avatar:
      "https://www.dole.com/-/media/project/dole/produce-images/fruit/grapes_web.png",
  },
  {
    appType: "player",
    name: "Aapel Mia",
    email: "aapelmia@folbagan.com",
    mobile: "03821035664",
    age: 19,
    height: 180.4,
    weight: 67,
    proLevel: "student",
    institution: "BUET",
    prefFoot: "right",
    prefPosition: ["CDM", "RM", "LM", "LB"],
    avatar: "https://www.collinsdictionary.com/images/full/apple_158989157.jpg",
  },
  {
    appType: "player",
    name: "Tormuj Gomez",
    email: "tormujgomez@folbagan.com",
    mobile: "06445665907",
    age: 18,
    height: 172.8,
    weight: 65,
    proLevel: "student",
    institution: "BUET",
    prefFoot: "left",
    prefPosition: ["FW", "LW", "CAM", "LM"],
    avatar: "https://images-na.ssl-images-amazon.com/images/I/41juwdZ5WEL.jpg",
  },
  {
    appType: "player",
    name: "Komla Pal",
    email: "komlapal@folbagan.com",
    mobile: "01155387858",
    age: 17,
    height: 172.8,
    weight: 65,
    proLevel: "student",
    institution: "BUET",
    prefFoot: "right",
    prefPosition: ["GK"],
    avatar:
      "https://media.istockphoto.com/photos/orange-picture-id185284489?k=6&m=185284489&s=612x612&w=0&h=x_w4oMnanMTQ5KtSNjSNDdiVaSrlxM4om-3PQTIzFaY=",
  },
  {
    appType: "player",
    name: "Khejur Ajmain",
    email: "khejurajmain@folbagan.com",
    mobile: "01450651162",
    age: 18,
    height: 177.7,
    weight: 67,
    proLevel: "student",
    institution: "BUET",
    prefFoot: "right",
    prefPosition: ["RB", "RCB", "RM", "CDM"],
    avatar:
      "https://sultanofbazaar.com/wp-content/uploads/2020/10/jerusalem-gold-date-fruit.jpg",
  },
  {
    appType: "player",
    name: "Nashpati Mia",
    email: "nashpatimia@folbagan.com",
    mobile: "06448395522",
    age: 18,
    height: 177.7,
    weight: 64,
    proLevel: "student",
    institution: "BUET",
    prefFoot: "right",
    prefPosition: ["RCB", "RB", "RM", "LCB"],
    avatar: "https://images.indianexpress.com/2020/02/pear-fruit_759.jpg",
  },
  {
    appType: "player",
    name: "Dalim Barua",
    email: "dalimbarua@folbagan.com",
    mobile: "06660340236",
    age: 18,
    height: 177.7,
    weight: 64,
    proLevel: "student",
    institution: "BUET",
    prefFoot: "left",
    prefPosition: ["RM", "CM", "LM", "CDM"],
    avatar:
      "https://bhorbazar.com/wp-content/uploads/2020/12/Pomegranate-Dalim.png",
  },
  {
    appType: "player",
    name: "Anarosh Hossain",
    email: "anaroshhossain@folbagan.com",
    mobile: "06444247527",
    age: 19,
    height: 177.7,
    weight: 64,
    proLevel: "student",
    institution: "BUET",
    prefFoot: "right",
    prefPosition: ["LM", "CAM", "LW", "CM"],
    avatar:
      "https://images.unsplash.com/photo-1589606743932-747c74e7330e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
  },
  {
    appType: "player",
    name: "Daab Mia",
    email: "daabmia@folbagan.com",
    mobile: "01878323497",
    age: 19,
    height: 172.8,
    weight: 65,
    proLevel: "student",
    institution: "BUET",
    prefFoot: "left",
    prefPosition: ["RW", "LW", "RM", "LM"],
    avatar:
      "https://www.jiomart.com/images/product/420x420/590000097/tender-coconut-1-pc-0-20201125.jpg",
  },
  {
    appType: "player",
    name: "Taal Mia",
    email: "taalmia@folbagan.com",
    mobile: "04463247958",
    age: 18,
    height: 177.7,
    weight: 64,
    proLevel: "student",
    institution: "BUET",
    prefFoot: "left",
    prefPosition: ["GK"],
    avatar:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Fruits_of_Borassus_flabellifer.jpg/1200px-Fruits_of_Borassus_flabellifer.jpg",
  },
  {
    appType: "player",
    name: "Pepe Gomez",
    email: "pepegomez@folbagan.com",
    mobile: "04403628631",
    age: 17,
    height: 177.7,
    weight: 69,
    proLevel: "student",
    institution: "BUET",
    prefFoot: "right",
    prefPosition: ["CAM", "FW", "RW", "RM"],
    avatar:
      "https://5.imimg.com/data5/ST/LT/MY-37487333/fresh-papaya-fruit-500x500.jpg",
  },
  {
    appType: "player",
    name: "Jolpai Pal",
    email: "jolapaipal@folbagan.com",
    mobile: "01924218824",
    age: 17,
    height: 172.8,
    weight: 69,
    proLevel: "student",
    institution: "BUET",
    prefFoot: "right",
    prefPosition: ["CDM", "CM", "LM", "CAM"],
    avatar:
      "https://image.shutterstock.com/image-photo/delicious-green-olives-leaves-isolated-260nw-1148058713.jpg",
  },
  {
    appType: "player",
    name: "Tetul Azmain",
    email: "tetulazmain@folbagan.com",
    mobile: "06605793047",
    age: 17,
    height: 189.9,
    weight: 72,
    proLevel: "student",
    institution: "BUET",
    prefFoot: "right",
    prefPosition: ["CM", "CAM", "CDM", "FW"],
    avatar: "https://tazafood.xyz/wp-content/uploads/2020/02/Tetul.jpg",
  },
  {
    appType: "player",
    name: "Lichu Hossain",
    email: "lichuhossain@folbagan.com",
    mobile: "03797682482",
    age: 18,
    height: 189.9,
    weight: 67,
    proLevel: "student",
    institution: "BUET",
    prefFoot: "right",
    prefPosition: ["ST", "LW", "CAM"],
    avatar:
      "https://img3.exportersindia.com/product_images/bc-full/dir_158/4714807/lychee-lichi-fruits-plant-1493879106-2961169.jpg",
  },
  {
    appType: "player",
    name: "Shahrar Swapnil",
    email: "shahrar007@gmail.com",
    mobile: "04484701124",
    age: 24,
    height: 177.7,
    weight: 67,
    proLevel: "student",
    institution: "BUET",
    prefFoot: "right",
    prefPosition: ["RCB", "LCB", "CDM", "RM"],
    avatar:
      "https://scontent.fdac11-1.fna.fbcdn.net/v/t1.6435-9/106398269_2240773316083662_8177065633024271573_n.jpg?_nc_cat=107&ccb=1-3&_nc_sid=09cbfe&_nc_eui2=AeHb94vB_lvMx69ndZpFn3cW3PZ6TURE4Grc9npNRETgao-hP42RwdR_BirB8T5KaVFU7JSWMh1Z3eRE8w6DJvEB&_nc_ohc=OfaNO0KJVR8AX9Ur3jT&_nc_ht=scontent.fdac11-1.fna&oh=0d34ae8913415b2ed3958884f8fe88a7&oe=60FE46E6",
  },
];

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const epPlayers = "/players/BUET";

async function getStatuses() {
  const emails = forms.map((form) => ({ email: form.email }));
  const statuses = [];
  for (const email of emails) {
    const status = await getApplicantionStatus(email);
    statuses.push(status);
    await sleep(1000);
  }
  return statuses;
}

export async function testApply() {
  // uploadForm(forms[0]);
  // forms.forEach((form) => uploadForm(form));

  // const _forms = forms.filter((f) => f.name === "Lichu Hossain");
  // console.log(_forms);
  // const emails = _forms.map((form) => ({ email: form.email }));

  const statuses = await getStatuses();
  console.log(statuses);
  const users = [];
  for (const status of statuses) {
    const user = {
      _id: status._id,
      name: status.name,
      email: status.email,
      password: status.email.substr(0, status.email.indexOf("@")),
    };
    users.push(user);
    auth.signUp(user);
    await sleep(30000);
  }
  console.log(users);

  // const { data } = await http.get(epPlayers);
  // const names = data.map((d) => d.profile.name);
  // console.log(
  //   names,
  //   forms.map((f) => f.name)
  // );
  // const toDelete = data.filter((player) =>
  //   forms.find((form) => form.name === player.profile.name)
  // );

  // for (const player of toDelete) {
  //   http.delete(epPlayers + "/" + player._id);
  // }
  // console.log(toDelete);
}
