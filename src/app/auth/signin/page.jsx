import SignInPage from "./SignInPage";

export default async function Page({ searchParams }) {
    const params = await searchParams;

    return (
        <SignInPage
            redirectTo={params?.redirect || "/"}
        />
    );
}