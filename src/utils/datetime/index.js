import { isValid, parseISO } from 'date-fns';
import { toDate, format as _format, zonedTimeToUtc } from 'date-fns-tz';
import { hu } from 'date-fns/locale';

export const format = (datetime = '', format = '', timezone = '', locale = hu) => {
  console.log(zonedTimeToUtc(datetime, 'Europe/Bucharest'));
  // return isValid(new Date(datetime)) ? _format(toDate(datetime), format, { timeZone: timezone, locale }) : '';
  return isValid(new Date(datetime)) ? zonedTimeToUtc(datetime, timezone) : '';
};
