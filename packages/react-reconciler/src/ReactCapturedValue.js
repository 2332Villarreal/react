/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import type {Fiber} from './ReactInternalTypes';

import {getStackByFiberInDevAndProd} from './ReactFiberComponentStack';
import hasOwnProperty from 'shared/hasOwnProperty';

export type CapturedValue<T> = {
  value: T,
  source: Fiber | null,
  stack: string | null,
  digest: string | null,
};

export function createCapturedValueAtFiber<T>(
  value: T,
  source: Fiber,
): CapturedValue<T> {
  // If the value is an error, call this function immediately after it is thrown
  // so the stack is accurate.
  let stack;
  if (value != null && hasOwnProperty.call(value, '_componentStack')) {
    // Read the stack from the value if it was set by an earlier capture
    stack = (value: any)._componentStack;
  } else if (Object.isExtensible((value: any))) {
    // If the value is an extensible type, stash the stack on the value. We
    // check extensibility for the edge case where one throws a frozen object or
    // something inherently non-extensible like null or a string
    stack = (value: any)._componentStack = getStackByFiberInDevAndProd(source);
  } else {
    // We can't stash the stack on the value
    stack = getStackByFiberInDevAndProd(source);
  }

  return {
    value,
    source,
    stack,
    digest: null,
  };
}

export function createCapturedValue<T>(
  value: T,
  digest: ?string,
  stack: ?string,
): CapturedValue<T> {
  if (
    Object.isExtensible((value: any)) &&
    !hasOwnProperty.call(value, '_componentStack')
  ) {
    (value: any)._componentStack = stack;
  }
  return {
    value,
    source: null,
    stack: stack != null ? stack : null,
    digest: digest != null ? digest : null,
  };
}
