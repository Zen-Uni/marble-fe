export enum CodeDictionary {
  SUCCESS = 0,
  PARAMS_ERROR = 98,
  COMMON_ERROR = 99,
  JWT_ERROR__REQUIRED = 100,
  JWT_ERROR__EXPIRED = 101,
}

export interface _Restful {
  code: CodeDictionary;
  message: string;
}
export interface Restful<T> extends _Restful {
  data?: T;
}
