import { PrismaClient } from "@prisma/client";
import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { Form } from "@remix-run/react";
import Button from "components/Button";
import Dialog from "components/Dialog";
import { Folders, PackagePlus } from "lucide-react";
import { getUser } from "~/utils/actions";

export const loader = async ({ request }: LoaderFunctionArgs) => {
    const { user } = await getUser(request);
    console.log(user?.id);
    return { user };
};


export const action = async ({ request }: ActionFunctionArgs) => {
    const prisma = new PrismaClient();
    const formData = await request.formData();
    const { user } = await getUser(request);
    const projectName = String(formData.get('projectName'));
    const project = await prisma.project.create({
        data: {
            name: projectName,
            members: {
                create: {
                    user: { connect: { email: user?.email } },
                    role: 'ADMIN'
                }
            }
        }
    })
    console.log(project)

    prisma.$disconnect;
    return { project };
}


export default function Page() {
    return (
        <main className="flex flex-col justify-start items-center gap-8">
            <section className="w-full flex flex-col items-center">
                <div className="w-full flex items-center justify-between">
                    <h1 className="text-4xl font-righteous">My Projects</h1>
                    <Dialog
                        title="New Project"
                        trigger={
                            <Button>
                                <div className="flex justify-center items-center gap-1">
                                    <PackagePlus size={20} />
                                    New Project
                                </div>
                            </Button>
                        }
                    >
                        <Form
                            method="post"
                            action="/projects"
                            className="flex flex-col w-full items-center gap-4"
                        >
                            <div className="w-full">
                                <p className="w-full text-left font-semibold">Project Name</p>
                                <input type="text"
                                    name="projectName"
                                    placeholder="Enter Project Name"
                                    className="w-full bg-transparent p-2 text-lg border border-primary/40 rounded-xl 
                                    focus:outline-none focus:border-accent placeholder:text-primary/40 transition-colors"
                                />
                            </div>
                            <div className="flex w-full justify-between items-center">
                                <div />
                                <Button type="submit">
                                    Submit
                                </Button>
                            </div>
                        </Form>
                    </Dialog>
                </div>
                <Folders size={24} className="size-32 text-secondary" />
                <span className="text-secondary">Oops! Looks like you haven&apos;t made any projects</span>
            </section>
            <section className="w-full flex flex-col items-center">
                <div className="w-full flex items-center justify-between">
                    <h1 className="text-4xl font-righteous">Joined Projects</h1>
                </div>
                <Folders size={24} className="size-32 text-secondary" />
                <span className="text-secondary">Oops! Looks like you haven&apos;t made any projects</span>
            </section>
        </main>
    );
}

