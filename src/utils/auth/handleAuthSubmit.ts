export const handleAuthSubmit = async (
  e: React.FormEvent,
  action: "signup" | "login",
  setErrorMessage: React.Dispatch<React.SetStateAction<string | null>>
) => {
  e.preventDefault();
  const formData = new FormData(e.target as HTMLFormElement);
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const response = await fetch(`api/auth`, {
    method: "POST",
    body: new URLSearchParams({
      email,
      password,
      action,
    }),
  });

  if (!response.ok) {
    const result = await response.json();
    console.log(result);
    setErrorMessage(result.error);
  } else {
    window.location.href = `/`;
  }
};
