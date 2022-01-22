export interface IAlert {
  uuid: string;
  message: string;
  type: IAlertType;
}

export type IAlertType = 'success' | 'danger' | 'warning';
