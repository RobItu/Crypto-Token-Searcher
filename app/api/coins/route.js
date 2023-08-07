import { NextResponse } from "next/server";

async function fetchCoins() {
  const response = await fetch(process.env.URL, {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": process.env.API_KEY,
      "X-RapidAPI-Host": process.env.HOST,
    },
  });

  const coins = await response.json();
  return coins;
}

export async function GET(request) {
  const coin = await fetchCoins();
  return NextResponse.json(coin);
}
