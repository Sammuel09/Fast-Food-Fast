const form = document.querySelector('form');
const username = document.querySelector('#username');
const email = document.querySelector('#email');
const phone = document.querySelector('#phone');
const address = document.querySelector('#address');
const password = document.querySelector('#password');
const signUpBtn = document.querySelector('#signupBtn');


function handleResponse(response) {
  return response.json()
    .then((json) => {
      if (response.ok) {
        return json;
      } if (!response.ok) {
        return Promise.reject(Object.assign(
          {}, json,
          { status: response.status, statusText: response.statusText },
        ));
      }
    });
}

const sendPost = () => fetch('http://localhost:3000/api/v1/auth/signup', {
  method: 'post',
  headers: {
    'content-type': 'application/json',
    'mode': 'no-cors'
  },
  body: JSON.stringify({
    username: document.querySelector('#username').value,
    email: document.querySelector('#email').value,
    phone: document.querySelector('#phone').value,
    address: document.querySelector('#address').value,
    password: document.querySelector('#password').value,
  }),
})
  .then(response => handleResponse())
  .then(data => console.log('data is', data))
  .catch(error => console.log(error));

signUpBtn.addEventListener('click', (event) => {
  event.preventDefault();
  sendPost();
});
