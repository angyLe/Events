import dayjs from "dayjs";
import DateTimeProvider from "./dateTimeProvider";
import { DAY_PERIOD_TYPE } from "../constants";

describe.only("test dateTimeProvider", () => {
  it("should return date", () => {
    const result = DateTimeProvider.getDate("2020-01-26T02:00:00.000Z");
    expect(DateTimeProvider.getDateAsIsoString(result)).toEqual(
      "2020-01-26T02:00:00.000Z"
    );
  });

  it("should return null if date is invalid", () => {
    const result = DateTimeProvider.getDate("bla");
    expect(result).toEqual(null);
  });

  it("should return null if date is invalid", () => {
    const result = DateTimeProvider.getDateAsIsoString("20/01/2020");
    expect(result).toEqual(null);
  });

  it("should return isoString", () => {
    const str = "2018-04-04T16:00:00.000Z";
    const result = DateTimeProvider.getDateAsIsoString(dayjs(str));
    expect(result).toEqual(str);
  });

  it(`should return end of the current a day`, () => {
    const result = DateTimeProvider.getEndOfCurrentPeriod(
      "2020-02-04T02:00:00.000Z",
      DAY_PERIOD_TYPE.day
    );
    expect(
      DateTimeProvider.getDateAsIsoString("2020-02-04T22:59:59.999Z")
    ).toEqual(DateTimeProvider.getDateAsIsoString(result));
  });

  it(`should return end of current week`, () => {
    const result = DateTimeProvider.getEndOfCurrentPeriod(
      "2020-02-04T02:00:00.000Z",
      DAY_PERIOD_TYPE.week
    );
    expect(DateTimeProvider.getDateAsIsoString(result)).toEqual(
      "2020-02-09T22:59:59.999Z"
    );
  });

  it(`should return sunday as the end of the current week`, () => {
    const result = DateTimeProvider.getEndOfCurrentPeriod(
      "2020-01-26T02:00:00.000Z",
      DAY_PERIOD_TYPE.week
    );
    expect(DateTimeProvider.getDateAsIsoString(result)).toEqual(
      "2020-01-26T22:59:59.999Z"
    );
  });

  it(`should return 29.02 if leap it is year`, () => {
    const result = DateTimeProvider.getEndOfCurrentPeriod(
      "2020-02-04T02:00:00.000Z",
      DAY_PERIOD_TYPE.month
    );
    expect(DateTimeProvider.getDateAsIsoString(result)).toEqual(
      "2020-02-29T22:59:59.999Z"
    );
  });

  it(`should return end of the current month`, () => {
    const result = DateTimeProvider.getEndOfCurrentPeriod(
      "2020-03-04T02:00:00.000Z",
      DAY_PERIOD_TYPE.month
    );
    expect(DateTimeProvider.getDateAsIsoString(result)).toEqual(
      "2020-03-31T21:59:59.999Z"
    );
  });

  it(`should add a day to 15.02 and return start of 16.02 `, () => {
    const result = DateTimeProvider.addDate("2020-02-15T13:02:00", 1, "day");
    expect(result.format("DD.MM, HH.m A")).toEqual("16.02, 00.0 AM");
  });

  it(`should add a day`, () => {
    const result = DateTimeProvider.addDate("2020-03-04T23:30:00", 1, "day");
    expect(result.format("DD.MM, HH.m A")).toEqual("05.03, 00.0 AM");
  });

  it(`should add a month`, () => {
    const result = DateTimeProvider.addDate("2020-03-04T02:00:00", 1, "month");
    expect(result.format("DD.MM, HH.m A")).toEqual("04.04, 00.0 AM");
  });

  it(`should return 30.04 if 1 month is added to 31.03`, () => {
    const result = DateTimeProvider.addDate("2020-03-31T02:00:00", 1, "month");
    expect(result.format("DD.MM, HH.m A")).toEqual("30.04, 00.0 AM");
  });

  it(`should add a week`, () => {
    const result = DateTimeProvider.addDate("2020-02-04T02:00:00", 1, "week");
    expect(result.format("DD.MM, HH.m A")).toEqual("11.02, 00.0 AM");
  });

  it(`should subtract a day and return end of the day `, () => {
    const result = DateTimeProvider.subtractDate(
      "2020-02-15T13:02:00",
      1,
      "day"
    );
    expect(result.format("DD.MM, HH.m A")).toEqual("14.02, 23.59 PM");
  });

  it(`should subtract a month`, () => {
    const result = DateTimeProvider.subtractDate(
      "2020-03-04T02:00:00",
      1,
      "month"
    );
    expect(result.format("DD.MM, HH.m A")).toEqual("04.02, 23.59 PM");
  });

  it(`should subtract a week`, () => {
    const result = DateTimeProvider.subtractDate(
      "2020-02-04T02:00:00",
      1,
      "week"
    );
    expect(result.format("DD.MM, HH.m A")).toEqual("28.01, 23.59 PM");
  });

  it(`should return true if day is before dayToCompareWith `, () => {
    const result = DateTimeProvider.dayIsBefore({
      date: "2020-02-03T02:00:00.000Z",
      dateToCompareWith: "2020-02-04T02:00:00.000Z"
    });
    expect(result).toEqual(true);
  });

  it(`should return false if day is not before dayToCompareWith `, () => {
    const result = DateTimeProvider.dayIsBefore({
      date: "2020-02-06T02:00:00.000Z",
      dateToCompareWith: "2020-02-04T02:00:00.000Z"
    });
    expect(result).toEqual(false);
  });

  it(`should return true if day is 1 minute before dayToCompareWith `, () => {
    const result = DateTimeProvider.dayIsBefore({
      date: "2020-02-03T02:00:00",
      dateToCompareWith: "2020-02-03T02:01:00"
    });
    expect(result).toEqual(true);
  });

  it(`should return null if date is invalid `, () => {
    const result = DateTimeProvider.dayIsBefore({
      date: "",
      dateToCompareWith: "2020-02-04T02:00:00.000Z"
    });
    expect(result).toEqual(null);
  });

  it(`should return null if dateToCompareWith is invalid `, () => {
    const result = DateTimeProvider.dayIsBefore({
      date: "2020-02-04T02:00:00.000Z",
      dateToCompareWith: null
    });
    expect(result).toEqual(null);
  });

  it(`should return true if day is after dayToCompareWith when dayIsAfter is used `, () => {
    const result = DateTimeProvider.dayIsAfter({
      date: "2020-02-03T02:30:00",
      dateToCompareWith: "2020-02-01T02:00:00.000Z"
    });
    expect(result).toEqual(true);
  });

  it(`should return false if day is not after dayToCompareWith when dayIsAfter is used `, () => {
    const result = DateTimeProvider.dayIsAfter({
      date: "2020-02-02T02:00:00",
      dateToCompareWith: "2020-02-04T02:00:00"
    });
    expect(result).toEqual(false);
  });

  it(`should return true if day is 1 minute after dayToCompareWith when dayIsAfter is uded `, () => {
    const result = DateTimeProvider.dayIsAfter({
      date: "2020-02-03T02:01:00",
      dateToCompareWith: "2020-02-03T02:00:00"
    });
    expect(result).toEqual(true);
  });

  it(`should return null if date is invalid when dayIsAfter is used `, () => {
    const result = DateTimeProvider.dayIsAfter({
      date: "",
      dateToCompareWith: "2020-02-04T02:00:00.000Z"
    });
    expect(result).toEqual(null);
  });

  it(`should return null if dateToCompareWith is invalid when dayIsAfter is used `, () => {
    const result = DateTimeProvider.dayIsAfter({
      date: "2020-02-04T02:00:00.000Z",
      dateToCompareWith: null
    });
    expect(result).toEqual(null);
  });

  it(`should return true if daytime is the same`, () => {
    const result = DateTimeProvider.dayIsTheSame({
      date: "2020-02-03T02:00:00",
      dateToCompareWith: "2020-02-03T02:00:00"
    });
    expect(result).toEqual(true);
  });

  it(`should return false if daytime is the same as dayToCompareWith  when dayIsBefore used`, () => {
    const result = DateTimeProvider.dayIsBefore({
      date: "2020-02-03T02:00:00",
      dateToCompareWith: "2020-02-03T02:00:00"
    });
    expect(result).toEqual(false);
  });

  it(`should return false if daytime is the same as dayToCompareWith  when dayIsAfter used`, () => {
    const result = DateTimeProvider.dayIsAfter({
      date: "2020-02-03T02:00:00",
      dateToCompareWith: "2020-02-03T02:00:00"
    });
    expect(result).toEqual(false);
  });
});
