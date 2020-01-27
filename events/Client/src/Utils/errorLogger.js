export const logError = ({
  component,
  message = "error message was not specified",
  showInConsole = true
}) => {
  if (showInConsole) {
    console.log(
      `%c  App error in component: ${component} , message: ${message}`,
      `color: indianred`
    );
  }
};

export const configureGlobalErrorHandler = () => {
  window.onerror = (message, source, lineno, colno) => {
    const errorName = typeof error === 'object'? error.name: " no name";

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
