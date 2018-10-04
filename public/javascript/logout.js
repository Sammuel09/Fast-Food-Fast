const logoutBtn = document.querySelector('#logout');

const logout = () => {
  localStorage.clear();
};

logoutBtn.addEventListener('click', () => {
  logout();
});
