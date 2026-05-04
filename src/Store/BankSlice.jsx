import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [
    {
      id: 1,
      name: "Anthony",
      balance: 500000,
      accountNumber: "1001",
      history: [],
    },
    {
      id: 2,
      name: "Faith",
      balance: 500000,
      accountNumber: "1002",
      history: [],
    },
    {
      id: 3,
      name: "Toheeb",
      balance: 500000,
      accountNumber: "1003",
      history: [],
    },
    {
      id: 4,
      name: "Daniel",
      balance: 500000,
      accountNumber: "1004",
      history: [],
    },
    {
      id: 5,
      name: "Clinton",
      balance: 500000,
      accountNumber: "1005",
      history: [],
    },
    {
      id: 6,
      name: "Francis",
      balance: 500000,
      accountNumber: "1006",
      history: [],
    },
    {
      id: 7,
      name: "Pelumi",
      balance: 500000,
      accountNumber: "1007",
      history: [],
    },
    {
      id: 8,
      name: "Simi",
      balance: 500000,
      accountNumber: "1008",
      history: [],
    },
    {
      id: 9,
      name: "Chibuike",
      balance: 500000,
      accountNumber: "1009",
      history: [],
    },
    {
      id: 10,
      name: "Maria",
      balance: 500000,
      accountNumber: "1010",
      history: [],
    },
  ],
};

const bankSlice = createSlice({
  name: "bank",
  initialState,
  reducers: {
    transfer: (state, action) => {
      console.log("REDUX TRANSFER FIRED", action.payload);
      console.log("BEFORE", state.users);
      const { fromAcc, toAcc, amount } = action.payload;

      const sender = state.users.find((u) => u.accountNumber === String(fromAcc));
      const receiver = state.users.find((u) => u.accountNumber === String(toAcc));

      if (!sender || !receiver) return;
      if (sender.balance < amount) return;

      const date = new Date().toLocaleString();

      sender.balance -= amount;
      receiver.balance += amount;

      sender.history.push({
        amount,
        type: "debit",
        date,
        who: receiver.name,
      });

      receiver.history.push({
        amount,
        type: "credit",
        date,
        who: sender.name,
      });
      console.log("AFTER", state.users);
    },
  },
});

export const { transfer } = bankSlice.actions;
export default bankSlice.reducer;