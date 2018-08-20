/*  global document:true, fetch:true, window:true, localStorage:true */
/*  eslint no-undef: "error"  */

const url = 'https://mydiary-challenge.herokuapp.com';
const token = localStorage.getItem('token');
console.log(token);
const entryForm = document.getElementById('entry-form');

entryForm.onsubmit = (e) => {
  e.preventDefault();

  const title = document.getElementById('title').value;
  const mood = document.getElementById('mood').value;
  const entry = document.getElementById('entry').value;
  const entryError = document.getElementById('entry-error');

  const newEntry = {
    title,
    mood,
    entry
  };
  console.log(newEntry);

  fetch(`${url}api/v1/entries`, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      token: `${token}`,
    },
    body: JSON.stringify(newEntry),
  })
    .then(response => response.json())
    .then((data) => {
      console.log(data);
      if (data.message === 'Entry Created Successfully') {
        window.location.href = `./entry-detail.html?${data.newEntry.id}`;
      } else {
        entryError.innerHTML = Object.values(data.message);
      }
    })
    .catch((error) => {
      console.log(error);
    });
};
