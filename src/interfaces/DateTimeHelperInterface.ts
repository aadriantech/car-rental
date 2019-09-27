import DateTimeHelper from '@/helpers/DateTimeHelper';

interface DateTimeHelperInterface {
  today: string;
  todayWithTime: any;
  unixTimeStamp: number;

  getToday(): DateTimeHelper;
  convertTimeToday(time: string, today: string): DateTimeHelper;
  dateTimeToUnix(dateTime: Date): DateTimeHelper;
}

export default DateTimeHelperInterface;
