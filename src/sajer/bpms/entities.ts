import type { QTreeNode } from "quasar";

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

  export interface TreeItem extends QTreeNode{
    key: number;
    icon?: string;
    content?: unknown;
    parent?: TreeItem;
    type: number;
    level: number;
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

