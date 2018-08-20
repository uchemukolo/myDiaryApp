/*  global document:true, fetch:true, window:true, localStorage:true */
/*  eslint no-undef: "error"  */

const entryId = window.location.search.split('?')[1];
const entryUrl = 'https://mydiary-challenge.herokuapp.com/';
const token = localStorage.getItem('token');
console.log(token);

const entryMsg = document.getElementById('success-msg');
const deleteError = document.getElementById('delete-error');
const entryError = document.getElementById('entry-error');

window.addEventListener('load', () => {
  fetch(`${entryUrl}api/v1/entries`, {
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
      const output = document.getElementById('output');
      if (data.message === 'Entries successfully retrieved from the database') {
        data.entry.forEach((entry) => {
          output.innerHTML += `
          <div id="output" class="card-header">
          <div class="card-header-date">
            <h5 id="display-date">Date: ${entry.createdat}</h5>
          </div>
          <div id="entries">
              <span id="display-entries"><a href="entry-detail.html?${entry.id}"><h5>${entry.title}</h5></a></span>
            <p id="display-entries" class="ellipsis">${entry.entry}</p>
          </div>
          <div class="card-footer">
              <a href="confirm-delete.html?${entry.id}"><button class="display-delete" id="myDelBtn">Delete</button></a>
          </div>
          </div>
            `;
        });
      } else {
        entryError.innerHTML = 'No Entries Yet, click on Add New Entry to add your First Entry';
        setTimeout(() => {
          entryError.innerHTML = '';
        }, 2000);
      }
    })
    .catch((error) => {
      console.log(error);
    });
});

const deleteEntry = () => {
  fetch(`${entryUrl}api/v1/entries/${entryId}`, {
    method: 'DELETE',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      token: `${token}`,
    }
  })
    .then(response => response.json())
    .then((data) => {
      console.log(data);
      if (data.message === 'Entry successfully deleted') {
        entryMsg.innerHTML = data.message;
        setTimeout(() => {
          window.location.href = './entries.html';
          entryMsg.innerHTML = '';
        }, 2000);
      } else {
        deleteError.innerHTML = data.message;
        setTimeout(() => {
          deleteError.innerHTML = '';
        }, 2000);
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

const cancelDelete = () => {
  setTimeout(() => {
    window.location.replace('entries.html');
  }, 500)
    .catch((error) => {
      console.log(error);
    });
};
