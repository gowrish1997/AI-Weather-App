"use client";
import React from "react";
import { Country, City } from "country-state-city";
import Select from "react-select";
import { useRouter } from "next/navigation";
import { GlobeIcon } from "@heroicons/react/solid";

type options = {
  value: {
    latitude: string;
    longitude: string;
    isoCode: string;
  };
  label: string;
} | null;

type cityOptions = {
  value: {
    name: string;
    latitude: string;
    longitude: string;

    countryCode: string;
    stateCode: string;
  };
  label: string;
} | null;

const options = Country.getAllCountries().map((country) => ({
  value: {
    latitude: country.latitude,
    longitude: country.longitude,
    isoCode: country.isoCode,
  },
  label: country.name,
}));
const CityPicker = () => {
  const [selectedCountry, setSelectedCountry] = React.useState<options>(null);
  const [selectedCity, setSelectedCity] = React.useState<cityOptions>(null);
  const handleSelectCountry = (selectedCountry: options) => {
    setSelectedCountry(selectedCountry);
    setSelectedCity(null);
  };

  const hadleSelectedCity = (selectedCity: cityOptions) => {
    setSelectedCity(selectedCity);
    router.push(
      `/location/${selectedCity?.value.name}/${selectedCity?.value.latitude}/${selectedCity?.value.longitude}`
    );
  };

  const router = useRouter();
  return (
    <div className="space-y-4 ">
      <div className="space-y-2 ">
        <div className="flex items-center space-x-2 text-white/80  ">
          <GlobeIcon className="h-5 w-5 text-white " />
          <label htmlFor="country">Country</label>
        </div>
        <Select
          className="text-black"
          options={options}
          value={selectedCountry}
          onChange={handleSelectCountry}
        />
      </div>
      {selectedCountry && (
        <div className="space-y-2 ">
          <div className="flex items-center space-x-2 text-white/80  ">
            <GlobeIcon className="h-5 w-5 text-white " />
            <label htmlFor="country">City</label>
          </div>
          <Select
            className="text-black"
            options={City.getCitiesOfCountry(
              selectedCountry.value.isoCode
            )?.map((state) => {
              return {
                value: {
                  name: state.name!,
                  latitude: state.latitude!,
                  longitude: state.longitude!,
                  countryCode: state.countryCode!,
                  stateCode: state.stateCode,
                },
                label: state.name,
              };
            })}
            value={selectedCity}
            onChange={hadleSelectedCity}
          />
        </div>
      )}
    </div>
  );
};

export default CityPicker;
