/**
 * @copyright 2020-2024 integereleven. All rights reserved. MIT license.
 * @file This file exports the AbstractDisposable abstract class.
 */

import { assertNotDisposed } from './assert_not_disposed.ts';

import type { IDisposable } from './types/mod.ts';

/**
 * An abstract class implementation of the {@link IDisposable} interface.
 *
 * @example Example using fibonacci sequence
 * ```ts
 * import { assert, assertEquals } from '@std/assert';
 * import { AbstractDisposable } from './abstract_disposable.ts';
 * import { ObjectDisposedException } from './exceptions/object_disposed_exception.ts';
 *
 * class Fibonacci extends AbstractDisposable {
 *   private _a = 0;
 *   private _b = 1;
 *   private _items = [this._a, this._b];
 *
 *   public get sequence(): number[] {
 *     return [...this._items];
 *   }
 *
 *   public continueSequence(itemCount: number): void {
 *     this.assertNotDisposed();
 *
 *     for (let i = 0; i < itemCount; i++) {
 *       const [a, b] = this._items.slice(-2);
 *
 *       this._items.push(a + b);
 *     }
 *   }
 *
 *   protected onDispose(): void {
 *     this._items = [];
 *     super.onDispose();
 *   }
 * }
 *
 * const fib = new Fibonacci();
 *
 * fib.continueSequence(6);
 *
 * assertEquals(fib.sequence.length, 8);
 *
 * fib.dispose();
 *
 * assertEquals(fib.sequence.length, 0);
 *
 * try {
 *   fib.continueSequence(6);
 * } catch (e) {
 *   assert(e instanceof ObjectDisposedException);
 * }
 * ```
 */
export abstract class AbstractDisposable implements IDisposable {
  /**
   * Whether the resource for this `AbstractDisposable` have been freed up.
   */
  protected _isDisposed: boolean = false;

  /**
   * Asserts that an {@link IDisposable} instance has not been disposed, optionally with a specific message.
   *
   * @param disposable - The object to check.
   * @param message - The message to include in the exception, if thrown.
   * @throws {ObjectDisposedException} If the object is disposed.
   *
   * @example
   * ```ts
   * import { assertThrows } from '@std/assert';
   * import type { IDisposable } from './types/interfaces.ts';
   * import { AbstractDisposable } from './abstract_disposable.ts';
   *
   * const disposable: IDisposable = {
   *   isDisposed: true,
   *   dispose() {
   *     this.isDisposed = true;
   *   }
   * };
   *
   * assertThrows(() => AbstractDisposable.assertNotDisposed(disposable));
   * ```
   */
  public static assertNotDisposed(
    disposable: IDisposable,
    message?: string,
  ): void {
    assertNotDisposed(disposable, message);
  }

  /**
   * Whether the resource for this `AbstractDisposable` have been freed up.
   */
  public get isDisposed(): boolean {
    return this._isDisposed;
  }

  /**
   * Returns the string representation of this `AbstractDisposable`.
   *
   * @example
   * ```ts
   * import { assertEquals } from '@std/assert';
   * import { AbstractDisposable } from './abstract_disposable.ts';
   *
   * class Disposable extends AbstractDisposable { }
   *
   * const disposable = new Disposable();
   *
   * assertEquals(`${disposable}`, '[object Disposable{isDisposed: false}]');
   * ```
   */
  public toString(): string {
    const { isDisposed, constructor } = this;
    return `[object ${constructor.name}{isDisposed: ${isDisposed}}]`;
  }

  /**
   * Initiates the process of freeing up unmanaged resources and finalizing this `AbstractDisposable`.
   *
   * @example
   * ```ts
   * import { assertEquals } from '@std/assert';
   * import { AbstractDisposable } from './abstract_disposable.ts';
   *
   * class Disposable extends AbstractDisposable { }
   *
   * const disposable = new Disposable();
   *
   * assertEquals(disposable.isDisposed, false);
   *
   * disposable.dispose();
   *
   * assertEquals(disposable.isDisposed, true);
   * ```
   */
  public dispose(): void {
    if (this.isDisposed) return;

    try {
      this.onDispose();
    } finally {
      this._isDisposed = true;
    }
  }

  /**
   * Asserts that this `AbstractDisposable` has not been disposed, optionally with a specific message.
   *
   * @param message - The message to include in the exception, if thrown.
   * @throws {ObjectDisposedException} If this `AbstractDisposable` has been disposed.
   */
  protected assertNotDisposed(message?: string): void {
    AbstractDisposable.assertNotDisposed(this, message);
  }

  /**
   * Frees up resources.
   */
  protected onDispose(): void {}
}
