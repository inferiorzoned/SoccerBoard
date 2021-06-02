const outerLink = {
  trainingRepo: [
    { label: "Create Training", link: "" },
    { label: "Create New Session", link: "" },
  ],
  squad: [
    { label: "Manage Squad", link: "" },
    { label: "Squad Status", link: "" },
  ],
  home: [
    { label: "Manage Squad", link: "" },
    { label: "Squad Status", link: "" },
    { label: "Create Training Session", link: "" },
    { label: "Send Instruction", link: "" },
    { label: "View Reports", link: "" },
    { label: "Inventory", link: "" },
  ],
  trainingSession: [{ label: "Evaluation", link: "" }],
};

const innerLink = {
  trainingRepo: [
    { label: "Passing", link: "Training Repo#Attack" },
    { label: "Shooting", link: "" },
    { label: "Attack", link: "" },
    { label: "Defense", link: "" },
    { label: "Set Piece", link: "" },
  ],
  squad: [
    { label: "Goalkeepers", link: "" },
    { label: "Defenders", link: "" },
    { label: "Midfielders", link: "" },
    { label: "Forwards", link: "" },
  ],
  trainingSession: [
    { label: "Attacker", link: "" },
    { label: "Midfielder", link: "" },
    { label: "Defender", link: "" },
    { label: "Winger", link: "" },
    { label: "Goalkeeper", link: "" },
  ],
};

export const sideBarData = {
  innerLink: innerLink,
  outerLink: outerLink,
};
