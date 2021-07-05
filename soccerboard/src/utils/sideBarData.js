const outerLink = {
  trainingRepo: [
    { label: "Create Training", link: "Training Repo/Create Training" },
    { label: "Create New Session", link: "Training Repo/Create New Session" },
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
    { label: "Passing", link: "Training Repo#passing" },
    { label: "Shooting", link: "Training Repo#shooting" },
    { label: "Attack", link: "Training Repo#attack" },
    { label: "Defense", link: "Training Repo#defense" },
    { label: "Set Piece", link: "Training Repo#set-piece" },
  ],
  squad: [
    { label: "Goalkeepers", link: "" },
    { label: "Defenders", link: "" },
    { label: "Midfielders", link: "" },
    { label: "Forwards", link: "" },
  ],
  trainingSession: [
    { label: "Goalkeepers", link: "" },
    { label: "Defenders", link: "" },
    { label: "Midfielders", link: "" },
    { label: "Forwards", link: "" },
  ],
};

export const sideBarData = {
  innerLink: innerLink,
  outerLink: outerLink,
};
