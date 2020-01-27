export const logError = ({
  cmp,
  msg = "error message was not specified",
  showInConsole = true
}) => {
  if (showInConsole) {
    console.log(
      `%c  App error in component: ${cmp} , message: ${msg}`,
      `color: indianred`
    );
  }
};

export const configureGlobalErrorHandler = () => {
  window.onerror = (message, source, lineno, colno, error) => {
    const errorName = typeof error === "object" ? error.name : " no name";

    console.log(
      `%c  Global error. \n 
      Source: ${source} , \n 
      Message: ${message}, \n 
      Lineno: ${lineno}, \n 
      Colno: ${colno}, \n 
      Error.name ${errorName}`,
      `color: crimson`
    );
  };
};
