import React, { useContext } from "react";
import { AppContext } from "../Context/AppContext";
import "../Style/LandingPage.css";
import { useNavigate } from "react-router-dom";
import Button from "../Component/Button";

const LandingPage = () => {
  const { user, logout } = useContext(AppContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="landing_Cont">
      <header className="landing_Header">
        <h2 className="bank_Name">The Curve Bank</h2>

        <div className="user_Section">
          <span className="user_Name">Anthony</span>
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
            <input className="input_Box" type="text" placeholder="Enter account number" />
          </label>

          <label>
            Amount
            <input className="input_Box" type="number" placeholder="₦0.00" />
          </label>

          <label>
            Memo (Optional)
            <textarea className="input_Box" placeholder="Rent, dinner, etc." />
          </label>

          <Button name="Send Transfer" className="send_Btn" />
        </div>
        <div className="side_Section">
          <div className="balance_Card">
            <h4>Total Available Balance</h4>
            <h2 className="balance">₦12,450.80</h2>
            <small>Across 2 accounts</small>
          </div>

          <div className="history_Card">
            <h4>Transaction History</h4>

            <div className="history_Row">
              <span>Debit</span>
              <span className="debit">-₦3,200.00</span>
            </div>

            <div className="history_Row">
              <span>Credit</span>
              <span className="credit">+₦9,250.80</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;