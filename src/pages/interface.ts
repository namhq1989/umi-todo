// Khai báo các interface dùng chung cho toàn app
export interface TodoRecord {
  _id: string;
  content: string;
  isComplete: boolean;
}

export interface TodoState {
  list: TodoRecord[];
  selectedItem: TodoRecord | null;
}
