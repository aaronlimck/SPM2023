import prisma from "@/lib/prisma";

export async function getAllRoleListings(
  pageNumber = 1,
  pageLimit = 10,
  searchRoleQuery: string
) {
  try {
    const skip = (pageNumber - 1) * pageLimit;

    const roles = await prisma.role_Listing.findMany({
      orderBy: [
        {
          Role_Listing_Name: "asc",
        },
      ],
      skip: skip,
      take: pageLimit,
      where: {
        Role_Listing_Name: {
          contains: searchRoleQuery, // Use 'contains' to perform a partial match
          mode: "insensitive", // Case-insensitive search
        },
      },
    });

    return roles;
  } catch (error) {
    // Handle the error here, you can log it or return an error message as needed.
    console.error("Error fetching role listings:", error);
    throw error; // Rethrow the error to propagate it to the caller.
  }
}

export const getAllActiveRoleListings = async (
  pageNumber = 1,
  pageLimit = 10,
  searchRoleQuery = ""
) => {
  try {
    const skip = (pageNumber - 1) * pageLimit;
    const currentDate = new Date();

    const roles = await prisma.role_Listing.findMany({
      where: {
        Role_ExpiryDate: {
          gte: currentDate,
        },
        Role_Listing_Name: {
          contains: searchRoleQuery,
          mode: "insensitive",
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        Role: {
          select: {
            Role_Desc: true,
          },
        },
      },
    });

    const roleListingsWithDescriptions = roles.map((roleListing) => ({
      ...roleListing,
      Role_Desc: roleListing.Role?.Role_Desc || "",
    }));

    return roleListingsWithDescriptions;
  } catch (error) {
    console.error("Error fetching role listings:", error);
    throw error;
  }
};

export const getSpecificRoleListing = async (Role_Listing_ID: number) => {
  try {
    const role = await prisma.role_Listing.findFirst({
      where: {
        Role_Listing_ID: Role_Listing_ID,
      },
    });
    return role;
  } catch (error) {
    console.error("Error fetching role listing:", error);
    throw error;
  }
};

// export const createRoleListing = async (Role_Details: object) => {
//   try {
//     const newRoleListing = await prisma.role_Listing.create({
//       data: {
//         ...Role_Details,
//       },
//     });
//   } catch (error) {
//     console.error("Error creating role listing:", error);
//     throw error;
//   }
// };
