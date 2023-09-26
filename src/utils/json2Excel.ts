import * as XLSX from 'xlsx';

export default (
  fileName = 'json2Excel.xlsx',
  data: any[] = [],
  sheetName = 'sheet1',
) => {
  const jsonWorkSheet = XLSX.utils.json_to_sheet(data);
  jsonWorkSheet['!cols'] = [{ wch: 20 }, { wch: 20 }, { wch: 20 }, { wch: 20 }];

  const workBook = {
    SheetNames: [sheetName], // 指定有序 sheet 的 name
    Sheets: {
      [sheetName]: jsonWorkSheet, // 表格数据内容
    },
  };

  return XLSX.writeFile(workBook, fileName); // 向文件系统写出文件
};
