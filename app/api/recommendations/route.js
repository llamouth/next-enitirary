import { NextResponse } from "next/server";
import { findRecommendations } from "../../../queries/recommendations";

export async function POST(req) {
  try {
    const { preferences } = await req.json(); // Extract user preferences

    console.log(preferences)
    
    if (!preferences) {
      return NextResponse.json({ error: "Missing user preferences" }, { status: 400 });
    }

    const recommendations = await findRecommendations(preferences);

    return NextResponse.json({ success: true, recommendations }, { status: 200 });
  } catch (error) {
    console.error("Error fetching recommendations:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}