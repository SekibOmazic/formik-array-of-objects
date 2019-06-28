export enum ObjectiveStatus {
  Proposal = "Proposal",
  Approved = "Approved"
}

export interface KeyResult {
  id?: string;
  title: string;
  completed: boolean;
}

export interface Objective {
  id?: string;
  name: string;
  amount?: number;
  status: ObjectiveStatus;
  keyResults: KeyResult[];
}
