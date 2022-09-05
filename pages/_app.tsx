import '../styles/globals.css'
import React from 'react';
import { NextPage } from 'next';
import type { AppProps } from 'next/app'

type Page<P = unknown> = NextPage<P> & {
  getLayout?: (page: React.ReactNode) => React.ReactNode;
  layout?: React.ReactNode;
};

type Props = AppProps & {
  Component: Page;
  pageProps: any;
};

function MyApp({ Component, pageProps }: Props) {
  const getLayout = Component.getLayout || ((page) => page);
  return (
    <div>
        {getLayout(<Component {...pageProps} />)}
    </div>
  );
}

export default MyApp
