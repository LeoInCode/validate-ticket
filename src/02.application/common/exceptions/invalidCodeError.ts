class InvalidCodeError extends Error {
  constructor() {
    super(`Invalid Code Error: DV`);
    this.name = 'InvalidCodeError';
  }
}

export default InvalidCodeError;
