import { PrismaClient } from "@prisma/client"
import { LAMPORTS_PER_SOL } from "@solana/web3.js"
import fs from "fs"
const prisma = new PrismaClient()

async function main() {
  const test = await prisma.tokenTransfer.findMany({
    where: {
      transactionSignature:
        "29kkxTYh9xj7QLxjkHm1dWJFiWQzxVAda6W4hoK9QmnJETb6gnk8F1txyKwLMufh4kTN5AfqMuSwKMoHX5caGhvS",
    },
  })

  console.log(test)
}

const loadData = async () => {
  const rawData = fs.readFileSync(
    "referenceParsedTransactionsTypeTransfer.json",
    "utf-8"
  )
  const transactions: Transaction[] = JSON.parse(rawData)
  for (const transaction of transactions) {
    const {
      description,
      type,
      source,
      fee,
      feePayer,
      signature,
      slot,
      timestamp,
      tokenTransfers,
      nativeTransfers,
      accountData,
      transactionError,
      instructions,
      events,
    } = transaction
    const data = {
      description,
      type,
      source,
      fee,
      feePayer,
      signature,
      slot,
      timestamp,
    }
    console.log(signature)
    const newTransaction = await prisma.transaction.create({ data })
    if (tokenTransfers) {
      for (const tokenTransfer of tokenTransfers) {
        const {
          fromTokenAccount,
          toTokenAccount,
          fromUserAccount,
          toUserAccount,
          tokenAmount,
          mint,
          tokenStandard,
        } = tokenTransfer
        await prisma.tokenTransfer.create({
          data: {
            fromTokenAccount,
            toTokenAccount,
            fromUserAccount,
            toUserAccount,
            tokenAmount,
            mint,
            tokenStandard,
            transactionSignature: newTransaction.signature,
          },
        })
      }
    }
    if (nativeTransfers) {
      for (const nativeTransfer of nativeTransfers) {
        const { fromUserAccount, toUserAccount, amount } = nativeTransfer
        await prisma.nativeTransfer.create({
          data: {
            from: fromUserAccount,
            to: toUserAccount,
            amount: amount / LAMPORTS_PER_SOL,
            transactionSignature: newTransaction.signature,
          },
        })
      }
    }
  }
}

main()
  .catch((e) => {
    console.log(e.message)
  })
  .finally(async () => {
    // await prisma.$disconnect
  })

interface Transaction {
  description: string
  type: string
  source: string
  fee: number
  feePayer: string
  signature: string
  slot: number
  timestamp: number
  tokenTransfers: []
  nativeTransfers: {
    fromUserAccount: string
    toUserAccount: string
    amount: number
  }[]
  accountData: {
    account: string
    nativeBalanceChange: number
    tokenBalanceChanges: []
  }[]
  transactionError: any
  instructions: {
    accounts: string[]
    data: string
    programId: string
    innerInstructions: []
  }[]
  events: any
}
