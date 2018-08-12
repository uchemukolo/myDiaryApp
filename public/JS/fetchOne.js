/*  global document:true, fetch:true, window:true, localStorage:true */
/*  eslint no-undef: "error"  */
const entryId = window.location.search.split('?')[1];
const entryUrl = 'http://localhost:9001/api/v1';
const token = localStorage.getItem('token');
console.log(token);

const date = document.getElementById('date-detail');
const title = document.getElementById('title-detail');
const mood = document.getElementById('mood-detail');
const entry = document.getElementById('entry-detail');
const entryError = document.getElementById('entry-error');

window.addEventListener('load', () => {
  fetch(`${entryUrl}/entries/${entryId}`, {
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
        title.innerHTML = data.entry.title;
        mood.innerHTML = data.entry.mood;
        date.innerHTML = data.entry.createdat;
        entry.innerHTML = data.entry.entry;
      } else {
        entryError.innerHTML = data.message;
      }
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
  const editBtn = document.getElementsByClassName('myEditBtn');
  const modifyBtn = document.getElementsByClassName('myModifyBtn');
  const modifyUser = {
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
    body: JSON.stringify(modifyUser),
  })
    .then(response => response.json())
    .then((data) => {
      console.log(data);
      if (data.message === 'Entry updated sucessfully') {
        editBtn.classList.remove('hide');
        modifyBtn.classList.add('hide');
        window.location.reload(true);
      } else {
        return entryError.innerHTML = data.message;
      }
    });
};
