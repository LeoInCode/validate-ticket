class DateTransform {
  public addDays(startDate: Date, days: number): Date {
    startDate.setDate(startDate.getDate() + days);
    return startDate;
  }
}

export default DateTransform;
