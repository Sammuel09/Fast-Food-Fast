const form = document.querySelector('form');
const username = document.querySelector('#username');
const email = document.querySelector('#email');
const phone = document.querySelector('#phone');
const address = document.querySelector('#address');
const password = document.querySelector('#password');
const signUpBtn = document.querySelector('#signupBtn');
const errorMsg = document.querySelector('#error');

const handleResponse = response => response.json()
  .then((json) => {
    if (response.ok) {
      return json;
    } if (!response.ok) {
      throw new Error(JSON.stringify(json));
    }
  });

const sendPost = () => {
  fetch('http://sammie-fast-food-fast.herokuapp.com/api/v1/auth/signup', {
    method: 'post',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      username: document.querySelector('#username').value,
      email: document.querySelector('#email').value,
      phone: document.querySelector('#phone').value,
      address: document.querySelector('#address').value,
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

signUpBtn.addEventListener('click', (event) => {
  event.preventDefault();
  sendPost();
});
