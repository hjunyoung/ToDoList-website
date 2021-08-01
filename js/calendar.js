const calendar = document.querySelector('.calendar');

const getDate = () => {
  const options = {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  };
  const now = new Date();
  const date = now.toLocaleString('en-us', options);
  calendar.innerText = date;
};

getDate();
setInterval(getDate, 1000);
