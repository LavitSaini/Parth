import React, { useState } from "react";
import { SpaceIcon, X } from "lucide-react";
import toast from "react-hot-toast";
import { axiosInstance } from "./lib/axios";

const App = () => {
  const [data, setData] = useState("");
  const [response, setResponse] = useState();
  const options = [
    { value: "alphabets", label: "Alphabets" },
    { value: "numbers", label: "Numbers" },
    { value: "highest_alphabets", label: "Highest Alphabets" },
  ];

  const [selectedOptions, setSelectedOptions] = useState([]);


  const handleSelect = (event) => {
    const value = event.target.value;
    if (value && !selectedOptions.some((opt) => opt.value === value)) {
      setSelectedOptions([
        ...selectedOptions,
        options.find((opt) => opt.value === value),
      ]);
    }
  };

  const handleRemove = (value) => {
    setSelectedOptions(selectedOptions.filter((opt) => opt.value !== value));
  };

  const validateData = () => {
    try {
      JSON.parse(data);
      return true;
    } catch (error) {
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = validateData();

    const fetchData = async () => {
      console.log("inside fetch data");

      const data = JSON.parse(data).data;
      const res = await axiosInstance.post('/bhfl', {
        data,
      });
      console.log(res);
    }
    if (success) {
      const parsedData = JSON.parse(data).data;
      const res = await axiosInstance.post('/bhfl', {
        data: parsedData,
      });
      console.log(res);
      setResponse(res.data);
    } else {
      toast.error("Invalid JSON format for API data!");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <form className="min-w-[24rem] flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="relative">
          <label
            htmlFor="data"
            className="absolute -top-3 left-3 bg-white p-0.5 text-[0.75rem]"
          >
            API Input
          </label>
          <input
            type="text"
            id="data"
            className="px-3 py-1.5 outline-none border-solid border-[1px] border-blue-400 text-black w-full rounded-md"
            value={data}
            onChange={(e) => setData(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="py-1.5 bg-blue-500 text-white rounded-md"
        >
          Submit
        </button>
        <div className="relative">
          <label
            htmlFor="filter"
            className="absolute -top-3 left-3 bg-white p-0.5 text-[0.75rem]"
          >
            Multi Filter
          </label>
          <div className="border border-blue-400 rounded-md px-3 py-1.5 w-full flex flex-wrap items-center gap-2">
            {selectedOptions.map((option) => (
              <li
                key={option.value}
                className="bg-blue-500 text-white px-2 py-1 rounded flex items-center gap-1 mt-2 text-sm"
              >
                {option.label}
                <button
                  onClick={() => handleRemove(option.value)}
                  className="ml-1 text-white"
                >
                  <X size={14} />
                </button>
              </li>
            ))}
            <select
              id="filter"
              className="outline-none text-black w-full bg-transparent"
              onChange={handleSelect}
              value=""
            >
              <option value="" disabled className="hidden"></option>
              {options.map((option) => (
                <option
                  key={option.value}
                  value={option.value}
                  disabled={selectedOptions.some(
                    (opt) => opt.value === option.value
                  )}
                >
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </form>
      <div>
        {response && (
          <>
            <div>
              <span>Alphabets: </span>
              {response.alphabets && (
                response.alphabets.map((a) => <span>{a}</span>)
              )}
            </div>
            <div>
              <span>Numbers: </span>
              {response.numbers && (
                response.numbers.map((a) => <span>{a}  {''}</span>)
              )}
            </div>

          </>
        )}
      </div>
    </div>
  );
};

export default App;
