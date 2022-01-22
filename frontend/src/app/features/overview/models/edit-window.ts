export enum EditWindow {
  Oil = 'OIL',
  Water = 'WATER',
  Power = 'POWER',
}

export interface IEditWindowUpdate {
  date: string;
  filled?: number;
  cubicmeter?: number;
  kwh?: number;
  type: EditWindow;
  id: number;
}
