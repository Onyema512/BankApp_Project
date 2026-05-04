import React, { useContext, useState } from "react";
import { AppContext } from "../Context/AppContext";
import "../Style/LandingPage.css";
import { useNavigate } from "react-router-dom";
import Button from "../Component/Button";
import { useDispatch, useSelector } from "react-redux";
import { transfer } from "../Store/BankSlice";

const LandingPage = () => {
  const { currentUser, logout } = useContext(AppContext);
  const navigate = useNavigate();
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");

  const users = useSelector((state) => state.bank.users);
  const dispatch = useDispatch();

 const reduxUser = useSelector((state) => {
  return state.bank.users.find(
    (u) => u.accountNumber === String(currentUser?.accountNumber)
  );
});

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleTransfer = () => {
  console.log("TRANSFER CLICKED");

  if (!recipient || !amount) return;
  if (!currentUser?.accountNumber) return;

  const receiverExists = users.find((u) => u.accountNumber === String(recipient));
  if (!receiverExists) {
    alert("Account not found");
    return;
  }
console.log(transfer);
  dispatch(
    transfer({
      fromAcc: currentUser.accountNumber,
      toAcc: recipient,
      amount: Number(amount),
    })
  );

  setAmount("");
  setRecipient("");
};

// console.log("TRANSFER CLICKED");
//   const handleTransfer = () => {
//   if (!recipient || !amount) return;

//   dispatch(
//     transfer({
//       fromAcc: currentUser.accountNumber,
//       toAcc: recipient,
//       amount: Number(amount),
//     })
//   );

//   setAmount("");
//   setRecipient("");
// };

  return (
    <div className="landing_Cont">
      <header className="landing_Header">
        <h2 className="bank_Name">The Curve Bank</h2>
        <div className="user_Section">
          <span className="user_Name">{currentUser?.name}</span>
          <Button name="Logout" className="logout_Btn" onClick={handleLogout} />
        </div>
      </header>

      <section className="landing_Body">
        <div className="transfer_Card">
          <h3 className="card_Title">Transfer Funds</h3>

          <label>
            From Account
            <select className="input_Box">
              <option>Personal Checking (...1234)</option>
            </select>
          </label>

          <label>
            Recipient Full Name
            <input className="input_Box" type="text" placeholder="Enter name" />
          </label>

          <label>
            Recipient Account Number
            <input className="input_Box" type="text" placeholder="Enter account number"  
               value={recipient}
               onChange={(e) => setRecipient(e.target.value)} />
          </label>

          <label>
            Amount
            <input className="input_Box" type="number" placeholder="₦0.00" 
              value={amount}
              onChange={(e) => setAmount(e.target.value)}/>
          </label>

          <label>
            Memo (Optional)
            <textarea className="input_Box" placeholder="Rent, dinner, etc." />
          </label>
          <Button name="Send Transfer" className="send_Btn" onClick={handleTransfer} />
        </div>

        <div className="side_Section">
          <div className="balance_Card">
            <h4>Total Available Balance</h4>
            <h2 className="balance">
              ₦{reduxUser?.balance ?? 500000}
            </h2>
            <small>Across 1 account</small>
          </div>

          <div className="history_Card">
            <h4>Transaction History</h4>
            {reduxUser?.history?.length > 0 ? (
              reduxUser.history.map((item, index) => (
                <div className="history_Row" key={index}>
                  <span>{item.type}</span>
                  <span className={item.type}>
                    ₦{item.amount}
                  </span>
                  <small>{item.who}</small>
                  <small>{item.date}</small>
                </div>
              ))
            ) : (
              <>
                <div className="history_Row">
                  <span>Debit</span>
                  <span className="debit">-₦0</span>
                </div>

                <div className="history_Row">
                  <span>Credit</span>
                  <span className="credit">+₦0</span>
                </div>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;