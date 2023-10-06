import prisma from "@/lib/prisma";

export const getAllRolesCategoryName = async () => {
  try {
    const rolesCategory = await prisma.role.findMany({
      select: {
        Role_Name: true,
      },
      orderBy: [
        {
          Role_Name: "asc",
        },
      ],
    });

    const formattedRolesCategory = rolesCategory.map((role) => role.Role_Name);
    return formattedRolesCategory;
  } catch (error) {
    console.error("Error fetching roles category:", error);
    throw error;
  }
};

export const getAllSkillsOfRole = async (roleName: string) => {
  try {
    const skills = await prisma.role_Skill.findMany({
      where: {
        Role_Name: roleName,
      },
      select: {
        Skill_Name: true,
      },
    });

    const formattedSkills = skills.map((skill) => skill.Skill_Name);
    return formattedSkills;
  } catch (error) {
    console.error("Error fetching skills of role:", error);
    throw error;
  }
};
