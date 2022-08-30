import type { NextPage } from 'next';
import { useEffect } from 'react';
import { getNfts } from '../apis';

const Home: NextPage = () => {
  useEffect(() => {
    (async () => {
      const { nfts } = await getNfts(
        '0xd8da6bf26964af9d7eed9e03e53415d37aa96045'
      );
      console.log({ nfts });
    })();
  }, []);

  return (
  <div className='p-10 flex flex-col items-center'>
      <h1 className='text-3xl font-bold'>NFTs</h1>
    </div>
  );
};

export default Home;
