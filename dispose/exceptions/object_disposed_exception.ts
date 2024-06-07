/**
 * @copyright 2020-2024 integereleven. All rights reserved. MIT license.
 * @file This file exports the ObjectDisposedException and its related data type.
 */

import { type BaseExceptionData, InvalidException } from '@kz/core/exceptions';

/**
 * Additional, related data for the {@link ObjectDisposedException} class.
 *
 * @example
 * ```ts
 * import { assertEquals } from '@std/assert';
 * import type { ObjectDisposedExceptionData } from './object_disposed_exception.ts';
 *
 * const data: ObjectDisposedExceptionData = {
 *   objectName: 'foo',
 * };
 *
 * assertEquals(data.objectName, 'foo');
 * ```
 */
export type ObjectDisposedExceptionData = BaseExceptionData<{
  /**
   * The name of the disposed object.
   */
  objectName?: string;
}>;

/**
 * An exception raised when an argument has the correct type but has an invalid value.
 *
 * @param T - The type of the additional, relevant data for the exception.
 *
 * @example No arguments - default message
 * ```ts
 * import { assertEquals } from '@std/assert';
 * import { ObjectDisposedException } from './object_disposed_exception.ts';
 *
 * const exception = new ObjectDisposedException();
 *
 * assertEquals(exception.message, 'An operation was attempted on a disposed object.');
 * ```
 *
 * @example With provided message
 * ```ts
 * import { assertEquals } from '@std/assert';
 * import { ObjectDisposedException } from './object_disposed_exception.ts';
 *
 * const exception = new ObjectDisposedException('An object is disposed, but an operation was attempted.');
 *
 * assertEquals(exception.message, 'An object is disposed, but an operation was attempted.');
 * ```
 *
 * @example With provided relevant data
 * ```ts
 * import { assertEquals } from '@std/assert';
 * import { ObjectDisposedException } from './object_disposed_exception.ts';
 *
 * const exception = new ObjectDisposedException({ objectName: 'foo' });
 *
 * assertEquals(exception.message, 'An operation was attempted on a disposed object, foo');
 * ```
 *
 * @example With provided message and relevant data
 * ```ts
 * import { assertEquals } from '@std/assert';
 * import { ObjectDisposedException } from './object_disposed_exception.ts';
 *
 * const exception = new ObjectDisposedException('An object is disposed, but an operation was attempted.', { objectName: 'foo' });
 *
 * assertEquals(exception.message, 'An object is disposed, but an operation was attempted.');
 * ```
 */
export class ObjectDisposedException<
  T extends ObjectDisposedExceptionData = ObjectDisposedExceptionData,
> extends InvalidException<T> {
  /**
   * Creates a new instance of the `ArgumentException` class with the default message description.
   */
  constructor();

  /**
   * Creates a new instance of the `ArgumentException` class with the specified message description.
   *
   * @param message The exception message description.
   */
  constructor(message: string);

  /**
   * Creates a new instance of the `ArgumentException` class with the specified relevant data, resulting in a generated message description.
   *
   * @param data The relevant data for the exception.
   */
  constructor(data: T);

  /**
   * Creates a new instance of the `ArgumentException` class with the specified message description and additional, relevant data.
   *
   * @param message The exception message description.
   * @param data The additional, relevant data for the exception.
   */
  constructor(message: string, data: T);

  /**
   * @ignore implementation
   */
  constructor(messageOrData: string | T = DEFAULT_MESSAGE, data: T = {} as T) {
    let message: string;

    if (typeof messageOrData === 'string') {
      message = messageOrData;
    } else {
      data = messageOrData;
      message = createMessageFromData(data);
    }

    message = message || DEFAULT_MESSAGE;

    super(message, data);
  }

  /**
   * The exception code.
   *
   * @example
   * ```ts
   * import { assertEquals } from '@std/assert';
   * import { ObjectDisposedException } from './object_disposed_exception.ts';
   *
   * const exception = new ObjectDisposedException('An object is disposed, but an operation was attempted.');
   *
   * assertEquals(exception.code, 64);
   * ```
   */
  public code = 0x40;
}

/**
 * The default message for the {@link ObjectDisposedException} exception.
 */
const DEFAULT_MESSAGE = 'An operation was attempted on a disposed object.';

/**
 * Creates a message from the exception data.
 *
 * @param data The exception data.
 * @returns The exception message.
 */
function createMessageFromData(data: ObjectDisposedExceptionData): string {
  const { objectName } = data;

  return objectName
    ? `An operation was attempted on a disposed object, ${objectName}.`
    : DEFAULT_MESSAGE;
}
