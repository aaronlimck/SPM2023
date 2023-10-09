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

export const getSpecificStaffByName = async (Staff_FullName: string) => {
  const [firstName, lastName] = decodeURIComponent(Staff_FullName).split("-"); // decodeURIComponent to decode the URL

  try {
    const staff = await prisma.staff.findFirst({
      where: {
        AND: [
          {
            Staff_FName: {
              contains: firstName,
              mode: "insensitive",
            },
          },
          {
            Staff_LName: {
              contains: lastName,
              mode: "insensitive",
            },
          },
        ],
      },
      include: {
        Staff_Skills: {
          select: {
            Skill_Name: true,
          },
        },
      },
    });

    const formattedSkills = staff?.Staff_Skills.map(
      (skill) => skill.Skill_Name
    );
    const formattedStaff = {
      Staff_ID: staff!.Staff_ID,
      Staff_FName: staff!.Staff_FName,
      Staff_LName: staff!.Staff_LName,
      Dept: staff!.Dept,
      Email: staff!.Email,
      Access_Rights: staff!.Access_Rights,
      Staff_Skills: formattedSkills,
    };

    return formattedStaff;
  } catch (error) {
    console.error("Error fetching staff:", error);
    throw error;
  }
};

export const getSpecificStaffSkillsByID = async (Staff_ID: number) => {
  try {
    const staffSkills = await prisma.staff_Skill.findMany({
      where: {
        Staff_ID: Staff_ID,
      },
    });

    const formattedSkills = staffSkills.map((skill) => skill.Skill_Name);

    return {
      Staff_ID: Staff_ID,
      Staff_Skills: formattedSkills,
    };
  } catch (error) {
    console.error("Error fetching staff skills:", error);
    throw error;
  }
};
