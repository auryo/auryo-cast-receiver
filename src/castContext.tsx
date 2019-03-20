import * as React from 'react';

export interface CastContextInterface {
  castReceiverContext: cast.framework.CastReceiverContext;
};

const ctxt = React.createContext<CastContextInterface | null>(null);

export const CastContextProvider = ctxt.Provider;

export const CastContextConsumer = ctxt.Consumer;

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export type WithCastContext = { castContext?: CastContextInterface };

export function withCastContext<P extends WithCastContext>(Component: React.ComponentType<P>) {
  return function WrappedComponent(
    props: Omit<P, 'castContext'>
  ) {
    return (
      <CastContextConsumer>
        {(value) => <Component {...props as P} castContext={value} />}
      </CastContextConsumer>
    );
  }
}