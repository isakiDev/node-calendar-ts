import { type FieldMessageFactory, check } from 'express-validator'
import { type ErrorMessage } from 'express-validator/src/base'

export class ValidatorAdapter {
  static check (fields?: string | string[] | undefined, message?: FieldMessageFactory | ErrorMessage | undefined) {
    return check(fields)
  }
}
