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

  const test = async () => {
    const withdrawAuth = new PublicKey(
      "Mc5XB47H3DKJHym5RLa9mPzWv5snERsF3KNv5AauXK8"
    )
    const sigs = await connection.getSignaturesForAddress(withdrawAuth, {
      before:
        "ByWGKCsUixoiZezA9xUbMTRkxFP6xa2LEs2z8npCPsBvQHfNGrA1hWYySAMYjJmbFxNXyDVftnLioya9mzruuq3",
    })

    console.log(sigs)

    fs.writeFileSync("test.json", JSON.stringify(sigs, null, 2))
  }

  function getSignatures() {
    const data = fs.readFileSync("genesisCustodianTxSig.json", "utf8")
    const parsedData = JSON.parse(data)
    const signatures: any = []
    parsedData.forEach((item: any) => {
      signatures.push(item.signature)
    })
    console.log(signatures)
    fs.writeFileSync("test.json", JSON.stringify(signatures, null, 2))
  }

  const parseTransaction = async () => {
    const parse_transaction_url = `https://api.helius.xyz/v0/transactions/?api-key=${HELIUS_KEY}`

    const sig = fs.readFileSync("genesisTxSig.json", "utf8")
    const parsedData = JSON.parse(sig)
    const parsedArray = Array.isArray(parsedData) ? parsedData : [parsedData]
    const first100 = parsedArray.slice(0, 100)
    console.log(first100)

    const { data } = await axios.post(parse_transaction_url, {
      transactions: first100,
    })
    console.log(JSON.stringify(data, null, 2))
    fs.writeFileSync(
      "referenceParsedTransaction.json",
      JSON.stringify(data, null, 2)
    )
  }

  it("Test", async () => {
    // test()
    // getSignatures()
    // parseTransaction()
  })
})

// before(async () => {
//     payer = await initializeKeypair(connection)
// })
