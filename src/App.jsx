import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [search, setsearch] = useState("");
  const [curr, setcurr] = useState([]);

  useEffect(() => {
    axios
      .get("https://openapiv1.coinstats.app/coins?limit=10", {
        headers: {
          "X-API-KEY": "9prnYKio454AXvIjTzwGQ0/OVNbIJGyC4pDoYnvqBtI=",
        },
      })
      .then((res) => setcurr(res.data.result))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      {" "}
      <div className=" flex flex-col items-center gap-x-14 font-medium p-40px mt-10">
        <h1 className="text-fuchsia-500 text-4xl mb-4">Crypto Currency</h1>

        <input
          className=" flex p-5px font-medium w-250px h-30px rounded text-center text-lg w-80 h-10 border-gray-300"
          type="text"
          placeholder="Searching"
          onChange={(e) => setsearch(e.target.value)}
        />

        <table className="w-1000px collapse-separate border-spacing-1">
          <thead className="text-center">
            <tr className="p-7px">
              <th>Rank</th>
              <th>Name</th>
              <th>Symbol</th>
              <th>Market Cap</th>
              <th>Price</th>
              <th>Available Supply</th>
              <th>Volume</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {curr
              .filter((val) =>
                val.name.toLowerCase().includes(search.toLowerCase())
              )
              .map((val) => (
                <tr key={val.id}>
                  <td className="text-center font-bold">{val.rank}</td>
                  <td className=" flex justify-self-start p-10px gap-10">
                    <a href={val.websiteUrl}>
                      <img className="w-50px h-50px" src={val.icon} alt="" />
                    </a>
                    <p>{val.name}</p>
                  </td>
                  <td className="text-center">{val.symbol}</td>
                  <td>${val.marketCap}</td>
                  <td>${val.price.toFixed(2)}</td>
                  <td>{val.availableSupply}</td>
                  <td>{val.volume.toFixed(0)}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default App;
