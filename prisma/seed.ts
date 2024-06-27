// prisma/seed.ts
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const usersData = [
  // we only have on user here
  {
    email: "email@domain.com",
    name: "name",
  },
  {
    email: "ryanvo.0162@gmail.com",
    name: "Ryan Vo",
  },
];

const main = async () => {
  console.log("start seeding …");
  for (const _user of usersData) {
    //   check if user already exists
    const userExists = await prisma.user.findFirst({
      where: {
        email: _user.email,
      },
    });
    if (userExists) {
      console.log(`User with email ${_user.email} already exists`);
      continue;
    }
    const user = await prisma.user.create({
      data: _user,
    });
    console.log(`Created user with id: ${user.id}`);
  }
  console.log("seeding done");
};

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
