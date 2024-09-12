import { HttpStatusCode } from "@angular/common/http";

export interface IAppResponseModel<TValue> {
  isSuccess: boolean;
  statusCode: HttpStatusCode,
  value: TValue
}
