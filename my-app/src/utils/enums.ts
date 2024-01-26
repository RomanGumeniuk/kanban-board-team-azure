export enum ColumnType {
  TO_DO = "TO_DO",
  IN_PROGRESS = "IN_PROGRESS",
  FOR_REVIEW = "FOR_REVIEW",
  COMPLETED = "COMPLETED",
}

function mapColumnTypeToRadioButtonValue(columnType: ColumnType): string {
  switch (columnType) {
    case ColumnType.TO_DO:
      return "1";
    case ColumnType.IN_PROGRESS:
      return "2";
    case ColumnType.FOR_REVIEW:
      return "3";
    case ColumnType.COMPLETED:
      return "4";
    default:
      throw new Error(`Invalid column type: ${columnType}`);
  }
}
export default mapColumnTypeToRadioButtonValue;
