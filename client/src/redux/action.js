// here is should use redux thunk
const submitEmailPassword = (data) => {
  return {
    type: "SUBMIT_EMAIL_PASSWORD",
    payload: {
      email: data.email,
      password: data.password,
    },
  };
};

export { submitEmailPassword };
