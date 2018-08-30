/*  global document:true, fetch:true, window:true */
/*  eslint no-undef: "error"  */

const url = 'https://mydiary-challenge.herokuapp.com/';

const signupForm = document.getElementById('register-form');

signupForm.onsubmit = (e) => {
  e.preventDefault();

  const email = document.getElementById('email').value;
  const username = document.getElementById('username').value;
  const password = document.getElementById('pword').value;
  const confirmPassword = document.getElementById('pwords').value;
  const userError = document.getElementById('signup-error');
  const newUser = {
    username,
    email,
    password,
    confirmPassword
  };
  console.log(newUser);

  fetch(`${url}api/v1/auth/signup`, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify(newUser),
  })
    .then(response => response.json())
    .then((data) => {
      console.log('From backend', data.message.msgs === ['Signup Successful']);
      if (data.message.msgs[0] === 'Signup Successful') {
        const token = data.token;
        const username = data.username;
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
