import React from "react";

const data = [
  {
    title: "Bank Name",
    value: "National Church Savings Bank",
  },
  {
    title: "Account Name",
    value: "DLCF Legon Local",
  },
  {
    title: "Account Number",
    value: "Church Bank - 0234XXXXXX",
  },
  {
    title: "Transaction ID",
    value: "TXN-98765",
  },
];

const BankingInfo = () => {
  return (
    <section className="font-poppins p-4">
      <h4 className="font-medium text-xl text-[#454545] ">Bank Details</h4>

      <div className="flex flex-wrap justify-between mt-6">
        {data.map((item, idx) => (
          <div className="w-1/2 mb-6">
            <p className="font-light text-base text-[#545454] mb-4">
              {item.title}{" "}
            </p>
            <h2 className={`font-semibold text-2xl  text-[#252525] `}>
              {item.value}
            </h2>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BankingInfo;
