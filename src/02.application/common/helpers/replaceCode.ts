class ReplaceCode {
  public static replace(code: string): string {
    return code.replace(/( |\.|-)/g, '');
  }
}

export default ReplaceCode;
