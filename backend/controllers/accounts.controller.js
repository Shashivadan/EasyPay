import Accounts from "../models/accounts.model.js";
import mongoose from "mongoose";

async function balance(req, res) {
  const account = await Accounts.findOne({ userId: req.userId });

  if (!account) {
    return res.status(411).json({
      message: NaN,
    });
  }
  console.log(account);
  return res.status(200).json({
    balance: account.balance,
  });
}

async function transfer(req, res) {
  const receiverAccountId = req.body.to;
  const amount = req.body.amount;

  const session = await mongoose.startSession();
  await session.startTransaction();

  try {
    if (!receiverAccountId || !amount) {
      session.abortTransaction();
      await session.endSession();
      return res.json(411).json({
        massage: "transaction failed",
      });
    }

    const senderAccount = await Accounts.findOne({ userId: req.userId });

    if (senderAccount.balance < amount) {
      session.abortTransaction();
      await session.endSession();
      return res.status(400).json({
        message: "Insufficient balance",
      });
    }

    const receiverAccount = await Accounts.findOne({
      userId: receiverAccountId,
    });

    if (!receiverAccount) {
      session.abortTransaction();
      await session.endSession();
      return res.status(400).json({
        message: "Invalid account",
      });
    }

    senderAccount.balance -= amount;
    receiverAccount.balance += amount;

    await senderAccount.save();
    await receiverAccount.save();

    await session.commitTransaction();

    await session.endSession();

    return res.status(200).json({
      massage: "Transaction successful",
      amount: amount,
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.log(error);
    return res.status(400).json({
      massage: "Transaction failed",
    });
  }
}

export { balance, transfer };
