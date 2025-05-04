import React from "react";

interface Trans {
  data: any;
}

const BankingInfo = ({ data }: Trans) => {
  const info = [
    {
      title: "Bank Name",
      value: `${data?.bank_name ?? "N/A"}`,
    },
    {
      title: "Account Name",
      value: `${data?.account_name ?? "N/A"}`,
    },
    {
      title: "Account Number",
      value: `${data?.account_num ?? "N/A"}`,
    },
    {
      title: "Transaction ID",
      value: data?.trans_id ?? "N/A",
    },
  ];
  return (
    <section className="font-poppins p-4">
      <h4 className="font-medium text-xl text-[#454545] ">Bank Details</h4>

      <div className="flex flex-wrap justify-between mt-6">
        {info.map((item, idx) => (
          <div className="w-1/2 mb-6">
            <p className="font-light text-base text-[#545454] mb-4">
              {item.title}{" "}
            </p>
            <h2 className={`font-semibold md:text-2xl  text-[#252525] `}>
              {item.value}
            </h2>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BankingInfo;
