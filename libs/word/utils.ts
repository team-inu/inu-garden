import { TableCell, Paragraph } from "docx";

export const createCell = (
  text: string,
  rowSpan: number = 1,
  colSpan: number = 1
) => {
  return new TableCell({
    children: [new Paragraph(text)],
    rowSpan: rowSpan,
    columnSpan: colSpan,
  });
};
