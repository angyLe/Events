import dayjs from "dayjs";
import en from "dayjs/locale/en";
import isBetween from "dayjs/plugin/isBetween";

const DateTimeProvider = (() => {
  const init = () => {
    dayjs.locale({
      ...en,
      weekStart: 1
    });

    dayjs.extend(isBetween);
  };
  const getDateAsIsoString = date => {
    if (!date || !dayjs(date).isValid()) return null;

    return dayjs(date).toISOString();
  };

  const getDate = date => {
    if (!date) return dayjs();

    if (!dayjs(date).isValid()) return null;

    return dayjs(date);
  };

  const getEndOfCurrentPeriod = (date, periodType) => {
    if (!date) return null;
    if (!dayjs(date).isValid()) return null;

    return dayjs(date).endOf(periodType);
  };

  const getStartOfCurrentPeriod = (date, periodType) => {
    if (!date) return null;
    if (!dayjs(date).isValid()) return null;

    return dayjs(date).startOf(periodType);
  };

  const addDate = (date, period, periodType) => {
    if (!date) return null;
    if (!dayjs(date).isValid()) return null;

    const nextPeriod = dayjs(date).add(period, periodType);
    const nextPeriodStartOfDay = dayjs(nextPeriod).startOf("day");

    return nextPeriodStartOfDay;
  };

  const subtractDate = (date, period, periodType) => {
    if (!date) return null;
    if (!dayjs(date).isValid()) return null;

    const prevPeriod = dayjs(date).subtract(period, periodType);
    const prevPeriodStartOfDay = dayjs(prevPeriod).endOf("day");

    return prevPeriodStartOfDay;
  };

  const dayIsBefore = ({ date, dateToCompareWith }) => {
    if (!date || !dateToCompareWith) return null;
    if (!dayjs(date).isValid() || !dayjs(dateToCompareWith).isValid())
      return null;
    return dayjs(date).isBefore(dayjs(dateToCompareWith));
  };

  const dayIsAfter = ({ date, dateToCompareWith }) => {
    if (!date || !dateToCompareWith) return null;
    if (!dayjs(date).isValid() || !dayjs(dateToCompareWith).isValid())
      return null;
    return dayjs(date).isAfter(dayjs(dateToCompareWith));
  };

  const dayIsTheSame = ({ date, dateToCompareWith }) => {
    if (!date || !dateToCompareWith) return null;
    if (!dayjs(date).isValid() || !dayjs(dateToCompareWith).isValid())
      return null;
    return dayjs(date).isSame(dayjs(dateToCompareWith));
  };

  const dayIsBetween = (date, dateFrom, dateTo) => {
    return dayjs(date).isBetween(dateFrom, dateTo);
  };

  const getFormat = (date, format) => {
    if (!date) return null;
    if (!dayjs(date).isValid()) return null;

    return dayjs(date).format(format);
  };

  init();

  return {
    init,
    getEndOfCurrentPeriod,
    getStartOfCurrentPeriod,
    getDateAsIsoString,
    getDate,
    addDate,
    subtractDate,
    dayIsBefore,
    dayIsAfter,
    dayIsTheSame,
    dayIsBetween,
    getFormat
  };
})();

export default DateTimeProvider;
