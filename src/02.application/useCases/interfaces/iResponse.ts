export interface IResponse {
  statusCode: number;
  data: {
    barCode?: string;
    amount?: string;
    expirationDate?: string;
    message?: string;
  };
}
