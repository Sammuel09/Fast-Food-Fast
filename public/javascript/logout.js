const logoutBtn = document.querySelector('#logout');

const logout = () => {
  localStorage.clear();
  window.location = './signIn.html';
};

logoutBtn.addEventListener('click', () => {
  logout();
});
