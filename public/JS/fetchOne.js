/*  global document:true, fetch:true, window:true, localStorage:true */
/*  eslint no-undef: "error"  */
const entryId = window.location.search.split('?')[1];
const entryUrl = 'https://mydiary-challenge.herokuapp.com';
const token = localStorage.getItem('token');
console.log(token);

const date = document.getElementById('date-detail');
const title = document.getElementById('title-detail');
const mood = document.getElementById('mood-detail');
const entry = document.getElementById('entry-detail');
const entryError = document.getElementById('entry-error');
const entryMsg = document.getElementById('success-msg');


window.addEventListener('load', () => {
  fetch(`${entryUrl}api/v1/entries/${entryId}`, {
    method: 'GET',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      token: `${token}`,
    }
  })
    .then(response => response.json())
    .then((data) => {
      console.log(data);
      if (data.message === 'Entry successfully retrieved from the database') {
        setTimeout(() => {
          title.innerHTML = data.entry.title;
          mood.innerHTML = data.entry.mood;
          date.innerHTML = data.entry.createdat;
          entry.innerHTML = data.entry.entry;
          entryMsg.innerHTML = data.message;
          entryMsg.innerHTML = '';
        }, 2000);
      } else {
        entryError.innerHTML = data.message;
        setTimeout(() => {
          entryError.innerHTML = '';
        }, 2000);
      }
    })
    .catch((error) => {
      console.log(error);
    });
});

const editEntry = () => {
  title.contentEditable = true;
  mood.contentEditable = true;
  entry.contentEditable = true;
};

const modifyEntry = () => {
  title.contentEditable = false;
  mood.contentEditable = false;
  entry.contentEditable = false;
  const modify = {
    title: title.textContent,
    mood: mood.textContent,
    entry: entry.textContent
  };
  fetch(`${entryUrl}/entries/${entryId}`, {
    method: 'PUT',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      token: `${token}`,
    },
    body: JSON.stringify(modify),
  })
    .then(response => response.json())
    .then((data) => {
      console.log(data);
      if (data.message === 'Entry updated sucessfully') {
        entryMsg.innerHTML = data.message;
        setTimeout(() => {
          window.location.reload(true);
          entryMsg.innerHTML = '';
        }, 2000);
      } else {
        entryError.innerHTML = data.message;
        setTimeout(() => {
          entryError.innerHTML = '';
        }, 2000);
      }
    }).catch((error) => {
      console.log(error);
    });
};
