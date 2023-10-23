import { updateRoleListing } from "@/lib/database/roleListings";
import { NextResponse } from "next/server";

export async function PUT(request: Request) {
  try {
    const { Role_Listing_ID, ...data } = await request.json();
    const updatedRoleListing = await updateRoleListing(Role_Listing_ID, data);

    if (!updatedRoleListing) {
      return new NextResponse(
        JSON.stringify({ success: false, error: "Role listing not found" }),
        {
          status: 404,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    return new NextResponse(
      JSON.stringify({ success: true, data: updatedRoleListing }),
      {
        status: 200,
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
