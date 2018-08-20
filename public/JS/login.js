/*  global document:true, fetch:true, window:true */
/*  eslint no-undef: "error"  */

const loginUrl = 'https://mydiary-challenge.herokuapp.com';

const signinForm = document.getElementById('signin-form');

signinForm.onsubmit = (e) => {
  e.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('pword').value;
  const userError = document.getElementById('user-error');
  const login = {
    username,
    password
  };
  console.log(login);
  fetch(`${loginUrl}api/v1/auth/login`, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify(login),
  })
    .then(response => response.json())
    .then((data) => {
      console.log(data);
      if (data.message === 'Login Successful!') {
        const token = data.token;
        const username = data.userDetails.username;
        console.log(token);
        localStorage.setItem('token', token);
        localStorage.setItem('username', username);
        window.location.href = './profile.html';
      } else {
        userError.innerHTML = Object.values(data.message);
      }
    })
    .catch((error) => {
      console.log(error);
    });
};
const logout = () => {
  localStorage.clear();
  window.location.href = './logout.html';
};
