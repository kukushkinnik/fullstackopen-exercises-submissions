import axios from "axios"
import { useEffect, useState } from "react"

export const useCountry = (name) => {
  const [country, setCountry] = useState(null)

  useEffect(() => {
    if (name) {
      axios
        .get(`https://restcountries.com/v3.1/name/${name}?fullText=true`)
        .then((response) => setCountry(response.data))
    }
  }, [name])

  if (!name) {
    console.log(country)
    return null
  }

  if (!country) {
    console.log(country)
    return [];
  }


  return country
}