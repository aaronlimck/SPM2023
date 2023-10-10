import { createRoleListing } from "@/lib/database/roleListings";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const newRoleListing = await createRoleListing(data);

    return new NextResponse(
      JSON.stringify({ success: true, data: newRoleListing }),
      {
        status: 201,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error: any) {
    console.error(error);
    return new NextResponse(
      JSON.stringify({ success: false, error: "Internal server error" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
