export interface KeyResult {
  id?: string;
  title: string;
  completed: boolean;
}

export interface Objective {
  id?: string;
  name: string;
  amount?: number;
  keyResults: KeyResult[];
}
