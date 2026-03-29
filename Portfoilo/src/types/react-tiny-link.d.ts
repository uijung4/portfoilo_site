declare module 'react-tiny-link' {
  import { FC } from 'react';

  interface ReactTinyLinkProps {
    url: string;
    cardSize?: 'small' | 'large';
    showGraphic?: boolean;
    maxLine?: number;
    minLine?: number;
    width?: number;
    header?: string;
    description?: string;
    proxyUrl?: string;
    defaultMedia?: string;
    noCache?: boolean;
    autoPlay?: boolean;
    loadSecureUrl?: boolean;
    requestHeaders?: Record<string, string>;
    onError?: (error: Error) => void;
    onSuccess?: (data: unknown) => void;
    onClick?: (e: Event, data: unknown) => void;
  }

  export const ReactTinyLink: FC<ReactTinyLinkProps>;
}
