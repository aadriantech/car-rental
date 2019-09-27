import DateTimeHelperInterface from '@/interfaces/DateTimeHelperInterface';

class DateTimeHelper implements DateTimeHelperInterface {
  public today: string;
  public todayWithTime: any;
  public unixTimeStamp: number;

  constructor() {
    this.today = '';
    this.todayWithTime = {};
    this.unixTimeStamp = 0;
  }

  /**
   * Retrieves date today
   *
   * @return string
   */
  public getToday(): DateTimeHelper {
    const date = new Date();
    const dd = String(date.getDate()).padStart(2, '0');
    const mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
    const yyyy = date.getFullYear();
    this.today = yyyy + '-' + mm + '-' + dd;

    return this;
  }

  /**
   * Converts time to today's date and time
   *
   * @param today string
   * @param time string
   * @return Date
   */
  public convertTimeToday(time: string, today: string = this.today): DateTimeHelper {
    this.todayWithTime = new Date(today + ' ' + time);

    return this;
  }

  /**
   * Converts date time object to unix timestamp
   *
   * @param dateTime
   */
  public dateTimeToUnix(dateTime: Date = this.todayWithTime) {
    this.unixTimeStamp = dateTime.getTime() / 1000;

    return this;
  }
}

export default DateTimeHelper;
