import { camelcase, pascalcase, snakecase } from 'stringcase';
import * as pluralize from 'pluralize';
import { kebabCase as kebabcase } from 'lodash';

export type StringCases = {
  snakeCase: string;
  kebabCase: string;
  pascalCase: string;
  camelCase: string;
  pluralSnakeCase: string;
  pluralKebabCase: string;
};

export const getStringCases = (value: string): StringCases => {
  const snakeCase: string = snakecase(value);

  const snakeCaseParts: string[] = snakeCase.split('_');
  const pluralSnakeCase: string = snakeCaseParts
    .map((namePart: string) => pluralize(namePart))
    .join('_');

  const pascalCase: string = pascalcase(value);
  const kebabCase: string = kebabcase(value);
  const camelCase: string = camelcase(value);
  const pluralKebabCase: string = pluralize(kebabCase);

  return {
    snakeCase,
    kebabCase,
    pascalCase,
    camelCase,
    pluralSnakeCase,
    pluralKebabCase,
  };
};
