export default dateTime => {
  const currentDate = new Date(dateTime);
  const date = currentDate.getDate();
  let month = currentDate.getMonth() + 1;
  const year = currentDate.getFullYear();

  if (month < 10) month = `0${month}`;

  return `${date}/${month}/${year}`;
};
