const loginPromise = () => (
  fetch("/isLoggedIn" + location.search, { method: "GET" })
    .then(resp => resp.json())
    .then(resp => {
      if (!resp.loggedIn) {
        window.location.replace("login.html");
      } else {
        return true;
      }
    })
);

export { loginPromise };
