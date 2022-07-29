import { ValidationError, ValidationPipe } from '@nestjs/common';
import { HttpErrorByCode } from '@nestjs/common/utils/http-error-by-code.util';
import { AppValidationError } from './type';

export class AppValidationPipe extends ValidationPipe {
  createExceptionFactory(): (validationErrors?: ValidationError[]) => unknown {
    return (validationErrors: ValidationError[]) => {
      const errors = this.transformValidationErrors(validationErrors);
      return new HttpErrorByCode[this.errorHttpStatusCode](errors);
    };
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
