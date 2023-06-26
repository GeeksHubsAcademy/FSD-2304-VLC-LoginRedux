export const inputHandler = ({ target }, state) => {
  let { name, value } = target;
  state((prevState) => ({
    ...prevState,
    [name]: value,
  }));
};
