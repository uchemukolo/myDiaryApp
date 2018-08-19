const modal = document.getElementById('myModal');
const btn = document.getElementById('myReminderBtn');
const divClose = document.getElementsByClassName('closee')[0];

btn.onclick = () => {
  modal.style.display = 'block';
};

divClose.onclick = () => {
  modal.style.display = 'none';
};

window.onclick = (event) => {
  if (event.target === modal) {
    modal.style.display = 'none';
  }
};

const myFunction = () => {
  const nav = document.getElementById('myTopnav');
  if (nav.className === 'topnav') {
    nav.className += ' responsive';
  } else {
    nav.className = 'topnav';
  }
}
