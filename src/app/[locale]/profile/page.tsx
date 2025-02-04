import ProfileEditor from "@/components/profile/ProfileEditor";
import { getProfile } from "@/utils/profile/getProfile";
// import { getUserProfile } from "@/utils/profile/getUserProfile";
export default async function ProfileClient() {
  const profile = await getProfile();

  return (
    <div className="container mx-auto max-w-[1300px] px-4 dark:bg-gray-900 dark:text-white">
      <ProfileEditor profile={profile} />
    </div>
  );
}
