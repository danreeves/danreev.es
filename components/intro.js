import React from 'react';
import BaffledLink from './common/link';

export default () => (
  <div>
    <p>
      Hey. I&apos;m{' '}
      <BaffledLink href="https://twitter.com/dnrvs">Dan Reeves</BaffledLink>,
      Frontend Engineer at{' '}
      <BaffledLink href="https://treasuredata.com">Treasure Data</BaffledLink>.
      I love all things JavaScript. You&apos;ll sometimes find me playing video
      games or reading books. I also co-organise{' '}
      <BaffledLink href="https://join.cornwallgeeks.net">
        Cornwall Geeks
      </BaffledLink>.
    </p>
    <p>
      Want to talk? <BaffledLink href="/contact">Contact me</BaffledLink>
    </p>
  </div>
);
