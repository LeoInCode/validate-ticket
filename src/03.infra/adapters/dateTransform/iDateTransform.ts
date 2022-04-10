export interface IDateTransform {
  addDays(startDate: Date, days: number): Date;
  getOnlyDate(date: Date): string;
}
