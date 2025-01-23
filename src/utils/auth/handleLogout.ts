export const handleLogout = async () => {
  try {
    const pathSegments = window.location.pathname.split("/");
    const locale = pathSegments[1];

    const response = await fetch(`/${locale}/api/logout`, {
      method: "POST",
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Logout failed. Error message:", data.message);
      alert("Failed to log out. Please try again.");
    } else {
      console.log("Logout successful:", data.message);
      window.location.href = `/${locale}`;
    }
  } catch (error) {
    console.error("An error occurred during logout:", error);
    alert("An unexpected error occurred. Please try again later.");
  }
};
