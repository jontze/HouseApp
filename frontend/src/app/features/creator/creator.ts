export interface IAlert {
  msg: string;
  type: AlertType;
  uuid: string;
}

export type AlertType = 'danger' | 'success' | 'info' | 'warning';
