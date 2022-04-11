class IsNotANumberError extends Error {
  constructor(code: string) {
    super(`Is not a number: ${code}`);
    this.name = 'IsNotANumberError';
  }
}

export default IsNotANumberError;
