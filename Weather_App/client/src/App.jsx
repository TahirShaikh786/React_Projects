import { useState } from "react";
import { toast } from "react-toastify";

function App() {
  let sunrise = "", sunset = "";
  const [city, setCity] = useState("");
  const [resultCity, setResultCity] = useState(null);

  if(resultCity && resultCity.cod === 200){
    sunrise = new Date(resultCity.sys.sunrise * 1000).toLocaleTimeString();
    sunset = new Date(resultCity.sys.sunset * 1000).toLocaleTimeString();
  }

  const handleChange = (e) => {
    setCity(e.target.value);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/v1/${city}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();

    if (response.ok) {
      setResultCity(data);
      toast.success(`Your ${city} City Result`);
    } else {
      toast.error("Invalid City");
    }
  };

  return (
    <>
      <div className="w-100 flex flex-col items-center">
        <h1 className="text-3xl uppercase font-bold tracking-wide underline m-3">
          Weather App
        </h1>
        <div className="w-1/2 flex flex-col p-2">
          <label>Enter City Name:</label>
          <input
            className="p-2 rounded"
            type="text"
            name="city"
            onChange={handleChange}
            value={city}
            id=""
          />
          <div className="w-100 m-2 flex justify-center ">
            <button
              onClick={handleSearch}
              className="bg-white py-1 px-4 rounded text-black font-bold tracking-wider"
            >
              Search
            </button>
          </div>
        </div>

        <div className="w-1/2 flex flex-col p-2 rounded bg-black">
          {resultCity && resultCity.cod === 200 && (
            <div className="w-full flex flex-col">
                  <h2 className="text-2xl font-bold">🌡️ {resultCity.main.temp} °C <span className="text-sm">(Feels like {resultCity.main.feels_like}°C)</span></h2>
              <div className="flex justify-between items-center w-full">
                <div className="flex items-center">
                  <h3 className="uppercase font-bold">
                  📍 {resultCity.name}, {resultCity.sys.country}
                </h3>
                <img
                  src={`https://openweathermap.org/img/wn/${resultCity.weather[0].icon}@2x.png`}
                  className="w-16"
                  alt=""
                />
                </div>
                
                <div>
                  <h3 className="font-bold capitalize tracking-wider">{resultCity.weather[0].description}</h3>
                </div>
              </div>

              <div className="flex justify-between">
                {/* <p className="text-sm">longitude: <span className="underline font-bold">{resultCity.coord.lon}</span>, latitude: <span className="underline font-bold">{resultCity.coord.lat}</span></p> */}
                <p>💨 Wind: <span>{resultCity.wind.speed}m/s</span></p>

                <p>💧 Humidity: <span>{resultCity.main.humidity}%</span></p>
              </div>
              <div className="flex justify-between">
                <p>🌅 Sunrise: <span>{sunrise}</span></p>

                <p>🌇 Sunset: <span>{sunset}</span></p>
              </div>
            </div>
          )}

          {!resultCity && (
            <h3 className="text-center tracking-widest p-3 font-bold">No Result Found</h3>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
