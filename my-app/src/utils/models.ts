export interface TaskModel {
  id: number;
  title: string;
  description: string;
  color: string;
  column: number;
  created_at: string;
  updated_at: string;
  imageUrl?: string;
}
