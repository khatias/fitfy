import ProfileEditor from "@/components/profile/ProfileEditor";

import { getUserProfile } from "@/utils/profile/getUserProfile";
export default async function ProfileClient() {
  const profile = await getUserProfile();

  return (
    <div className="container mx-auto px-4 dark:bg-gray-900 dark:text-white">
      <ProfileEditor profile={profile} />
    </div>
  );
}
