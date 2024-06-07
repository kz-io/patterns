/**
 * @copyright 2020-2024 integereleven. All rights reserved. MIT license.
 * @file This file exports the assertNotDisposed function.
 */

import { ObjectDisposedException } from './exceptions/mod.ts';

import type { IDisposable } from './types/mod.ts';

/**
 * Asserts that the specified object is not disposed, optionally with a specific message.
 *
 * @param disposable - The object to check.
 * @param message - The message to include in the exception, if thrown.
 * @throws {ObjectDisposedException} If the object is disposed.
 *
 * @example
 * ```ts
 * import { assertThrows } from '@std/assert';
 * import type { IDisposable } from './types/interfaces.ts';
 * import { assertNotDisposed } from './assert_not_disposed.ts';
 *
 * const disposable: IDisposable = {
 *   isDisposed: true,
 *   dispose() {
 *     this.isDisposed = true;
 *   }
 * };
 *
 * assertThrows(() => assertNotDisposed(disposable));
 * ```
 */
export function assertNotDisposed(
  disposable: IDisposable,
  message?: string,
): void {
  if (disposable.isDisposed) {
    const objectName = disposable.constructor.name;
    const exception = message
      ? new ObjectDisposedException(message, {
        objectName,
      })
      : new ObjectDisposedException({ objectName });

    throw exception;
  }
}
