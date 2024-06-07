/**
 * @copyright 2020-2024 integereleven. All rights reserved. MIT license.
 * @file This file tests the assertNotDisposed function.
 */

import { describe, it } from '@std/testing/bdd';
import { assertThrows } from '@std/assert';

import { assertNotDisposed } from './mod.ts';

describe('assertNotDisposed', () => {
  describe('(disposable)', () => {
    it('should throw if the object is disposed', () => {
      const disposable = { isDisposed: true, dispose(): void {} };
      assertThrows(() => assertNotDisposed(disposable));
    });
  });

  describe('(disposable, message)', () => {
    it('should throw if the object is disposed', () => {
      const disposable = { isDisposed: true, dispose(): void {} };
      assertThrows(() => assertNotDisposed(disposable, 'Object is disposed.'));
    });
  });
});
