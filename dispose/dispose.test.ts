/**
 * @copyright 2020-2024 integereleven. All rights reserved. MIT license.
 * @file This file tests the dispose function.
 */

import { describe, it } from '@std/testing/bdd';
import { assert } from '@std/assert';

import { dispose } from './mod.ts';

describe('dispose', () => {
  describe('(...disposables)', () => {
    it('should dispose all disposables', () => {
      const disposable = {
        dispose(): void {
          this.isDisposed = true;
        },
        isDisposed: false,
      };

      dispose(disposable);

      assert(disposable.isDisposed);
    });

    it('should return undefined if all disposables are disposed', () => {
      const disposable = {
        dispose(): void {
          this.isDisposed = true;
        },
        isDisposed: false,
      };

      const exceptions = dispose(disposable);

      assert(exceptions === undefined);
    });

    it('should return an array of exceptions if any disposables throw', () => {
      const disposable = {
        dispose(): void {
          throw new Error('Dispose failed');
        },
        isDisposed: false,
      };

      const exceptions = dispose(disposable);

      assert(exceptions !== undefined);
      assert(exceptions.length === 1);
    });
  });
});
