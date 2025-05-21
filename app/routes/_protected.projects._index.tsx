import { Form, useLoaderData, type ActionFunctionArgs, type LoaderFunctionArgs } from "react-router";
import Button from "~/components/Button";
import Dialog from "~/components/Dialog";
import Input from "~/components/Input";
import { LucideIcon } from "~/components/LucideIcon";
import ProjectCard from "~/components/ProjectCard";
import { createProject, getProjectsWhereUserIsAdmin } from "~/lib/db.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
    const myProjects = await getProjectsWhereUserIsAdmin(request)
    console.log(myProjects);
    return { myProjects };
}

export const action = async ({ request }: ActionFunctionArgs) => {
    const formData = await request.formData();
    const projectName = String(formData.get('projectName'));
    const projectDesc = String(formData.get('projectDesc'));
    await createProject(request, projectName, projectDesc);
}

export default function Page() {
    const { myProjects } = useLoaderData<typeof loader>();
    return (
        <div className="w-full">
            <div className="flex justify-between items-center w-full">
                <h1 className="font-Righteous text-4xl">
                    My Projects
                </h1>
                <Dialog
                    title="New Project"
                    trigger={
                        <Button>
                            <LucideIcon name="LuPackagePlus" fontSize={24} />
                            New Project
                        </Button>
                    }
                    submit={<Button form="newProjectForm" type="submit" > Submit </Button>}
                    cancel={<Button variant="secondary"> Cancel </Button>}
                >
                    <Form
                        id="newProjectForm"
                        method="POST"
                        action="/projects"
                        className="form-style gap-4"
                    >
                        <Input
                            type="text"
                            name="projectName"
                            placeholder="Enter Project Name"
                            required
                        />
                        <textarea
                            name="projectDesc"
                            placeholder="Enter Project Description"
                            className="form-input"
                        />
                        <br />
                    </Form>
                </Dialog>
            </div>
            <br />
            {myProjects.length === 0 ? (
                <div className="flex flex-col w-full justify-center items-center text-primary/40">
                    <LucideIcon name="LuFolders" fontSize={128} />
                    <h5>
                        Oops! Looks like you haven&apos;t made any
                        projects
                    </h5>
                </div>
            ) : (
                <div className="grid grid-cols-4 w-full justify-start items-center">
                    {myProjects.map((myProject) => {
                        return (
                            <ProjectCard
                                key={myProject.id}
                                projectName={myProject.name}
                                projectDesc={myProject.description || ""}
                            />
                        );
                    })}
                </div>
            )}
            <div>
            </div>
            <div className="flex justify-between items-center w-full">
                <h1 className="font-Righteous text-4xl">
                    Joined Projects
                </h1>
                <Dialog
                    title="Join Project"
                    trigger={
                        <Button>
                            <LucideIcon name="LuFolderPlus" fontSize={24} />
                            Join Project
                        </Button>
                    }
                >
                    <form></form>
                </Dialog>
            </div>
            <br />
            {myProjects.length === 0 && (
                <div className="flex flex-col w-full justify-center items-center text-primary/40">
                    <LucideIcon name="LuFolders" fontSize={128} />
                    <h5>
                        Oops! Looks like you haven&apos;t joined any
                        projects
                    </h5>
                </div>
            )}
        </div>
    );
}
