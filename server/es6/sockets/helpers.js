const send = (success, message, info) => {
  if (info) {
    return { success, message, info };
  } else {
    return { success, message };
  }
};

export { send };
