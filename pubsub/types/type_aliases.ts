/**
 * @copyright 2020-2024 integereleven. All rights reserved. MIT license.
 * @file Type aliases for the module. For interfaces, see ./interfaces.ts.
 */

import type { IndeterminateObject } from '@kz/core/types';

/**
 * Represents a map of topics to messages.
 *
 * @typeParam T - The topics-to-type map of the types being observed.
 *
 * @example
 * ```ts
 * import type { PubSubTopics } from './type_aliases.ts';
 *
 * type MyTopics = {
 *   TopicA: string;
 *   TopicB: { value: number };
 *   TopicC: { timestamp: Date };
 * };
 *
 * const topics: PubSubTopics<MyTopics> = {
 *   TopicA: 'Hello, world!',
 *   TopicB: { value: 42 },
 *   TopicC: { timestamp: new Date() },
 * };
 * ```
 */
export type PubSubTopics<
  T extends IndeterminateObject = IndeterminateObject,
> = {
  /**
   * The topics-to-type map of the types being observed.
   */
  [K in keyof T]: T[K];
};

/**
 * Represents a message published to a topic.
 *
 * @typeParam T - The topics-to-type map of the types being observed.
 * @typeParam K - The topic this message is published to.
 *
 * @example
 * ```ts
 * import type { PubSubTopicMessage } from './type_aliases.ts';
 *
 * type MyTopics = {
 *   TopicA: string;
 *   TopicB: { value: number };
 *   TopicC: { timestamp: Date };
 * };
 *
 * const message: PubSubTopicMessage<MyTopics, 'TopicA'> = ['TopicA', 'Hello, world!'];
 * ```
 */
export type PubSubTopicMessage<
  T extends IndeterminateObject = IndeterminateObject,
  K extends keyof T = keyof T,
> = [K, T[K]];
