import React, { useEffect, useState } from "react";
import { FcBusinessman, FcBusinesswoman, FcHeadset, FcHighPriority, FcMinus, FcMoneyTransfer, FcPlus, FcSalesPerformance } from "react-icons/fc";
import { getData } from "../../api/auth";
import unit from "../../assets/svg/unit.svg";
import Button from "../../components/ui/Button";
import StatusBox from "../../components/ui/StatusBox";
import WindowContainer from "../../components/ui/WindowContainer";

const Dashboard = () => {
  const [sampleData, setSampleData] = useState({});

  useEffect(() => {
    getData()
      .then((response) => {
        setSampleData(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const data = [
    {
      id: 1,
      name: "Item 1",
      content: "samplecontent1",
      data: sampleData.sample1,
      icon: <FcBusinessman size='40'/>,
    },
    {
      id: 2,
      name: "Item 2",
      content: "samplecontent2",
      data: sampleData.sample2,
      icon: <FcMoneyTransfer size='40' />
    },
    {
      id: 3,
      name: "Item 3",
      content: "samplecontent3",
      data: sampleData.sample3,
      icon: <FcBusinesswoman size='40'/>,
    },
    {
      id: 4,
      name: "Item 4",
      content: "samplecontent4",
      data: sampleData.sample4,
      icon: <FcSalesPerformance size='40' />
    },
    {
      id: 5,
      name: "Item 5",
      content: "samplecontent5",
      data: sampleData.sample5,
      icon: <FcHeadset size='40' />
    },
    {
      id: 6,
      name: "Item 6",
      content: "samplecontent6",
      data: sampleData.sample6,
      icon: <FcBusinessman size='40'/>,
      iconTwo: <FcPlus size='20' />,
      isTwoIcon: true
    },
    {
      id: 7,
      name: "Item 7",
      content: "samplecontent7",
      data: sampleData.sample7,
      icon: <FcBusinessman size='40'/>,
      iconTwo: <div className="flex bg-red-600 rounded-full text-white" > <FcMinus size='18'/> </div>,
      isTwoIcon: true
    },
    {
      id: 8,
      name: "Item 8",
      content: "samplecontent8",
      data: sampleData.sample8,
      icon: <FcBusinessman size='40'/>,
      iconTwo: <FcHighPriority size='20' />,
      isTwoIcon: true
    },
  ];
  return (
    <div className="w-full">
      <WindowContainer headerTitle="Dashboard">
        <div className="main-content-area  p-3 w-full">
          <div className="flex justify-center flex-col items-center m-5">
            <StatusBox />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7 place-items-center p-5 w-full">
              {data.map((item, i) => {
                return (
                  <div
                    key={item.id}
                    className="w-full card-container flex flex-wrap items-center justify-between text-gray-700 border border-solid border-[#4F5B79]"
                  >
                    <div className="title flex bg-[#4F5B79] w-full h-3/12 justify-center items-center flex-shrink">
                      <h5 className="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-white">
                        {item.name}
                      </h5>
                    </div>
                    <div className="content flex justify-between items-center bg-white w-full h-20 min-w-fit overflow-hidden p-6">
                      {/* <img src={item.svg} alt="user logo" className="w-10" /> */}
                      {(
                        item.isTwoIcon ? (<div  className="relative">
                          {item.icon}
                          <div className="absolute bottom-0 right-0">{item.iconTwo}</div>
                        </div>) : item.icon
                      )}
                      
                      <p className="block font-sans text-base antialiased font-light leading-relaxed text-inherit sm:text-md md:text-lg lg:text-2xl">
                        {Math.floor(Math.random() * 1000000).toLocaleString("en-US")}
                      </p>
                      <img src={unit} alt="unit logo" className="w-8" />
                    </div>
                    <div className="flex justify-center items-center w-full p-2">
                      <p className="bg-[#DFDFDF] w-full text-center">
                        {item.content}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="flex justify-center items-center w-2/5">
              <Button color="white" text="View by Month" />
            </div>
          </div>
        </div>
      </WindowContainer>

    </div>

  );
};
export default Dashboard;
