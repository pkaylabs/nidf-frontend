import React from "react";

interface Trans {
  data: any;
}

const TransaactionDetails = ({ data }: Trans) => {
  const menu = [
    {
      title: "Project Name",
      value: "Church Hall Renovation",
    },
    {
      title: "Amount",
      value: "GHS 5,000",
    },
    {
      title: "Payment Date",
      value: "Jan 15, 2025",
    },
    {
      title: "Bank Account",
      value: "Church Bank - 0234XXXXXX",
    },
    {
      title: "Transaction ID",
      value: "TXN-98765",
    },
    {
      title: "Status",
      value: data,
    },
  ];

  return (
    <section className="font-poppins p-4">
      <h4 className="font-medium text-xl text-[#454545] ">
        Transaction Details
      </h4>

      <div className="flex flex-wrap justify-between mt-6">
        {menu.map((item: any, idx: number) => (
          <div className="w-1/2 mb-6">
            <p className="font-light text-base text-[#545454] mb-4">
              {item.title}{" "}
            </p>
            <h2
              className={`font-semibold text-2xl text-[#252525] ${
                idx === menu.length - 1
                  ? item.value === "Completed"
                    ? "text-[#2D9632]"
                    : "text-[#AD6915] "
                  : "text-[#252525]"
              } `}
            >
              {item.value}
            </h2>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TransaactionDetails;
