/**
 * @copyright 2020-2024 integereleven. All rights reserved. MIT license.
 * @file This file tests the AbstractDisposable class.
 */

import { describe, it } from '@std/testing/bdd';
import { assertSpyCalls, spy } from '@std/testing/mock';
import { assertEquals, assertThrows } from '@std/assert';

import { AbstractDisposable } from './mod.ts';

class Fibonacci extends AbstractDisposable {
  #items: number[] = [0, 1];

  constructor(itemCount: number) {
    super();

    const itemLength = this.#items.length;

    if (itemCount > this.#items.length) {
      for (let i = 0; i < (itemCount - itemLength); i++) {
        const [a, b] = this.#items.slice(-2);

        this.#items.push(a + b);
      }
    }
  }

  public get sequence(): number[] {
    return [...this.#items];
  }

  public get count(): number {
    return this.#items.length;
  }

  public continueSequence(itemCount: number): void {
    this.assertNotDisposed();

    for (let i = 0; i < itemCount; i++) {
      const [a, b] = this.#items.slice(-2);

      this.#items.push(a + b);
    }
  }

  public disposing(): void {
    console.log('Disposing Fibonacci');
  }

  protected onDispose(): void {
    this.disposing();
    this.#items = [];
    super.onDispose();
  }
}

describe('AbstractDisposable', () => {
  const fib = new Fibonacci(6);
  const spyDisposing = spy(fib, 'disposing');

  it('tests all', () => {
    assertEquals(fib.count, 6);
    assertEquals(fib.isDisposed, false);
    assertEquals(`${fib}`, '[object Fibonacci{isDisposed: false}]');

    fib.continueSequence(5);
    assertEquals(fib.count, 11);
    assertEquals(fib.isDisposed, false);
    assertEquals(`${fib}`, '[object Fibonacci{isDisposed: false}]');

    fib.dispose();

    assertEquals(`${fib}`, '[object Fibonacci{isDisposed: true}]');
    assertSpyCalls(spyDisposing, 1);
    assertThrows(() => fib.continueSequence(5));
    assertEquals(fib.count, 0);
    assertEquals(fib.isDisposed, true);

    fib.dispose();
    assertEquals(fib.count, 0);
    assertEquals(fib.isDisposed, true);
  });
});
