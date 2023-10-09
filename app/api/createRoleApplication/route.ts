import { createRoleApplication } from "@/lib/database/roleApplications";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const user = await createRoleApplication(data);

    const successMessage = { success: true };
    const responseBody = { ...user, ...successMessage };

    return new NextResponse(JSON.stringify(responseBody), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    // Check if the error is due to a duplicate entry
    if (error.message === "Duplicate entry") {
      return new NextResponse(
        JSON.stringify({
          error: "Entry exists",
        }),
        {
          status: 400, // You might want to use a more appropriate status code
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    console.error(error);
    return new NextResponse(
      JSON.stringify({ error: "Internal server error" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
