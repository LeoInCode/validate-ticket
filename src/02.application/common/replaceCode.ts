const replaceCode = (code: string): string => {
  return code.replace(/( |\.|-)/g, '');
};

export default replaceCode;
