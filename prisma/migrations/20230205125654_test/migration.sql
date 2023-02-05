-- CreateTable
CREATE TABLE "Transaction" (
    "description" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "source" TEXT NOT NULL,
    "fee" INTEGER NOT NULL,
    "feePayer" TEXT NOT NULL,
    "signature" TEXT NOT NULL,
    "slot" INTEGER NOT NULL,
    "timestamp" INTEGER NOT NULL,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("signature")
);

-- CreateTable
CREATE TABLE "TokenTransfer" (
    "fromTokenAccount" TEXT NOT NULL,
    "toTokenAccount" TEXT NOT NULL,
    "fromUserAccount" TEXT NOT NULL,
    "toUserAccount" TEXT NOT NULL,
    "tokenAmount" INTEGER NOT NULL,
    "mint" TEXT NOT NULL,
    "tokenStandard" TEXT NOT NULL,
    "transactionSignature" TEXT NOT NULL,

    CONSTRAINT "TokenTransfer_pkey" PRIMARY KEY ("transactionSignature","fromUserAccount","toUserAccount")
);

-- CreateTable
CREATE TABLE "NativeTransfer" (
    "from" TEXT NOT NULL,
    "to" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "transactionSignature" TEXT NOT NULL,

    CONSTRAINT "NativeTransfer_pkey" PRIMARY KEY ("transactionSignature","from","to")
);

-- CreateIndex
CREATE INDEX "Transaction_feePayer_idx" ON "Transaction"("feePayer");

-- AddForeignKey
ALTER TABLE "TokenTransfer" ADD CONSTRAINT "TokenTransfer_transactionSignature_fkey" FOREIGN KEY ("transactionSignature") REFERENCES "Transaction"("signature") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NativeTransfer" ADD CONSTRAINT "NativeTransfer_transactionSignature_fkey" FOREIGN KEY ("transactionSignature") REFERENCES "Transaction"("signature") ON DELETE RESTRICT ON UPDATE CASCADE;
