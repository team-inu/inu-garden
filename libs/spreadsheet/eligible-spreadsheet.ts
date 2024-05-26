export const baseEligibleSpreadsheetHeader = ['รหัสนักศึกษา', 'ชื่อ - สกุล', 'ประเภทการเข้า', 'หมายเหตุ'];

// export type EligibleSpreadsheetRow = {
//   [key in (typeof baseEligibleSpreadsheetHeader)[number]]: string;
// };

export type EligibleSpreadsheetRow = {
  รหัสนักศึกษา: string;
  'ชื่อ - สกุล': string;
  ประเภทการเข้า: string;
  หมายเหตุ: string;

  [key: `${1 | 2}/${number}`]: string;
};
