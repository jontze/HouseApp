export interface IAlert {
  msg: string;
  type: string;
  uuid: string;
}

export type AlertType = 'danger' | 'success' | 'info' | 'warning';
