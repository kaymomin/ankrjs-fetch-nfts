Fetch all the NFTs owned by a particular wallet or owner across multiple blockchains such as Ethereum, Polygon, and Fantom, to name a few, using [Ankr's Advanced Multichain APIs](https://www.ankr.com/advanced-api/).

### Ankr Advanced APIs
Ankr's Advanced Multichain APIs are the collection of RPC methods created to simplify querying blockchain data. These APIs do all the heavy lifting for us so that we can query on-chain data in a matter of seconds. 

Currently, it supports six EVM compatible chains: Ethereum, Fantom, Binance Smart Chain, Polygon, Avalanche, Arbitrum, with more EVM and non-EVM chains coming soon. To interact with Ankr's Advanced APIs, we are going to use a JavaScript library named [Ankr.js](https://www.npmjs.com/package/@ankr.com/ankr.js).

_____________________________________________

## Getting Started

**Prerequisite:** To successfully finish this guide, you'll need [Node.js](https://nodejs.org/en/) and [Yarn](https://yarnpkg.com/) installed on your machine.

### Step 1: Setting Up Next.js Starter Application
First up, navigate into the directory of your choice where you want to initiate this project and run the following command in your terminal to set up a new Next.js starter page:

```
yarn create next-app --ts ankrjs-fetch-nfts
```

You'll be able to see a couple of files and folders being created for you. Let's dive into the newly created directory and start the development server on localhost:3000.

```
cd ankrjs-fetch-nfts
```
```
yarn dev
```

Visit localhost:3000 to view the starter application.

______________________________________

### Step 2: Installing and Setting Up Ankr.js

In this section, we will install and set up Ankr.js for querying NFT data from the blockchain for a given wallet address.

We will start by installing the ankr.js package from npm:

```
yarn add @ankr.com/ankr.js
```

Now that we have installed the Ankr.js library, let's set up Ankr.js by **creating a new file** named `apis.ts` at the root of your project directory. We will initialize Ankr.js in this file.

**File:** `./apis.ts`
```
import AnkrscanProvider from '@ankr.com/ankr.js';
import type { Blockchain } from '@ankr.com/ankr.js/dist/types';

const provider = new AnkrscanProvider('');

```
To interact with Ankr's Advanced APIs, we have created a provider instance that will serve as an interface to the APIs required to fetch data.

___________________________________

### Step 3: Create getNFTs Function

In this step, you will create a `getNfts` function that accepts a `walletAddress` and returns a list of NFTs owned by that address.

Here, we are going to utilize the `getNFTsByOwner` function provided by Ankr.js for this.

File: `./apis.ts`

```
import AnkrscanProvider from '@ankr.com/ankr.js';
import type { Blockchain } from '@ankr.com/ankr.js/dist/types';

const provider = new AnkrscanProvider('');

export const getNfts = async (address: string) => {
  const { assets } = await provider.getNFTsByOwner({
    walletAddress: address,
    blockchain: 'eth',
  });
  return {
    nfts: assets,
  };
};
```
And that's it. 

Let's call this function on our page i.e. `./pages/index.tsx` to see the fetched NFTs by the owner's wallet address and log the output. To do so, clear the code from the **index.tsx** file and replace it with the one given below:

**File:** `./pages/index.tsx`

```
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
```

Now, let's see the NFT logs of an inputted wallet address in the developer console of a browser. 

- Head over to your localhost and use `Option + ⌘ + J` (on macOS), or `Shift + CTRL + J` (on Windows/Linux). 

You should be able to see the list of NFTs owned by a particular address. 

![screely-1661078460144](https://user-images.githubusercontent.com/44579545/186136494-3b6ffa82-b65e-4dde-a931-aabfffa4cf61.png)

You can also extend the toggle to dive into the details of the NFTs held by the owner. Details include: `blockchain`, `collectionName`, `contractAddress`, `contractType`, `imageUrl`, `name`, `symbol`, `tokenId` and `tokenUrl`.

![screely-1661078840436](https://user-images.githubusercontent.com/44579545/186136549-77f10e62-6c6d-459b-80cd-345d81afe8cc.png)
