import { logError } from "./errorLogger";
import { notifyError } from "../UI/Toast";
import tr from "./translationHelper";
import { APP_SERVER_ERROR } from "../constants";

const httpGet = ({ url, onProgress }) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.open("GET", url, true);
    xhr.setRequestHeader("pragma", "no-cache");

    xhr.onload = function() {
      resolve(this);
    };

    xhr.onerror = e => {
      logError({ cmp: "httpGet", msg: e.message });
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

const httpPost = ({ url, method, dataToSent, onProgress }) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.open(method, url, true);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onload = () => {
      console.log(this);
      console.log(this);
      resolve(this);
    };
    // xhr error
    xhr.onerror = e => {
      logError({ cmp: "httpPost", msg: e.message });
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
  console.log(dataToParse);

  try {
    result = JSON.parse(dataToParse);
    console.log(JSON.parse(dataToParse));
  } catch (error) {
    result = null;
  }

  console.log("result");
  console.log(result);
  return result;
};

const handleServerError = (response, status) => {
  console.log("handleServerError");

  const returnObj = {};
  returnObj.data = null;
  returnObj.appErrorCode = null;
  returnObj.statusCode = status;

  // unauthorized
  if (status === 401) {
    // TODO: redirect to login page with: window.location = "/Account/Login";
    window.location = "/";
  } else if (status === 400) {
    returnObj.data = parseResponse({ dataToParse: response });
    returnObj.errorMessage = tr(APP_SERVER_ERROR.byId(2), "Validation errors");
  } else if (status === 404) {
    const error404transl = tr(
      "Request404Failed",
      "Request failed with status 404"
    );
    returnObj.errorMessage = tr(APP_SERVER_ERROR.byId(2), "Validation errors");
    notifyError({
      message: error404transl
    });
  } else {
    let parsedData = null;
    let errorCode = 1;

    if (status === 500) {
      parsedData = parseResponse({ dataToParse: response });
      returnObj.data = parsedData;
      returnObj.errorMessage = 
      returnObj.appErrorCode = typeof parsedData === "object" ? parsedData.errorCode : 1;
      errorCode = 
    }

    const errorMessage = APP_SERVER_ERROR[errorCode];
    const errorMessageTranslation = tr(errorMessage, " Server error!");

    console.log("errorMessageTranslation");
    console.log(errorMessageTranslation);

    notifyError({ message: errorMessageTranslation });
  }
  return returnObj;
};

const apiHelper = async args => {
  const { url, method = "get", dataToSent = null, onProgress = null } = args;

  if (!url) {
    logError({ cmp: "apiHelper", msg: "Url param is not defined" });
    return null;
  }

  const apiFunc =
    method === "get"
      ? httpGet.bind(this, { url, dataToSent, onProgress })
      : httpPost.bind(this, url, method, dataToSent);

  let data = null;
  try {
    data = await apiFunc();
  } catch (error) {
    logError({ cmp: "apiHelper", msg: error.message });
    notifyError({ message: tr(`RequestFailed`, `Request failed.`) });
    return null;
  }
  console.log("data");
  console.log(data);

  const { response, status } = data;

  console.log(status);
  console.log(response);

  if (status === 200 || status === 204) {
    return parseResponse({ dataToParse: response });
  }

  const errorData = handleServerError(response, status);
  throw errorData;
};

export default apiHelper;
