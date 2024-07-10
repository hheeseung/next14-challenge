import getSession from "@/lib/session";

interface User {
  id: number;
}

export async function createSession(user: User) {
  const session = await getSession();
  session.id = user.id;
  await session.save();
}
