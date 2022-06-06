export type AppValidationError = {
  property: string;
  value: any;
  violations: {
    [violation: string]: string;
  };
};
