import apiHelper, { httpGet, httpPost, handleServerError } from "./apiHelper";
import * as dependency from "../constants";

const createMockXHR = (responseJSON, readyState) => {
  const mockXHR = {
    open: jest.fn(),
    send: jest.fn(),
    onload: jest.fn(),
    onError: jest.fn(),
    setRequestHeader: jest.fn(),
    readyState: readyState || 4,
    response: responseJSON || {}
  };
  return mockXHR;
};

describe("httpGet test", () => {
  const oldXMLHttpRequest = window.XMLHttpRequest;
  let mockXHR = null;

  beforeEach(() => {
    mockXHR = createMockXHR();
    window.XMLHttpRequest = jest.fn(() => mockXHR);
  });

  afterEach(() => {
    window.XMLHttpRequest = oldXMLHttpRequest;
  });

  test("should return error about than url is not specified", done => {
    const reqPromise = httpPost({ url: null, dataToSent: {} });

    mockXHR.onerror();
    reqPromise.catch(e => {
      expect(e.message).toBe("Url must be specified");
      done();
    });
  });

  test("should return Xhr error if request is failed", done => {
    const reqPromise = httpGet({ url: "someUrl" });

    mockXHR.onerror();
    reqPromise.catch(e => {
      expect(e.message).toBe("Xhr error");
      done();
    });
  });

  test("should return response in result data if request is ok", done => {
    const reqPromise = httpGet({ url: "someUrl" });
    mockXHR.response = [
      { title: "test post 1" },
      { title: "second test post 2" }
    ];
    mockXHR.onload();
    reqPromise.then(posts => {
      expect(posts.response.length).toBe(2);
      done();
    });
  });
});

describe("httpPost test", () => {
  const oldXMLHttpRequest = window.XMLHttpRequest;
  let mockXHR = null;

  beforeEach(() => {
    mockXHR = createMockXHR();
    window.XMLHttpRequest = jest.fn(() => mockXHR);
  });

  afterEach(() => {
    window.XMLHttpRequest = oldXMLHttpRequest;
  });

  test("should return error about than url is not specified", done => {
    const reqPromise = httpPost({ url: null, dataToSent: {} });

    mockXHR.onerror();
    reqPromise.catch(e => {
      expect(e.message).toBe("Url must be specified");
      done();
    });
  });

  test("should return Xhr error if request is failed", done => {
    const reqPromise = httpPost({ url: "someUrl", dataToSent: {} });

    mockXHR.onerror();
    reqPromise.catch(e => {
      expect(e.message).toBe("Xhr error");
      done();
    });
  });

  test("should return response in result data if request is ok", done => {
    const reqPromise = httpPost({ url: "someUrl", dataToSent: {} });
    mockXHR.response = [
      { title: "test post 1" },
      { title: "second test post 2" }
    ];
    mockXHR.onload();
    reqPromise.then(posts => {
      expect(posts.response.length).toBe(2);
      done();
    });
  });
});

describe("handleServerError test", () => {
  beforeEach(() => {
    dependency.APP_SERVER_ERROR = {};
  });

  const response = [
    {
      id: 1,
      title: "Title",
      shortDescription: "Short description",
      text: "Text",
      dateTimeFrom: "2020-01-29T09:01:06.3457486Z",
      phone: "00000000",
      address: "Some"
    }
  ];

  it("should return object with correct data and status 400 if status is 400", () => {
    dependency.APP_SERVER_ERROR.byId = () => 2;

    const result = handleServerError(JSON.stringify(response), 400);

    expect(result).toEqual({
      data: response,
      appErrorCode: null,
      statusCode: 400,
      errorMessage: "Validation errors"
    });
  });

  it("should default data if request is 401", () => {
    dependency.APP_SERVER_ERROR.byId = () => 2;

    const result = handleServerError(JSON.stringify(response), 401);

    expect(result).toEqual({
      data: null,
      appErrorCode: null,
      statusCode: 401,
      errorMessage: ""
    });
  });

  it("should return object with correct data and status 404 if status is 404", () => {
    dependency.APP_SERVER_ERROR.byId = () => null;

    const result = handleServerError(JSON.stringify(response), 404);

    expect(result).toEqual({
      data: null,
      appErrorCode: null,
      statusCode: 404,
      errorMessage: "Request failed with status 404"
    });
  });

  it("should return object with correct data and status, if status is not handled in function", () => {
    dependency.APP_SERVER_ERROR.byId = () => null;
    const result = handleServerError(JSON.stringify(response), 301);

    expect(result).toEqual({
      data: null,
      appErrorCode: null,
      statusCode: 301,
      errorMessage: `Server error with status: ${301}`
    });
  });

  it("should return object with correct data, appErrorCode from server and status 500 if status is 500", () => {
    dependency.APP_SERVER_ERROR.byId = () => "RecordNotFound";

    const responseWithError = {
      errorCode: 10
    };

    const result = handleServerError(JSON.stringify(responseWithError), 500);

    expect(result).toEqual({
      data: responseWithError,
      appErrorCode: 10,
      statusCode: 500,
      errorMessage: "RecordNotFound"
    });
  });

  it("should return object with correct data, status 500, errorCode == 1, if status is 500 but errorCode is missing", () => {
    dependency.APP_SERVER_ERROR.byId = () => "UnknownServerError";

    const responseWithError = {
      data: {}
    };

    const result = handleServerError(JSON.stringify(responseWithError), 500);

    expect(result).toEqual({
      data: responseWithError,
      appErrorCode: 1,
      statusCode: 500,
      errorMessage: "UnknownServerError"
    });
  });
});
