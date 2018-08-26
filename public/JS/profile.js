/*  global document:true, fetch:true, window:true, localStorage:true */
/*  eslint no-undef: "error"  */

const username = document.getElementById('username');
username.innerHTML = localStorage.getItem('username');

const profileUrl = 'https://mydiary-challenge.herokuapp.com/';
const token = localStorage.getItem('token');
console.log(token);


const userName = document.getElementById('profile-username');
const firstName = document.getElementById('first-name');
const lastName = document.getElementById('last-name');
const userEmail = document.getElementById('user-email');
const joined = document.getElementById('joined');
const entryMsg = document.getElementById('entry-error');
const userMsg = document.getElementById('user-error');


window.addEventListener('load', () => {
  fetch(`${profileUrl}api/v1/entries`, {
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
      } else {
        entryMsg.innerHTML = data.message;
        document.getElementById('total-entries').innerHTML = 0;

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
  fetch(`${profileUrl}api/v1/auth/profile`, {
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
          const createdMonth = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
          const [yearCreated, monthCreated, dayCreated] = data.profile.joinedSince.split('-');

          userName.innerHTML = data.profile.username;
          firstName.innerHTML = data.profile.firstName;
          lastName.innerHTML = data.profile.lastName;
          userEmail.innerHTML = data.profile.email;
          joined.innerHTML = `${dayCreated.slice(0, 2)} - ${createdMonth[monthCreated - 1]} - ${yearCreated.slice(0, 4)}`;
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
  fetch(`${profileUrl}api/v1/auth/profile/update`, {
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

const subscribe = (e) => {
  e.preventDefault();
  const email = document.getElementById('notify-email').value;
  const name = document.getElementById('name').value;
  const reminderMsg = document.getElementById('success-msg');
  const reminderData = {
    name,
    email,
  };
  console.log(reminderData);

  fetch(`${profileUrl}api/v1/auth/reminder`, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      token: `${token}`,
    },
    body: JSON.stringify(reminderData),
  })
    .then(response => response.json())
    .then((remindData) => {
      console.log('>>>>>>>>>>>>', remindData);
      if (remindData.message === 'Request for Daily Reminder Successful') {
        reminderMsg.innerHTML = remindData.message;
        setTimeout(() => {
          reminderMsg.innerHTML = '';
        }, 5000);
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

document.getElementById('reminderForm').addEventListener('submit', subscribe);

