const adminBtn = document.querySelector('#admin');
const adminMsg = document.querySelector('#adminMsg');

const adminSection = () => {
  const usertype = localStorage.getItem('userId');
  console.log(usertype);
  if (usertype === '1') {
    window.location = 'admin.html';
  } else if (usertype !== 1) {
    adminMsg.innerHTML = '<p>only admin can access this section</p>';
    setTimeout(() => {
      adminMsg.innerHTML = '';
    }, 1200);
  }
};


adminBtn.addEventListener('click', adminSection);
