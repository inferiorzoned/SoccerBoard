const squad = [
  {
    _id: "1",
    name: "Kim Jong Un",
    position: "ST",
    prefPosition: "ST",
    kit: 11,
    captain: true,
    partOf: "main",
    instructions: [
      { type: "text", content: "Ask for pass" },
      { type: "text", content: "If he don't listen, kill him." },
    ],
  },
  {
    _id: "2",
    name: "Sheikh Hasina",
    position: "CAM",
    prefPosition: "CAM",
    kit: 10,
    partOf: "main",
    instructions: [
      {
        type: "text",
        content: "আপা, আপনে আমাদের মা এর মত। আপনেই বলেন আমি কী করব",
      },
      {
        type: "text",
        content: "শুধু আশপাশের গুলা কথা না শুনলে একটু বকে দিবেন",
      },
    ],
  },
  {
    _id: "3",
    name: "Khaleda Zia",
    position: "RM",
    prefPosition: "RM",
    kit: 6,
    partOf: "reserved",
  },
  {
    _id: "4",
    name: "Narendra Modi",
    position: "RW",
    prefPosition: "RW",
    kit: 7,
    partOf: "main",
    instructions: [
      { type: "text", content: "Hold possession" },
      { type: "text", content: "Avoid bad call" },
    ],
  },
  {
    _id: "5",
    name: "Imran Khan",
    position: "RCB",
    prefPosition: "RCB",
    kit: 4,
    partOf: "main",
    instructions: [
      { type: "text", content: "Keep up the speed" },
      { type: "text", content: "Avoid cards" },
    ],
  },
  {
    _id: "6",
    name: "Muhammad Bin Salman",
    position: "LCB",
    prefPosition: "LCB",
    kit: 2,
    partOf: "main",
    instructions: [
      { type: "text", content: "Don't be selfish." },
      { type: "text", content: "Don't foul your teammate." },
    ],
  },
  {
    _id: "7",
    name: "Xi Jinping",
    position: "LW",
    prefPosition: "LW",
    kit: 13,
    partOf: "main",
    instructions: [
      { type: "text", content: "Dive in the box" },
      { type: "text", content: "Injure the oponent gk" },
    ],
  },
  {
    _id: "8",
    name: "Justin Trudo",
    position: "GK",
    prefPosition: "GK",
    kit: 1,
    partOf: "main",
    instructions: [
      { type: "text", content: "Chipa mair diye acting skill dekhabi" },
      { type: "text", content: "Pass ball to the both wings" },
    ],
  },
  {
    _id: "9",
    name: "Joe Biden",
    position: "RB",
    prefPosition: "RB",
    kit: 5,
    partOf: "main",
    instructions: [
      { type: "text", content: "Play one-two with the RM" },
      { type: "text", content: "Opponent er striker er theng vainga dibi" },
    ],
  },
  {
    _id: "10",
    name: "Benjamin Netaniyahu",
    position: "RDM",
    prefPosition: "RDM",
    kit: 17,
    partOf: "main",
    instructions: [
      { type: "text", content: "Oder box e dhuika boisha thakbi" },
      { type: "text", content: "Call RCB for ball." },
    ],
  },
  {
    _id: "11",
    name: "Abdel Fattah Sisi",
    position: "LB",
    prefPosition: "LB",
    kit: 24,
    partOf: "main",
    instructions: [
      { type: "text", content: "Play long ball to RM" },
      { type: "text", content: "Preserve stamina" },
    ],
  },
  {
    _id: "12",
    name: "Jesinda Ardern",
    position: "LDM",
    prefPosition: "LDM",
    kit: 8,
    partOf: "main",
    instructions: [
      { type: "text", content: "Keep the ball rolling." },
      { type: "text", content: "মধু মধু হই বিষ খাওয়াইলা" },
    ],
  },
  {
    _id: "13",
    name: "Ayatullah Khomeni",
    position: "ST",
    prefPosition: "ST",
    kit: 18,
    partOf: "sub",
    instructions: [
      { type: "text", content: "Shoot at first chance" },
      { type: "text", content: "Communicate with the RW for cross." },
    ],
  },
];

export function orderSquad(squad) {
  const positionSerial = [
    "GK",
    "RB",
    "RCB",
    "CB",
    "LCB",
    "LB",
    "RM",
    "RDM",
    "CDM",
    "LDM",
    "LM",
    "CM",
    "CAM",
    "RW",
    "FW",
    "ST",
    "LW",
  ];

  let squadSerial = [];
  positionSerial.forEach((pos) => {
    const player = squad.filter((p) => p.position === pos);
    if (player) squadSerial.push(...player);
  });

  return squadSerial;
}

export function getSquad() {
  return orderSquad(squad);
}

const formations = [
  {
    _id: "1",
    label: "4-3-3",
    positions: [
      {
        label: "GK",
        left: 50,
        top: 90,
      },
      {
        label: "RCB",
        left: 65,
        top: 80,
      },
      {
        label: "LCB",
        left: 35,
        top: 80,
      },
      {
        label: "LB",
        left: 15,
        top: 75,
      },
      {
        label: "RB",
        left: 85,
        top: 75,
      },
      {
        label: "RDM",
        left: 60,
        top: 65,
      },
      {
        label: "LDM",
        left: 40,
        top: 65,
      },
      {
        label: "CAM",
        left: 50,
        top: 55,
      },
      {
        label: "LW",
        left: 20,
        top: 45,
      },
      {
        label: "RW",
        left: 80,
        top: 45,
      },
      {
        label: "ST",
        left: 50,
        top: 40,
      },
    ],
  },
];

export function getFormation(id) {
  id = "1";
  return formations.find((f) => f._id === id);
}
