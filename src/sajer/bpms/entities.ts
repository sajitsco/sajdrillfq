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

  export interface TaskDef {
    code: string;
    label: string;
    opG: string;
    prG: string;
    prtN: string;
    prS: number;
    ocM: string;
  }

  export interface TreeItem {
    selectable?: boolean;
    label: string;
    key: number;
    children?: TreeItem[];
    icon?: string;
    content?: TaskDef;
    body?: string;
    parent?: TreeItem;
    type: number;
  }

