const form = document.querySelector('form');
const name = document.querySelector('#name');
const imageurl = document.querySelector('#image');
const price = document.querySelector('#price');
const postMenuBtn = document.querySelector('#postMenuBtn');
const successMsg = document.querySelector('#successMsg');
const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/dx8yi1fsi/image/upload';
const CLOUDINARY_UPLOAD_PRESET = 'ruamt9zr';


const handleResponse = response => response.json()
  .then((json) => {
    if (response.ok) {
      return json;
    } if (!response.ok) {
      throw new Error(JSON.stringify(json));
    }
  });

const sendFormData = (imgurl) => {
  fetch('https://sammie-fast-food-fast.herokuapp.com/api/v1/menu', {
    method: 'post',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      name: document.querySelector('#name').value,
      imageurl: imgurl,
      price: document.querySelector('#price').value,
    }),
  })
    .then(handleResponse)
    .then((response) => {
      localStorage.setItem('name', `${response.data.rows[0].name}`);
      localStorage.setItem('imageurl', `${response.data.rows[0].imageurl}`);
      localStorage.setItem('price', `${response.data.rows[0].price}`);
      successMsg.innerHTML = response.message;
    })
    .catch((error) => {
      console.log(error);
      successMsg.innerHTML = error;
      // errorMsg.innerHTML = (JSON.parse(error.message)).message;
    });
};

postMenuBtn.addEventListener('click', (event) => {
  event.preventDefault();
  const file = imageurl.files[0];
  console.log(file);
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'savri87we342');
  fetch(CLOUDINARY_URL, {
    method: 'POST',
    body: formData,
  })
    .then(handleResponse)
    .then((res) => {
      const imgurl = res.secureurl;
      console.log(res);
      sendFormData(imgurl);
    })
    .catch((res) => {
      console.log(res);
    });
});

// imageurl.addEventListener('change', (event) => {
//   const file = event.target.files[0];
//   console.log (file);
//   const formData = new FormData();
//   formData.append('file', file);
//   formData.append('upload_preset', 'savri87we342');
//   fetch(CLOUDINARY_URL, {
//     method: 'POST',
//     body: formData,
//   })
//     .then(handleResponse)
//     .then((res) => {
//       console.log(JSON.stringify(res));
//     })
//     .catch((res) => {
//       console.log(res);
//     });
// });

// postMenuBtn.addEventListener('click', (event) => {
//   event.preventDefault();
//   sendFormData();
// });
