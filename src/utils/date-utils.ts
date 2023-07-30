export const getFormattedDate = () => {
  const currentDate = new Date();
  const year = currentDate.getFullYear().toString(); // Get last two digits of the year
  const month = (currentDate.getMonth() + 1).toString().padStart(2, "0"); // Get month with leading zero
  const day = currentDate.getDate().toString().padStart(2, "0"); // Get day with leading zero

  return `${year}${month}${day}`;
};

export const getFormattedNumber = (sequenceNumber: number) => {
  return sequenceNumber.toString().padStart(4, "0");
};
