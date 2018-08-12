/*  global document:true, fetch:true, window:true */
/*  eslint no-undef: "error"  */

const url = 'http://localhost:9001/api/v1';

const signinForm = document.getElementById('signin-form');

signinForm.onsubmit = (e) => {
  e.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('pword').value;
  const result = document.getElementById('signin-error');
  const login = {
    username,
    password
  };
  console.log(login);
  fetch(`${url}/auth/login`, {
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
        return result.innerHTML = Object.values(data.message);
      }
    })
    .catch((error) => {
      console.log(error);
    });
};
const logout = () => {
  localStorage.clear();
  window.location.href = './index.html';
};
