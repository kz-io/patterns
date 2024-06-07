/**
 * @copyright 2020-2024 integereleven. All rights reserved. MIT license.
 * @file This file tests the disposeInternal internal function.
 */

import { describe, it } from '@std/testing/bdd';
import { assert } from '@std/assert';

import { AbstractDisposable } from '../mod.ts';
import { disposeInternal } from './mod.ts';

describe('disposeInternal', () => {
  describe('disposeInternal(...disposables)', () => {
    it('should dispose all disposables', () => {
      class Disposable extends AbstractDisposable {
      }

      const a = new Disposable();
      const b = new Disposable();
      const c = new Disposable();

      const exceptions = disposeInternal([a, b, c]);

      assert(exceptions === undefined);
    });
    it('should return any errors', () => {
      class Disposable extends AbstractDisposable {
        constructor(private throwOnDispose = false) {
          super();
        }

        protected onDispose(): void {
          if (this.throwOnDispose) throw new Error('Dispose failed');

          super.onDispose();
        }
      }

      const a = new Disposable();
      const b = new Disposable(true);
      const c = new Disposable(true);

      const exceptions = disposeInternal([a, b, c]);

      assert(exceptions !== undefined);
      assert(exceptions.length === 2);
    });
  });
});
