import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as fsExtra from 'fs-extra';
import * as handlebars from 'handlebars';
import * as glob from 'glob';
import { IScaffoldService, ModelStringCases, ScaffoldOptions } from './type';
import { getStringCases, StringCases } from '../util/stringcase';

@Injectable()
export class ScaffoldService implements IScaffoldService {
  async scaffold(modelName: string): Promise<void> {
    const {
      pascalCase: modelPascalCase,
      snakeCase: modelSnakeCase,
      kebabCase: modelKebabCase,
      camelCase: modelCamelCase,
      pluralSnakeCase: pluralModelSnakeCase,
      pluralKebabCase: pluralModelKebabCase,
    }: StringCases = getStringCases(modelName);

    const modelStringCases: ModelStringCases = {
      pascalName: modelPascalCase,
      snakeName: modelSnakeCase,
      kebabName: modelKebabCase,
      camelName: modelCamelCase,
      pluralSnakeName: pluralModelSnakeCase,
      pluralKebabName: pluralModelKebabCase,
    };

    const newDestination = `${__dirname}/../../${modelKebabCase}`;
    await fsExtra.copy(`${__dirname}/template/`, newDestination);

    this.performModuleScaffolding({
      newDestination,
      modelStringCases,
    });
  }

  performModuleScaffolding({
    newDestination,
    modelStringCases,
  }: ScaffoldOptions): void {
    glob(
      `${newDestination}/**/*.hbs`,
      (error: Error | null, filePaths: string[]) => {
        if (error) {
          throw error;
        }

        // convert every new copied .hbs file into valid .ts file
        filePaths.forEach((filePath: string) => {
          const fileBuffer: Buffer = fs.readFileSync(filePath);

          const template: HandlebarsTemplateDelegate = handlebars.compile(
            fileBuffer.toString(),
          );
          const output: string = template(modelStringCases);

          const currentDirParts: string[] = filePath.split('/');
          const fileName: string = currentDirParts.pop();
          const newFileName: string = fileName
            .replace('_model_', modelStringCases.kebabName)
            .replace('.hbs', '.ts');

          currentDirParts.push(newFileName);

          const newFilePath: string = currentDirParts.join('/');
          fs.writeFileSync(newFilePath, output);

          fs.unlinkSync(filePath);
        });
      },
    );
  }
}
