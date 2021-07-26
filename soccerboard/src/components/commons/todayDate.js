const today = new Date();

// get today's date in format "YYYY-MM-DD" where month and date might have starting zero
const todayDate = `${today.getFullYear()}-${
    (today.getMonth() + 1 > 9 ? '' : '0') + (today.getMonth() + 1)
}-${
    (today.getDate() > 9 ? '' : '0') + today.getDate()
}`;

export default todayDate;

// const year = today.getFullYear();
// const month = today.getMonth() + 1;
// const day = today.getDate();
// const todayDate =  `${year}-${month}-${day}`;

// export default todayDate;


