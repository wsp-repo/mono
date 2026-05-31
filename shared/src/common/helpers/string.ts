// Нормализация текста: нижний регистр, убрать все пробелы и знаки препинания
export function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\u0400-\u04FF\u0041-\u005A\u0061-\u007A0-9]/g, ''); // оставляем только буквы кириллицы, латиницы и цифры
}
