import "server-only";

import { currentUser } from "@clerk/nextjs/server";
import { db, users } from "@/db";

export async function syncCurrentUser() {
  const clerkUser = await currentUser();

  if (!clerkUser) {
    return null;
  }

  const primaryEmailAddress =
    clerkUser.emailAddresses.find(
      (emailAddress) => emailAddress.id === clerkUser.primaryEmailAddressId,
    ) ?? clerkUser.emailAddresses[0];

  const email = primaryEmailAddress?.emailAddress;

  if (!email) {
    throw new Error("Authenticated Clerk user does not have an email address.");
  }

  const name =
    clerkUser.fullName ??
    [clerkUser.firstName, clerkUser.lastName].filter(Boolean).join(" ") ??
    null;

  const now = new Date();

  const [syncedUser] = await db
    .insert(users)
    .values({
      clerkId: clerkUser.id,
      email,
      name: name || null,
      imageUrl: clerkUser.imageUrl,
      updatedAt: now,
      lastSignedInAt: now,
    })
    .onConflictDoUpdate({
      target: users.clerkId,
      set: {
        email,
        name: name || null,
        imageUrl: clerkUser.imageUrl,
        updatedAt: now,
        lastSignedInAt: now,
      },
    })
    .returning();

  return syncedUser;
}
