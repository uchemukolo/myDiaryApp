/*  global document:true, fetch:true, window:true, localStorage:true */
/*  eslint no-undef: "error"  */


const entryUrl = 'http://localhost:9001/api/v1';
const token = localStorage.getItem('token');
console.log(token);

const entryError = document.getElementById('entry-error');

window.addEventListener('load', () => {
  fetch(`${entryUrl}/entries`, {
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
        // output = '';
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
              <button class="display-delete" id="myDelBtn">Delete</button>
          </div>
          </div>
            `;
        });
      } else {
        entryError.innerHTML = 'You have not create any Entries, click on Add New Entry to add your First Entry';
      }
    })
    .catch((error) => {
      console.log(error);
    });
});
