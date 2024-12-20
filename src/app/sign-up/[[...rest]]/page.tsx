import { SignUp } from "@clerk/nextjs";

type SignUpPageProps = {
    searchParams: Promise<{
        redirectUrl?: string;
    }>;
};

export default async function SignUpPage({ searchParams }: SignUpPageProps) {

    const resolvedSearchParams = await searchParams;
    const redirectUrl = resolvedSearchParams.redirectUrl || '/default-redirect-url';

    return (
        <section className="py-14">
            <div className="container mx-auto px-4">
                <div className="flex justify-center">
                    <SignUp
                        signInUrl="/sign-in"
                        fallbackRedirectUrl={redirectUrl || '/'}  // Redirecionamento após o cadastro
                    />
                </div>
            </div>
        </section>
    );
}
