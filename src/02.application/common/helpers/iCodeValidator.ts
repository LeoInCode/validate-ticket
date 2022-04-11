export interface ICodeValidator {
  hasCode(code: string): void;
  isEqualToLength(code: string, length: number): void;
  haveOnlyNumbers(code: string): void;
}
