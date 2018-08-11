/*  global document:true, fetch:true, window:true */
/*  eslint no-undef: "error"  */

const url = 'http://localhost:9001/api/v1';

const signupForm = document.getElementById('register-form');
document.getElementById('email').value = '';
document.getElementById('username').value = '';
document.getElementById('pword').value = '';
document.getElementById('pwords').value = '';

signupForm.onsubmit = (e) => {
  e.preventDefault();

  const email = document.getElementById('email').value;
  const username = document.getElementById('username').value;
  const password = document.getElementById('pword').value;
  const confirmPassword = document.getElementById('pwords').value;
  const result = document.getElementById('signup-error');
  const newUser = {
    username,
    email,
    password,
    confirmPassword
  };
  console.log(newUser);

  fetch(`${url}/auth/signup`, {
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
      if (data.message === 'Signup Successful') {
        const token = data.token;
        console.log(token);
        localStorage.setItem('token', token);
        window.location.href = './profile.html';
      } else {
        console.log(data);

        result.innerHTML = Object.values(data.message);
      }
    })
    .catch((error) => {
      console.log(error);
    });
};
