/* eslint-disable import/prefer-default-export */
export const DEFAULT_PADDINGS_CLASS_NAME = "Default-paddings";

export const VALUTA = "NOK";

export const DEFAULT_LANG = "en";

/* See list of flag names: https://react.semantic-ui.com/elements/flag/ */
export const SEMANTIC_UI_FLAGS = { en: "america", nb: "norway" };

/* Icons from https://react.semantic-ui.com. They uses font awesome icons */
export const ICON_NAMES = { pencil: "pencil", add: "add" };

export const APP_SERVER_ERROR = (()=> {
  const errors = {
    1: "UnknownServerError",
    2: "ValidationError",
    10: "RecordNotFound"
  };

  const byId = id => {
    return errors[id];
  };

  const byName = name => {
    return errors.find(el => el === name);
  };

  return {
    byId,
    byName
  };
})();

export const FETCH_STATE = {
  loading: "loading",
  error: "error",
  success: "success"
};

export const SAVING_STATE = {
  saving: "saving",
  error: "error",
  success: "success"
};
