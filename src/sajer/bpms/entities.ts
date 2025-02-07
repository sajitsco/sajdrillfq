export enum ATaskStatus{
    ACTIVE = "ACTIVE",
    PAUSED = "PAUSED",
    COMPLETED = "COMPLETED",
  }
  
  export interface ATask {
    duration: number;
    id: string;
    status: ATaskStatus;
    description: string;
    task: Task;
    inpts: Resource[];
    otpts: Resource[];
  }

  export interface Resource{
    type: string;
    countable: boolean;
    title: string;
    id: string;
    data: unknown;
    count: number;
  }

  export interface TreeItem {
    selectable?: boolean;
    label: string;
    key: number;
    children?: TreeItem[];
    icon?: string;
    content?: Task;
    body?: string;
    parent?: TreeItem;
    type: number;
  }

  export interface Task {
    id: string;
    code: number;
    name: string;
    grp: string;
    subgroup: string;
  }

  export interface Files {
    id: string;
    name: string;
  }

