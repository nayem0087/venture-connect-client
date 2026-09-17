import SignupPage from "./SignupPage";

export default async function Page({ searchParams }) {
    const params = await searchParams;

    return (
        <SignupPage
            redirectTo={params?.redirect || "/"}
        />
    );
}