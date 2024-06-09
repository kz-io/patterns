/**
 * @copyright 2020-2024 integereleven. All rights reserved. MIT license.
 * @file Exports the TBasePublisher abstract class.
 */

import { TBaseObservable } from '../observer/mod.ts';

import type {
  PubSubTopicMessage,
  PubSubTopics,
  TSubscriber,
} from './types/mod.ts';

/**
 * A base implementation for the {@link TPublisher} interface.
 *
 * @typeParam T - The topics-to-type map of the types being observed.
 *
 * @example
 * ```ts
 * import { TBasePublisher } from './t_base_publisher.ts';
 *
 * type MyTopics = {
 *   TopicA: string;
 *   TopicB: { value: number };
 *   TopicC: { timestamp: Date };
 * };
 *
 * const publisher = new TBasePublisher<MyTopics>();
 *
 * publisher.publish(['TopicA', 'Hello, world!']);
 * ```
 */
export class TBasePublisher<T extends PubSubTopics>
  extends TBaseObservable<PubSubTopicMessage<T>> {
  /**
   * Publishes a message to all subscribers.
   *
   * @param topic - The topic to publish the message to.
   * @param message - The message to publish.
   */
  public publish(message: PubSubTopicMessage<T>): void {
    const [topic] = message;

    this.observers.forEach((observer) => {
      if (!('topics' in observer)) return observer.next(message);

      const subscriber = observer as TSubscriber<T, keyof T>;

      if (subscriber.topics.includes(topic)) {
        observer.next(message);
      }
    });
  }
}
