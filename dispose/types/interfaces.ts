/**
 * @copyright 2020-2024 integereleven. All rights reserved. MIT license.
 * @file Interfaces for the module.
 */

/**
 * Provides a mechanism to dispose of resources associated with the object.
 *
 * @example
 * ```ts
 * import { assert } from '@std/assert';
 * import { ObjectDisposedException } from '../exceptions/mod.ts';
 *
 * import type { IDisposable } from './interfaces.ts';
 *
 * class MyClass implements IDisposable {
 *   private _isDisposed = false;
 *
 *   public dispose(): void {
 *     if (this._isDisposed) {
 *       throw new ObjectDisposedException('MyClass');
 *     }
 *
 *     this._isDisposed = true;
 *   }
 *
 *   public get isDisposed(): boolean {
 *     return this._isDisposed;
 *   }
 * }
 *
 * const myObject = new MyClass();
 *
 * assert(!myObject.isDisposed);
 *
 * myObject.dispose();
 *
 * assert(myObject.isDisposed);
 * ```
 */
export interface IDisposable {
  /**
   * Dispose of resources associated with the current instance.
   */
  dispose(): void;

  /**
   * A value indicating whether the current instance has been disposed.
   */
  isDisposed: boolean;
}
