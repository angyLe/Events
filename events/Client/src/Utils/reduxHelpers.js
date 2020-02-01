// eslint-disable-next-line import/prefer-default-export
export const getParam = (ownProps, property) =>
  ownProps &&
  ownProps.match &&
  ownProps.match.params &&
  ownProps.match.params[property]
    ? ownProps.match.params[property]
    : null;
