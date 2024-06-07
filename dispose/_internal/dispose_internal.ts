/**
 * @copyright 2020-2024 integereleven. All rights reserved. MIT license.
 * @file This file exports the disposeInternal internal function.
 */

import type { Exception } from '@kz/core/exceptions';
import type { IDisposable } from '../types/mod.ts';

/**
 * Disposes an array of {@link IDisposable} objects, returning any exceptions that may have occurred during disposal.
 *
 * @param disposables - The array of {@link IDisposable} objects to dispose.
 * @returns An array of exceptions that occurred during disposal, if any.
 *
 * @example Good disposal
 * ```ts
 * import { assert } from '@std/assert';
 * import { disposeInternal } from './dispose_internal.ts';
 * import { AbstractDisposable } from '../abstract_disposable.ts';
 *
 * class Disposable extends AbstractDisposable {
 *   protected onDispose() {
 *     console.log('Disposed');
 *   }
 * }
 *
 * const a = new Disposable();
 * const b = new Disposable();
 * const c = new Disposable();
 *
 * const exceptions = disposeInternal([a, b, c]);
 *
 * assert(exceptions === undefined);
 * ```
 *
 * @example Bad disposal
 * ```ts
 * import { assert } from '@std/assert';
 * import { disposeInternal } from './dispose_internal.ts';
 * import { AbstractDisposable } from '../abstract_disposable.ts';
 *
 * class Disposable extends AbstractDisposable {
 *   constructor(private throwOnDispose = false) {
 *     super();
 *    }
 *
 *   protected onDispose() {
 *    if (this.throwOnDispose) throw new Error('Dispose failed');
 *     console.log('Disposed');
 *   }
 * }
 *
 * const a = new Disposable();
 * const b = new Disposable(true);
 * const c = new Disposable();
 *
 * const exceptions = disposeInternal([a, b, c]);
 *
 * assert(exceptions !== undefined);
 * assert(exceptions.length === 1);
 * ```
 */
export function disposeInternal(
  disposables: IDisposable[],
): (Error | Exception)[] | undefined {
  const exceptions: (Error | Exception)[] = [];

  for (let i = 0; i < disposables.length; i++) {
    const disposable = disposables[i];
    const ex = disposeInternalOne(disposable);

    if (ex) exceptions.push(ex);

    continue;
  }

  return exceptions.length ? exceptions : undefined;
}

/**
 * Disposes an {@link IDisposable} object, returning the exception that occurred, if any, during disposal.
 *
 * @param disposable - The {@link IDisposable} object to dispose.
 * @returns The exception that occurred during disposal, if any.
 */
function disposeInternalOne(
  disposable: IDisposable,
): Error | Exception | undefined {
  try {
    disposable.dispose();

    return;
  } catch (err) {
    return err;
  }
}
