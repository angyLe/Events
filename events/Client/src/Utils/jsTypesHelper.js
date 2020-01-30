export const getObj = obj => (typeof obj === "object" && obj ? obj : {});

export const objIsEmpty = obj =>
  typeof obj === "object" && obj ? !(Object.keys(obj).length > 0) : true;
