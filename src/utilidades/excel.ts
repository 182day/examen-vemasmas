import * as XLSX from 'xlsx';

/**
 * Exporta un arreglo de objetos JSON a un archivo .xlsx
 */
export const exportarAExcel = <T extends Record<string, any>>(
  datos: T[],
  nombreArchivo: string = 'reporte.xlsx',
  nombreHoja: string = 'Datos'
) => {
  if (!datos || datos.length === 0) return;

  // Convertir el arreglo de objetos a una hoja de cálculo
  const worksheet = XLSX.utils.json_to_sheet(datos);

  // Crear un nuevo libro de trabajo y adjuntar la hoja
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, nombreHoja);

  // Generar la descarga del archivo en el navegador
  XLSX.writeFile(workbook, nombreArchivo);
};