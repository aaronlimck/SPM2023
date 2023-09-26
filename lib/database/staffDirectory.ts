import prisma from "@/lib/prisma";

export async function getAllStaffDirectory(
  pageNumber = 1,
  pageLimit = 10,
  searchStaffQuery: string
) {
  try {
    const skip = (pageNumber - 1) * pageLimit;

    const staffs = await prisma.staff.findMany({
      orderBy: [
        {
          Staff_FName: "asc",
        },
      ],
      skip: skip,
      take: pageLimit,
      where: {
        OR: [
          {
            Staff_FName: {
              contains: searchStaffQuery,
              mode: "insensitive",
            },
          },
          {
            Staff_LName: {
              contains: searchStaffQuery,
              mode: "insensitive",
            },
          },
        ],
      },
    });
    return staffs;
  } catch (error) {
    console.error("Error fetching staff directory:", error);
    throw error;
  }
}
