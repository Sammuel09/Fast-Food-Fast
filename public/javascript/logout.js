const logoutBtn = document.querySelector('#logout');

const logout = () => {
  localStorage.removeItem('token');
};

logoutBtn.addEventListener('click', () => {
  logout();
});
