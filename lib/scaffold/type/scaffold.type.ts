export type ScaffoldOptions = {
  newDestination: string;
  modelStringCases: ModelStringCases;
};

export type ModelStringCases = {
  pascalName: string;
  snakeName: string;
  kebabName: string;
  camelName: string;
  pluralSnakeName: string;
  pluralKebabName: string;
};
