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
  const coins = await fetchCoins();
  const { searchParams } = new URL(request.url);
  console.log(request.url);
  const query = searchParams.get("query");

  const filteredCoins = coins.data.coins.filter((coin) => {
    return (
      coin.name.toLowerCase().includes(query.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(query.toLowerCase())
    );
  });

  return NextResponse.json(filteredCoins);
}
