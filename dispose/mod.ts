/**
 * @copyright 2020-2024 integereleven. All rights reserved. MIT license.
 *
 * The `@kz/core/dispose` module provides types and features for using and disposing of managed resources.
 *
 * @module dispose
 */

export * from './exceptions/mod.ts';
export * from './types/mod.ts';
export { AbstractDisposable } from './abstract_disposable.ts';
export { assertNotDisposed } from './assert_not_disposed.ts';
export { DisposablePool } from './disposable_pool.ts';
export { dispose } from './dispose.ts';
export { using, usingAsync } from './using.ts';
