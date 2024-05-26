"use client";

import { Country } from "@/lib/types";
import { useEffect, useState } from "react";

type SelectCountryProps = {
  defaultCountry: string;
  name: string;
  id: string;
  className: string;
};
function SelectCountry({
  defaultCountry,
  name,
  id,
  className,
}: SelectCountryProps) {
  const [countries, setCountries] = useState<Country[]>();
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await fetch(
          "https://restcountries.com/v2/all?fields=name,flag"
        );
        if (!res.ok) {
          throw new Error(`Failed to fetch countries: ${res.statusText}`);
        }
        const countries = await res.json();
        setCountries(countries);
      } catch (error) {
        console.error("Could not fetch countries:", error);
        throw error;
      }
    };
    fetchCountries();
  }, []);
  const flag =
    countries?.find((country) => country.name === defaultCountry)?.flag ?? "";

  return (
    <select
      name={name}
      id={id}
      // Here we use a trick to encode BOTH the country name and the flag into the value. Then we split them up again later in the server action
      defaultValue={`${defaultCountry}%${flag}`}
      className={className}
    >
      <option value="">Select country...</option>
      {countries?.map((c) => (
        <option key={c.name} value={`${c.name}%${c.flag}`}>
          {c.name}
        </option>
      ))}
    </select>
  );
}

export default SelectCountry;
