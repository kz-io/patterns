/**
 * @copyright 2020-2024 integereleven. All rights reserved. MIT license.
 * @file Exports the using and usingAsync functions.
 */

import { dispose } from './dispose.ts';

import type { IDisposable } from './types/mod.ts';

/**
 * Performs a callback function with the provided {@link IDisposable} disposing on completion, returning the result of the callback.
 *
 * @param disposable - The {@link IDisposable} object to use.
 * @param callback - The function to perform with the `disposable`.
 * @returns The result of the `callback` function.
 *
 * @example
 * ```ts
 * import { assert } from '@std/assert';
 * import { using } from './using.ts';
 * import type { IDisposable } from './types/mod.ts';
 *
 * class Basic implements IDisposable {
 *    constructor(public name: string) {}
 *
 *   isDisposed = false;
 *
 *   dispose(): void {
 *     this.isDisposed = true;
 *   }
 * }
 *
 * const disposable = new Basic('A');
 *
 * using(disposable, (d) => {
 *   assert(!d.isDisposed);
 * });
 *
 * assert(disposable.isDisposed);
 * ```
 */
export function using<T extends IDisposable, R>(
  disposable: T,
  callback: (disposable: T) => R,
): R {
  try {
    return callback(disposable);
  } finally {
    dispose(disposable);
  }
}

/**
 * Asynchronously performs a callback function with the provided {@link IDisposable} disposing on completion, returning the result of the callback.
 *
 * @param disposable - The {@link IDisposable} object to use.
 * @param callback - The function to perform with the `disposable`.
 * @returns The result of the `callback` function.
 *
 * @example
 * ```ts
 * import { assert } from '@std/assert';
 * import { usingAsync } from './using.ts';
 * import type { IDisposable } from './types/mod.ts';
 *
 * class Async implements IDisposable {
 *    constructor(public name: string) {}
 *
 *    isDisposed = false;
 *
 *   async run(): Promise<void> {
 *     await new Promise(function (resolve): void {
 *       setTimeout(resolve, 1000);
 *     });
 *   }
 *
 *   dispose(): void {
 *     this.isDisposed = true;
 *   }
 * }
 *
 * const disposable = new Async('A');
 *
 * await usingAsync(disposable, async (d) => {
 *   assert(!d.isDisposed);
 *   await d.run();
 * });
 *
 * assert(disposable.isDisposed);
 * ```
 */
export async function usingAsync<T extends IDisposable, R>(
  disposable: T,
  callback: (disposable: T) => Promise<R>,
): Promise<R> {
  try {
    return await callback(disposable);
  } finally {
    dispose(disposable);
  }
}
