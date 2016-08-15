const loginPromise = () => (
  fetch("/isLoggedIn" + location.search, {
    method: "GET",
    headers: {
      c5Id: localStorage.getItem("c5Id") || undefined,
      c5Token: localStorage.getItem("c5Token") || undefined
    }
  })
    .then(resp => resp.json())
    .then(resp => {
      if (!resp.loggedIn) {
        window.location.replace("login.html");
        return false;
      } else {
        localStorage.setItem("c5Id", resp.id);
        localStorage.setItem("c5Token", resp.token);
        return true;
      }
    })
);

window.clearStore = () => {
  delete localStorage["c5Id"];
  delete localStorage["c5Token"];
  return true;
};

export { loginPromise };
