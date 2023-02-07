import {
  Connection,
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
} from "@solana/web3.js"
import { initializeKeypair } from "./initializeKeypair"
import axios from "axios"
import dotenv from "dotenv"
dotenv.config()
import fs from "fs"

describe("Bonk", () => {
  const connection = new Connection(process.env.HELIUS_MAINNET!, "confirmed")

  const HELIUS_KEY = process.env.HELIUS_API_KEY
  const ORIG_BONK_ACCOUNT = "9AhKqLR67hwapvG8SA2JFXaCshXc9nALJjpKaHZrsbkw"

  const parseTransactions = async () => {
    const parse_transactions_url = `https://api.helius.xyz/v0/addresses/${ORIG_BONK_ACCOUNT}/transactions`
    const params = new URLSearchParams()
    params.append("api-key", HELIUS_KEY!)
    // params.append(
    //   "before",
    //   "3457h9Dt5ddXnJHN7M9yM1qmRgvJbDGmVYjzADNXZFaEQ2HKDq6rneSZNd9y8KypNK6HH4JEW1kpKTykjmGu8Fdv"
    // )
    params.append("type", "TRANSFER")

    const { data } = await axios.get(parse_transactions_url, { params })
    console.log(JSON.stringify(data, null, 2))
    fs.writeFileSync(
      "referenceParsedTransactionsTypeTransfer.json",
      JSON.stringify(data, null, 2)
    )
  }

  const parseTransaction = async () => {
    const parse_transaction_url = `https://api.helius.xyz/v0/transactions/?api-key=${HELIUS_KEY}`

    const { data } = await axios.post(parse_transaction_url, {
      transactions: [
        "2xsyZUcBPcAigMKeNbPgxWCN2BWsNL8Sd6cstNnxN3J46Lnk3MueCG7jCZpsYX6jqsHWUYq3fpj358jze8g7uGu5",
      ],
    })
    console.log(JSON.stringify(data, null, 2))
    fs.writeFileSync(
      "referenceParsedTransaction.json",
      JSON.stringify(data, null, 2)
    )
  }

  const rawTransaction = async () => {
    const raw_transaction_url = `https://api.helius.xyz/v1/raw-transactions?api-key=${HELIUS_KEY}`
    const { data } = await axios.post(raw_transaction_url, {
      query: {
        accounts: [ORIG_BONK_ACCOUNT],
        startSlot: 165720272,
        endSlot: 165722272,
      },
    })
    console.log(JSON.stringify(data, null, 2))
    fs.writeFileSync(
      "referenceRawTransaction.json",
      JSON.stringify(data, null, 2)
    )
  }

  it("Test", async () => {
    // parseTransactions()
    // parseTransaction()
    // rawTransaction()
  })
})

// before(async () => {
//     payer = await initializeKeypair(connection)
// })
