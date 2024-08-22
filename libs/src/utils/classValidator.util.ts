export class ClassValidatorUtil {
  static getErrorMessage(errorResponse: any[], path = ''): string[] {
    try {
      const errorMessages: string[] = [];

      for (const error of errorResponse) {
        const currentPath = path ? `${path}.${error.property}` : error.property;
        const messages = Object.values(error.constraints || {}).map((message) =>
          `${currentPath}: ${message}`.replace(`${error.property}: `, ''),
        );
        errorMessages.push(...messages);

        if (error.children) {
          const childErrorMessages = ClassValidatorUtil.getErrorMessage(
            error.children,
            currentPath,
          );
          errorMessages.push(...childErrorMessages);
        }
      }

      return errorMessages;
    } catch (error) {
      return [];
    }
  }
}
