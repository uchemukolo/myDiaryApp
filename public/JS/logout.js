const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('username');
  window.location.href = './logout.html';
};
