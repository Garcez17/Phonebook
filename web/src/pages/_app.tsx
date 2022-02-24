import type { AppProps } from 'next/app';
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import { Wrapper } from '../components/Wrapper';

import { queryClient } from '../services/queryClient';

import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Wrapper>
        <Component {...pageProps} />
      </Wrapper>

      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}

export default MyApp
