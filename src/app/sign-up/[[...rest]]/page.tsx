import { SignUp } from "@clerk/nextjs";



export default async function SignUpPage() {



    return (
        <section className="py-14">
            <div className="container mx-auto px-4">
                <div className="flex justify-center">
                    <SignUp
                        signInUrl="/sign-in"
                        fallbackRedirectUrl={'/'}  // Redirecionamento após o cadastro

                    />
                </div>
            </div>
        </section>
    );
}
