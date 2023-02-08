import axios from "axios"
import * as fs from "fs"

const ORIG_BONK_ACCOUNT = "9AhKqLR67hwapvG8SA2JFXaCshXc9nALJjpKaHZrsbkw"
const HELIUS_KEY = process.env.HELIUS_API_KEY

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
      "4tXqLN1nKzJ7pNJJKrFCJdP4yAuWNdrMeswA1SukhJVkdGMd75KHvL9YgGwj6CvzhnncXoHhhzdrUbowghpPAYmK",
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
