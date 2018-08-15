const modal = document.getElementById('myModal');
const btn = document.getElementById('myBtn');
const divClose = document.getElementsByClassName('closee')[0];

const modal1 = document.getElementById('myModal1');
const profileBtn = document.getElementById('myProfileBtn');
const span = document.getElementsByClassName('close')[0];

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

profileBtn.onclick = () => {
  modal1.style.display = 'block';
};

span.onclick = () => {
  modal1.style.display = 'none';
};

window.onclick = (event) => {
  if (event.target === modal1) {
    modal1.style.display = 'none';
  }
};

function myFunction() {
  const x = document.getElementById('myTopnav');
  if (x.className === 'topnav') {
    x.className += ' responsive';
  } else {
    x.className = 'topnav';
  }
}
