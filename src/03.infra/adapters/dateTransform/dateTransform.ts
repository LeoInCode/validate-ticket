import { addHours, format } from 'date-fns';
import { IDateTransform } from './iDateTransform';

class DateTransform implements IDateTransform {
  public addDays(startDate: Date, days: number): Date {
    let newStartDate = startDate;
    if (startDate.getHours() !== new Date().getHours()) {
      newStartDate = addHours(startDate, 2);
    }

    startDate.setDate(newStartDate.getDate() + days);

    return startDate;
  }

  public getOnlyDate(date: Date): string {
    const dateTransformed = format(date, 'yyyy-MM-dd');

    return dateTransformed;
  }
}

export default DateTransform;
