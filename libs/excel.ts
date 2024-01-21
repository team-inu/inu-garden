import * as XLSX from 'xlsx';

type HeaderPosition = {
  fromRow: string,
  fromColumn: string,
  toRow: string,
  toColumn: string,
};

export type Table = Array<Array<any>>

const MAX_EXCEL_ROWS = 1_048_576

export const tableToObject = (headers: string[], rows: Table) => {
  return rows.map(row => {
    const obj: any = {}
    headers.forEach((header, i) => {
      obj[header] = row[i]
    })
    return obj
  })
}


// TODO: refactor
export const worksheetToTables = async (worksheet: XLSX.WorkSheet): Promise<Table[]> => {
  // convert worksheet to 'value by column by row map', and 'positions of headers'
  const valueByColumnByRow: Map<string, Map<string, any>> = new Map()

  const headerPositions: HeaderPosition[] = [];

  Object.entries(worksheet).forEach(([rowColumn, { v: value }]) => {
    if (value === undefined) return;

    const [columnIndex, rowIndex] = rowColumn.split(/(\d+)/);

    let valueByColumn = valueByColumnByRow.get(rowIndex);
    if (!valueByColumn) {
      const newValueByColumnMap = new Map()
      valueByColumnByRow.set(rowIndex, newValueByColumnMap)
      valueByColumn = newValueByColumnMap
    }

    valueByColumn?.set(columnIndex, value)

    const isFirstHeader = typeof value === 'string' && value.startsWith('_');
    if (isFirstHeader) {
      const headerPosition: HeaderPosition = {
        fromColumn: columnIndex,
        fromRow: rowIndex,
        toColumn: columnIndex,
        toRow: rowIndex,
      }

      headerPositions.push(headerPosition)
    } else {
      const headerPosition = headerPositions[headerPositions.length - 1] as HeaderPosition | undefined
      if (!headerPosition) return;

      const prevCol = headerPosition.toColumn
      const prevRow = headerPosition.toRow

      // TODO: handle AA AB ...
      const isSameAsPrevRow = Number(rowIndex) === Number(prevRow)
      const isNextToPrevColumn = columnIndex.charCodeAt(columnIndex.length - 1) - prevCol.charCodeAt(columnIndex.length - 1) === 1;

      if (isSameAsPrevRow && isNextToPrevColumn) {
        headerPosition.toColumn = columnIndex
        headerPosition.toRow = rowIndex
      }
    }

  })

  // convert 'value by column by row map' and 'positions of headers' to tables
  const tables: Table[] = []

  for (const { fromColumn, toColumn, fromRow } of headerPositions) {
    const table: Table = [];

    const columnAmount = toColumn.charCodeAt(toColumn.length - 1) - fromColumn.charCodeAt(fromColumn.length - 1) + 1

    rowLoop:
    for (let currentRow = 0; currentRow < MAX_EXCEL_ROWS; currentRow++) {

      const columnData = [];
      for (let currentColumn = 0; currentColumn < columnAmount; currentColumn++) {
        const from = fromColumn.charCodeAt(fromColumn.length - 1)
        const columnPosition = String.fromCharCode(from + currentColumn)
        const value = valueByColumnByRow.get(String(Number(fromRow) + currentRow))?.get(columnPosition)

        columnData.push(value)
      }
  
      const isOutOfTable = columnData.every(e => e === undefined)
      const isFirstHeaderOfOtherTable = (currentRow != 0 && typeof columnData[0] === 'string' && columnData[0].startsWith('_'))
      if (isOutOfTable || isFirstHeaderOfOtherTable) {
        break rowLoop
      }

      table.push(columnData)
    }

    tables.push(table)
  }

  return tables;
};
