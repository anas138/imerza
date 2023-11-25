document.getElementById('password').addEventListener('input', (e) => {
  e.target.setCustomValidity('');
});

document.getElementById('login-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  fetch(location.pathname + location.search, {
    body: JSON.stringify({
      username: formData.get('username'),
      password: formData.get('password'),
    }),
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.error) {
        document
          .getElementById('password')
          .setCustomValidity('Password is incorrect');
      }
      if (res.redirect_uri) {
        location.href = res.redirect_uri;
      }
    });
  return false;
});
