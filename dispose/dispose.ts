/**
 * @copyright 2020-2024 integereleven. All rights reserved. MIT license.
 * @file This file exports the dispose function.
 */

import type { Exception } from '@kz/core/exceptions';

import { disposeInternal } from './_internal/mod.ts';

import type { IDisposable } from './types/mod.ts';

/**
 * Disposes an array of {@link IDisposable} objects returning any exceptions that may have occrred during disposal.
 *
 * @param disposables - The array of {@link IDisposable} objects to dispose.
 * @returns An array of exceptions that occurred during disposal, if any.
 *
 * @example
 * ```ts
 * import { assert } from '@std/assert';
 * import { dispose } from './dispose.ts';
 * import type { IDisposable } from './types/interfaces.ts';
 *
 * const disposable: IDisposable = {
 *    dispose(): void {
 *     this.isDisposed = true;
 *   },
 *   isDisposed: false,
 * };
 *
 * assert(!disposable.isDisposed);
 *
 * dispose(disposable);
 *
 * assert(disposable.isDisposed);
 * ```
 */
export function dispose(
  ...disposables: IDisposable[]
): (Error | Exception)[] | undefined {
  return disposeInternal(disposables);
}
