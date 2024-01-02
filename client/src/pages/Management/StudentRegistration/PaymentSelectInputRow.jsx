import React from "react";

const PaymentSelectInputRow = ({
  headerTitle,
  className,
  name,
  id,
  data,
  setData,
}) => {
  return (
    <>
      <th><span className="ml-3">{headerTitle}</span></th>
      <td className="p-2">
        <select
          onChange={(e) => setData(e.target.value)}
          className={className}
          name={name}
          id={id}
          value={data}
        >
          <option value="" disabled>
            Select a payment mode
          </option>
          <option value="Paypal">Paypal</option>
          <option value="Gcash">Gcash</option>
          <option value="Maya">Maya</option>
          <option value="Credit Card">Credit Card</option>
        </select>
      </td>
    </>
  );
};

export default PaymentSelectInputRow;
