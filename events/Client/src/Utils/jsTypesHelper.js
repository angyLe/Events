export const getObj = obj => (typeof obj === "object" && obj ? obj : {});

export const objIsEmpty = obj =>
  typeof obj === "object" && obj ? !(Object.keys(obj).length > 0) : true;

export const getObjLength = obj =>
  typeof obj === "object" && obj ? Object.keys(obj).length : 0;

export const getObjElementByIndex = (obj, index) =>
  typeof obj === "object" && obj && typeof index === "number"
    ? obj[Object.keys(obj)[0]]
    : null;
