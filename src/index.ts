import mongoose from "mongoose";
import * as countries from "all-countries-and-cities-json";
import { CountryModel } from "./models/country.model";
import { CityModel } from "./models/city.model";

import dotenv from "dotenv";
dotenv.config();

const dbUrl = process.env.DB_URL;

connect();

async function connect() {
  try {
    await mongoose.connect(dbUrl);
    console.log(`Mongoose - successful connection ...`);
    await main();
    await mongoose.disconnect();
    console.log(`Mongoose - disconnected ...`);
  } catch (e) {
    console.log(e);
  }
}

async function main() {
  for (const key in countries) {
    if (key === "default") continue;
    console.log(`${key}...`);
    const country = await CountryModel.create({ title: key });

    await CityModel.insertMany(
      countries[key].map((title: string) => ({ title, country }))
    ).then((res) => res.map((city: any) => country.cities.push(city)));

    await country.save();
  }
  console.log("\n" + "Work is done");
}
