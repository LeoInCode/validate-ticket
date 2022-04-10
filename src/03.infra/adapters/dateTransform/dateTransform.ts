import { format } from 'date-fns';
import { IDateTransform } from './iDateTransform';

class DateTransform implements IDateTransform {
  public addDays(startDate: Date, days: number): Date {
    startDate.setDate(startDate.getDate() + days);
    return startDate;
  }

  public getOnlyDate(date: Date): string {
    const dateIncremented = this.addDays(date, 1);
    const dateTransformed = format(dateIncremented, 'yyyy-MM-dd');

    return dateTransformed;
  }
}

export default DateTransform;
