const form = document.querySelector('form');
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const loginBtn = document.querySelector('#loginBtn');
const errorMsg = document.querySelector('#error');


const handleResponse = response => response.json()
  .then((json) => {
    if (response.ok) {
      return json;
    } if (!response.ok) {
      throw new Error(JSON.stringify(json));
    }
  });

const sendLoginData = () => {
  fetch('http://sammie-fast-food-fast.herokuapp.com/api/v1/auth/login', {
    method: 'post',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      email: document.querySelector('#email').value,
      password: document.querySelector('#password').value,
    }),
  })
    .then(handleResponse)
    .then((response) => {
      localStorage.setItem('token', `${response.token}`);
      localStorage.setItem('userId', `${response.data.user_id}`);
      localStorage.setItem('username', `${response.data.username}`);
      window.location = './menu.html';
    })
    .catch((error) => {
      errorMsg.innerHTML = (JSON.parse(error.message)).message;
    });
};

loginBtn.addEventListener('click', (event) => {
  event.preventDefault();
  sendLoginData();
  form.reset();
});
