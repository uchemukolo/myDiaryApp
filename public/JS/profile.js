/*  global document:true, fetch:true, window:true, localStorage:true */
/*  eslint no-undef: "error"  */

const username = document.getElementById('username');
username.innerHTML = localStorage.getItem('username');

const profileUrl = 'http://localhost:9001/api/v1';
const token = localStorage.getItem('token');
console.log(token);

window.addEventListener('load', () => {
  fetch(`${profileUrl}/entries`, {
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
      if (data.message === 'Entries successfully retrieved from the database') {
        document.getElementById('total-entries').innerHTML = data.entry.length;
      }
    })
    .catch((error) => {
      console.log(error);
    });
});
