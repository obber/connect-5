const send = (success, message, info) => {
  if (info) {
    return { success, message, info };
  }

  return { success, message };
};

export { send };
