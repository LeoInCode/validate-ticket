class DifferentLengthError extends Error {
  constructor(length: number) {
    super(`Different length: ${length}`);
    this.name = 'DifferentLengthError';
  }
}

export default DifferentLengthError;
