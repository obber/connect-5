const dict = "abcdefghijklmnopqrs".split("");

export default (row, column) => {
  return dict[row] + dict[column];
};
