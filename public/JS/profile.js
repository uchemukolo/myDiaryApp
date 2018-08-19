/*  global document:true, fetch:true, window:true, localStorage:true */
/*  eslint no-undef: "error"  */

const username = document.getElementById('username');
username.innerHTML = localStorage.getItem('username');

const profileUrl = 'https://mydiary-challenge.herokuapp.com';
const token = localStorage.getItem('token');
console.log(token);
const userName = document.getElementById('profile-username');
const firstName = document.getElementById('first-name');
const lastName = document.getElementById('last-name');
const email = document.getElementById('user-email');
const joined = document.getElementById('joined');
const entryMsg = document.getElementById('entry-error');
const userMsg = document.getElementById('user-error');


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
      if (data.message === 'Entries successfully retrieved from the database') {
        document.getElementById('total-entries').innerHTML = data.entry.length;
      } else {
        entryMsg.innerHTML = data.message;
        setTimeout(() => {
          entryMsg.innerHTML = '';
        }, 2000);
      }
    })
    .catch((error) => {
      console.log(error);
    });
});

window.addEventListener('load', () => {
  fetch(`${profileUrl}/auth/profile`, {
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
      if (data.message === 'Profile successfully retrieved') {
        setTimeout(() => {
          userName.innerHTML = data.profile.username;
          firstName.innerHTML = data.profile.firstName;
          lastName.innerHTML = data.profile.lastName;
          email.innerHTML = data.profile.email;
          joined.innerHTML = data.profile.joinedSince;
          userMsg.innerHTML = data.message;
          userMsg.innerHTML = '';
        }, 2000);
      } else {
        userMsg.innerHTML = data.message;
        setTimeout(() => {
          userMsg.innerHTML = '';
        }, 2000);
      }
    })
    .catch((error) => {
      console.log(error);
    });
});

const updateProfile = () => {
  firstName.contentEditable = true;
  lastName.contentEditable = true;
};

const modifyProfile = () => {
  firstName.contentEditable = false;
  lastName.contentEditable = false;
  const modify = {
    firstName: firstName.textContent,
    lastName: lastName.textContent
  };
  fetch(`${profileUrl}/auth/profile/update`, {
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
      if (data.message === 'Profile updated sucessfully') {
        userMsg.innerHTML = data.message;
        setTimeout(() => {
          window.location.reload(true);
          userMsg.innerHTML = '';
        }, 2000);
      } else {
        userMsg.innerHTML = data.message;
        setTimeout(() => {
          userMsg.innerHTML = '';
        }, 2000);
      }
    }).catch((error) => {
      console.log(error);
    });
};
