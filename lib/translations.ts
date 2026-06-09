export type TranslatableField = {
  name_uz?: string;
  name_ru?: string;
  name_eng?: string;
  description_uz?: string;
  description_ru?: string;
  description_eng?: string;
};

export function getTranslatedField<T extends TranslatableField>(
  item: T,
  field: 'name' | 'description',
  lang: string = 'en'
): string {
  const fieldMap: Record<string, keyof T> = {
    ru: `${field}_ru` as keyof T,
    en: `${field}_eng` as keyof T,
    uz: `${field}_uz` as keyof T,
  };

  const translatedFieldKey = fieldMap[lang] || fieldMap['en'];
  return (item[translatedFieldKey] as string) || (item[fieldMap['en']] as string) || '';
}
