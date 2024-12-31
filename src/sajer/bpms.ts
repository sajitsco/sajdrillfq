export enum ATaskStatus{
    ACTIVE = "ACTIVE",
    PAUSED = "PAUSED",
    COMPLETED = "COMPLETED",
  }
  
  export interface ATask {
    duration: number;
    id: string;
    status: ATaskStatus;
  }

  export interface AccountTree{
    code: number;
    children: AccountTree[];
  }