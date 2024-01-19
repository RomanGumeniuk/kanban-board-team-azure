import { ColumnType } from "./enums";

export interface TaskModel {
  id: number;
  title: string;
  description: string;
  color: string;
  column: ColumnType;
  created_at: string;
  updated_at: string;
}
