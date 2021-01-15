import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import 'dayjs/locale/hu';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(advancedFormat);
dayjs.extend(localizedFormat);

export const format = (datetime = '', format = '', timezone = '', locale = 'hu') => {
  timezone = timezone ? timezone : dayjs.tz.guess();
  return dayjs(datetime).isValid()
    ? dayjs(datetime)
        .tz(timezone)
        .locale(locale)
        .format(format)
    : '';
};

export const offsetName = (datetime = '', timezone = '', locale = 'hu') => {
  if (!dayjs(datetime).isValid()) return '';
  timezone = timezone ? timezone : dayjs.tz.guess();
  const dtf = new Intl.DateTimeFormat(locale, {
    timeZone: timezone,
    timeZoneName: 'short'
  });
  const result = dtf.formatToParts(new Date(datetime)).find(o => o.type === 'timeZoneName');
  return result && result.value;
};
