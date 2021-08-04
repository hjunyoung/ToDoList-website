const calendar = document.querySelector('.calendar');
const calendarDay = calendar.querySelector('.calendar--day .calendar__content');
const calendarMonth = calendar.querySelector(
  '.calendar--month .calendar__content'
);
const calendarDate = calendar.querySelector(
  '.calendar--date .calendar__content'
);
const calendarYear = calendar.querySelector(
  '.calendar--year .calendar__content'
);

const getDate = () => {
  const options = {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  };
  const now = new Date().toLocaleString('en-us', options);
  const day = now.slice(0, 3);
  const month = now.slice(5, 8);
  const date = now.slice(-8, -6).trim();
  const year = now.slice(-4);

  calendarDay.innerHTML = `<p>${day}</p>`;
  calendarMonth.innerHTML = `<p>${month}</p>`;
  calendarDate.innerHTML = `<p>${date}</p>`;
  calendarYear.innerHTML = `<p>${year}</p>`;
};

getDate();
setInterval(getDate, 1000);
