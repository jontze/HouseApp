interface Base {
  id: number;
  date: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Oil extends Base {
  filled: number;
}

export interface Water extends Base {
  cubicmeter: number;
}

export interface Power extends Base {
  kwh: number;
}

interface BaseInput {
  date: string;
}

export interface OilInput extends BaseInput {
  filled: number;
}

export interface WaterInput extends BaseInput {
  cubicmeter: number;
}

export interface PowerInput extends BaseInput {
  kwh: number;
}
