import {
    Connection,
    Keypair,
    LAMPORTS_PER_SOL,
    PublicKey,
} from '@solana/web3.js';
import { initializeKeypair } from "./initializeKeypair"
import axios from 'axios'
import dotenv from 'dotenv';
dotenv.config();

describe("Bonk", () => {
    const connection = new Connection(
        process.env.HELIUS_MAINNET,
        'confirmed'
    );

    const HELIUS_KEY = process.env.HELIUS_API_KEY
    const ORIG_BONK_ACCOUNT = '9AhKqLR67hwapvG8SA2JFXaCshXc9nALJjpKaHZrsbkw'
    const url = `https://api.helius.xyz/v0/addresses/${ORIG_BONK_ACCOUNT}/transactions`
    const params = new URLSearchParams();
    params.append('api-key', HELIUS_KEY);
    params.append('before', '2FKnExiTTTFXNquuedno58PwZ26vJ9NhFH9HbysjKkZCDueNuJxQLD1DRD7pD1UfYcdFFwpjjKmDXsHPqot4vKCi');
    params.append('type', 'TRANSFER');


    const parseTransactions = async () => {
        const { data } = await axios.get(url, {params})
        console.log("parsed transactions: ", JSON.stringify(data, null, 2))
    }
    it("Test", async () => {
        parseTransactions()
    })
})



// before(async () => {
//     payer = await initializeKeypair(connection)
// })