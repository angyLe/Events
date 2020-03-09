import { logError } from "./errorLogger";
import { notifyError, notifySuccess } from "../UI/Toast";
import tr from "./translationHelper";
import { APP_SERVER_ERROR } from "../constants";

export const httpGet = ({ url = "", onProgress }) => {
  return new Promise((resolve, reject) => {
    if (!url) reject(new Error("Url must be specified"));

    const xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.setRequestHeader("pragma", "no-cache");

    xhr.onload = () => {
      resolve(xhr);
    };

    xhr.onerror = e => {
      const errorMessage = typeof e === "object" ? e.message : "";
      logError({ cmp: "httpGet", msg: errorMessage });
      reject(new Error("Xhr error"));
    };

    if (typeof onProgress === "function") {
      xhr.onprogress = event => {
        onProgress(event);
      };
    }

    xhr.send();
  });
};

export const httpPost = ({ url, method, dataToSent, onProgress }) => {
  return new Promise((resolve, reject) => {
    if (!url) reject(new Error("Url must be specified"));

    const xhr = new XMLHttpRequest();
    xhr.open(method, url, true);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onload = () => {
      resolve(xhr);
    };

    xhr.onerror = e => {
      const errorMessage = typeof e === "object" ? e.message : "";
      logError({ cmp: "httpPost", msg: errorMessage });
      reject(new Error("Xhr error"));
    };

    if (xhr.upload) {
      xhr.upload.addEventListener("progress", onProgress, false);
    }

    xhr.send(JSON.stringify(dataToSent));
  });
};

const parseResponse = ({ dataToParse }) => {
  let result = null;

  try {
    result = JSON.parse(dataToParse);
  } catch (error) {
    result = null;
  }
  return result;
};

export const getUrlParamsFromArray = ({ ids = [], propertyName = `` }) => {
  let urlParams = "";
  if (!Array.isArray(ids) || ids.length <= 0) {
    return null;
  }
  ids.forEach(e => {
    urlParams += `${propertyName}=${e}&`;
  });
  return urlParams;
};

export const handleServerError = (response, status) => {
  const returnObj = {};
  returnObj.data = null;
  returnObj.appErrorCode = null;
  returnObj.statusCode = status;
  returnObj.errorMessage = "";

  // unauthorized
  if (status === 401) {
    // TODO: redirect to login page with: window.location = "/Account/Login";
    window.location = "/";
  } else if (status === 400) {
    const validErrors = parseResponse({ dataToParse: response });
    returnObj.data = validErrors ? validErrors.validationErrors : {};
    returnObj.errorMessage = tr(APP_SERVER_ERROR.byId(2), "Validation errors");
  } else if (status === 404) {
    const error404transl = tr(
      "Request404Failed",
      "Request failed with status 404"
    );
    returnObj.errorMessage = error404transl;
    notifyError({
      message: error404transl
    });
  } else if (status === 500) {
    const parsedData = parseResponse({ dataToParse: response });
    returnObj.data = parsedData;
    returnObj.appErrorCode =
      typeof parsedData === "object" && parsedData.errorCode
        ? parsedData.errorCode
        : 1;
    const errorMessage = APP_SERVER_ERROR.byId(returnObj.appErrorCode);
    returnObj.errorMessage = tr(errorMessage, errorMessage); //TODO: add error message translations
    notifyError({ message: returnObj.errorMessage });
  } else {
    const errorMessageTranslation = tr(
      "ServerErrorWithStatus",
      `Server error with status: ${status}`
    );

    returnObj.errorMessage = errorMessageTranslation;
    notifyError({ message: errorMessageTranslation });
  }

  return returnObj;
};

export const apiHelper = async args => {
  const { url, method = "get", dataToSent = null, onProgress = null } = args;

  const apiFunc =
    method === "get"
      ? httpGet.bind(this, { url, dataToSent, onProgress })
      : httpPost.bind(this, { url, method, dataToSent });

  let data = null;

  try {
    data = await apiFunc();
  } catch (error) {
    logError({
      cmp: "apiHelper",
      msg: `error.message =${error.message}. Additional custom message: It can be because of server do not respond, CORS problem etc.`
    });
    notifyError({
      message: tr(
        `RequestFailed`,
        `Request failed, probably because of problem with server. Technical information: ${error.message} `
      )
    });

    throw new Error(error);
  }

  const { response, status } = data;

  if (status === 200 || status === 204) {
    if (method === "post") {
      notifySuccess({
        message: tr(`RequestSucceed`, `Data was successfully saved!`)
      });
    }

    return parseResponse({ dataToParse: response });
  }

  const errorData = handleServerError(response, status);

  throw errorData;
};
