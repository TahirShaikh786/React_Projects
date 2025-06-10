const fetchWeather = async (req, res) => {
  const {city} = req.params;
  console.log("City", city);
  
  try {
    const response = await fetch(`${process.env.API_URL}q=${city}&appid=${process.env.API_KEY}&units=metric`, {
      method: "GET",
      headers: {
        "Content-Type" : "application/json"
      }
    })

    const data = await response.json();

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({message: "Internal Server Error"});
  }
}

export default fetchWeather;