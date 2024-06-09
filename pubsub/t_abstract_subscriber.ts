/**
 * @copyright 2020-2024 integereleven. All rights reserved. MIT license.
 * @file Exports the TAbstractSubscriber abstract class.
 */

import { TAbstractObserver } from '../observer/mod.ts';
import type {
  PubSubTopicMessage,
  PubSubTopics,
  TSubscriber,
} from './types/mod.ts';

/**
 * Provides an abstract implementation for a subscriber that can receive topical notifications from a publisher.
 *
 * @typeParam T - The topics-to-type map of the types being observed.
 * @typeParam K - The topics this subscriber supports.
 *
 * @example
 * ```ts
 * import type { PubSubTopicMessage } from './types/mod.ts';
 * import { TAbstractSubscriber } from './t_abstract_subscriber.ts';
 *
 * type MyTopics = {
 *   TopicA: string;
 *   TopicB: { value: number };
 *   TopicC: { timestamp: Date };
 * };
 *
 * class MySubscriber extends TAbstractSubscriber<MyTopics> {
 *   next(value: PubSubTopicMessage<MyTopics>): void {
 *     const [topic, message] = value;
 *
 *     if (topic === 'TopicA') {
 *       console.log(message);
 *     } else if (topic === 'TopicB') {
 *       console.log(`Took ${(message as MyTopics["TopicB"]).value} seconds to complete.`);
 *     } else {
 *       console.log(`Completed at ${(message as MyTopics["TopicC"]).timestamp}.`);
 *     }
 *   }
 *
 *   error(error: Error): void {
 *     console.error(error);
 *   }
 * }
 * ```
 */
export abstract class TAbstractSubscriber<
  T extends PubSubTopics,
  K extends keyof T = keyof T,
> extends TAbstractObserver<PubSubTopicMessage<T, K>>
  implements TSubscriber<T, K> {
  /**
   * The topics this subscriber is subscribed to.
   */
  public readonly topics: K[];

  /**
   * Initializes a new instance of the {@link TAbstractSubscriber} class with the topics the instance will subscribe to.
   *
   * @param topics - The topics this subscriber is subscribed to.
   *
   * You must specify the topics you want the subscriber to observe from the list of topics available in the `T` type.
   *
   * This allows implementers to create a subscriber that is capable of listening to specific topics,
   * while allowing instance implementers to specify which topics they want to observe.
   */
  constructor(topics: K[] = []) {
    super();

    this.topics = topics;
  }
}
