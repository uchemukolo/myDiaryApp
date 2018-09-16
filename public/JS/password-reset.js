/*  global document:true, fetch:true, window:true */
/*  eslint no-undef: "error"  */

const resetUrl = 'https://mydiary-challenge.herokuapp.com/';
const token = localStorage.getItem('token');

const userError = document.getElementById('user-error');
const resetError = document.getElementById('user-error');
const resetMsg = document.getElementById('success-msg');

const forgotPassword = () => {
  const username = document.getElementById('username').value;
  const resetData = {
    username
  };
  console.log(resetData);
  fetch(`${resetUrl}api/v1/auth/password/resetLink`, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify(resetData),
  })
    .then(response => response.json())
    .then((data) => {
      console.log(data);
      if (data.message === 'Password reset link has been sent to your email') {
        resetMsg.innerHTML = data.message;
        window.location.href = './../index.html';
      } else {
        setTimeout(() => {
          userError.innerHTML = data.message;
        }, 5000);
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

const changePassword = () => {
  const password = document.getElementById('pword').value;
  const confirmPassword = document.getElementById('pwords').value;
  const resetPass = {
    password,
    confirmPassword
  };
  fetch(`${resetUrl}api/v1/auth/password/change`, {
    method: 'PUT',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      token: `${token}`,
    },
    body: JSON.stringify(resetPass),
  })
    .then(response => response.json())
    .then((data) => {
      console.log(data);
      if (data.message === 'Password successfully changed, please login with your new password') {
        resetMsg.innerHTML = data.message;
        setTimeout(() => {
          window.location.href = './signin.html';
          resetMsg.innerHTML = '';
        }, 5000);
      } else {
        resetError.innerHTML = data.message;
        setTimeout(() => {
          resetError.innerHTML = '';
        }, 5000);
      }
    }).catch((error) => {
      console.log(error);
    });
};
document.getElementById('forgotBtn').addEventListener('submit', forgotPassword);
