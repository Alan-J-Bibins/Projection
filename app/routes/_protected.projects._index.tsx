import { PrismaClient } from "@prisma/client";
import { ActionFunctionArgs, LoaderFunctionArgs, redirect } from "@remix-run/node";
import { Await, Form, useLoaderData } from "@remix-run/react";
import Button from "components/Button";
import Dialog from "components/Dialog";
import ProjectCard, { ProjectCardLoading } from "components/ProjectCard";
import { Folders, PackagePlus } from "lucide-react";
import { Suspense } from "react";
import { getUser } from "~/utils/actions";

export const loader = async ({ request }: LoaderFunctionArgs) => {
    const { user } = await getUser(request);
    console.log("Enthada", user);
    if (!user || !user.id) {
        return { ok: false, projects: [] };
    } else {
        const prisma = new PrismaClient();
        const projects = await prisma.project.findMany({
            where: {
                members: {
                    some: {
                        userId: user?.id,
                    }
                }
            }
        })
        console.log(user?.id);
        console.log("Projects", projects);
        await prisma.$disconnect();
        return { ok: true, user, projects };
    }
}


export const action = async ({ request }: ActionFunctionArgs) => {
    const prisma = new PrismaClient();
    const formData = await request.formData();
    const { user } = await getUser(request);
    const projectName = String(formData.get('projectName'));
    const projectDesc = String(formData.get('projectDesc'));
    const project = await prisma.project.create({
        data: {
            name: projectName,
            description: projectDesc,
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
    if (!project) {
        return redirect('/projects');
    } else {
        return redirect(`/projects/${project.id}`)
    }
}


export default function Page() {
    const { ok, projects } = useLoaderData<typeof loader>();
    console.log(ok ? 'User exists!' : 'User Does Not Exist');
    return (
        <main className="flex flex-col justify-start items-center gap-8 w-full">
            <section className="w-full flex flex-col items-center gap-4">
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
                            className="flex flex-col w-full items-center gap-4 mt-2"
                        >
                            <div className="w-full space-y-2 h-full group">
                                <p className="w-full text-left font-semibold">Project Name</p>
                                <input type="text"
                                    name="projectName"
                                    placeholder="Enter Project Name"
                                    className="w-full bg-transparent p-2 text-lg border border-primary/40 rounded-xl
                                    focus:outline-none focus:border-accent placeholder:text-primary/40 transition-colors"
                                    required
                                />
                                <p className="w-full text-left font-semibold">Project Description</p>
                                <textarea
                                    name="projectDesc"
                                    placeholder="Enter Project Description"
                                    className="w-full bg-transparent p-2 text-lg border border-primary/40 rounded-xl resize-none h-auto
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
                <div className="w-full max-h-80 overflow-y-auto">
                    {projects.length === 0 ? (
                        <div className="flex flex-col w-full justify-center items-center">
                            <Folders size={24} className="size-32 text-secondary" />
                            <span className="text-secondary">Oops! Looks like you haven&apos;t made any projects</span>
                        </div>
                    ) : (
                        <Suspense fallback={<Loading />}>
                            <Await resolve={projects}>
                                <div className="grid grid-cols-4 gap-4 w-full py-4">
                                    {projects.map((project, index) => {
                                        return (
                                            <ProjectCard
                                                to={`/projects/${project.id}`}
                                                key={index}
                                                label={project.name}
                                                id={project.id}
                                            />
                                        );
                                    })}
                                </div>
                            </Await>
                        </Suspense>
                    )}
                </div>

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

function Loading() {
    return (
        <div className="grid grid-cols-4 gap-4 w-full">
            <ProjectCardLoading />
            <ProjectCardLoading />
            <ProjectCardLoading />
            <ProjectCardLoading />
        </div>
    );
}
