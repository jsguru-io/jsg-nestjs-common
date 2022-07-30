import {
  ArgumentMetadata,
  Injectable,
  ValidationError,
  ValidationPipe,
  ValidationPipeOptions,
} from '@nestjs/common';
import { AppValidationError } from './type';

@Injectable()
export class AppValidationPipe extends ValidationPipe {
  private classTransformer: any;
  private classValidator: any;

  constructor(private readonly options: ValidationPipeOptions) {
    super(options ?? {});
    this.classTransformer = this.loadTransformer();
    this.classValidator = this.loadValidator();
  }

  protected throwException(errors: AppValidationError[]) {
    return this.exceptionFactory(errors);
  }

  async transform(value: any, metadata: ArgumentMetadata) {
    const metatype = metadata.metatype;
    const entity = this.classTransformer.plainToClass(
      metatype,
      value,
      this.transformOptions,
    );

    const rawErrors = await this.classValidator.validate(
      entity,
      this.validatorOptions,
    );
    if (rawErrors.length > 0) {
      const errors: AppValidationError[] =
        this.transformValidationErrors(rawErrors);
      throw this.throwException(errors);
    }
    return value;
  }

  private transformValidationErrors(
    initialErrors?: ValidationError[],
  ): AppValidationError[] {
    if (!initialErrors) {
      return [];
    }

    const errors: AppValidationError[] = [];
    this.resolveValidationErrors(errors, '', initialErrors);

    return errors;
  }

  private resolveValidationErrors(
    totalErrors: AppValidationError[],
    path = '',
    currentErrors: ValidationError[],
  ) {
    for (const error of currentErrors) {
      const currentPath = `${path ? `${path}.` : ''}${error.property}`;

      if (error.constraints) {
        totalErrors.push(<AppValidationError>{
          property: currentPath,
          value: error.value,
          violations: error.constraints,
        });
      }
      this.resolveValidationErrors(totalErrors, currentPath, error.children);
    }
  }
}
