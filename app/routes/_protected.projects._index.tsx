import { Form, useLoaderData, type ActionFunctionArgs, type LoaderFunctionArgs } from "react-router";
import Button from "~/components/Button";
import Dialog from "~/components/Dialog";
import Input from "~/components/Input";
import { LucideIcon } from "~/components/LucideIcon";
import ProjectCard from "~/components/ProjectCard";
import { createProject, getProjectsWhereUserIsAdmin, getProjectsWhereUserIsMember, joinProject } from "~/lib/db.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
    const myProjects = await getProjectsWhereUserIsAdmin(request)
    const joinedProjects = await getProjectsWhereUserIsMember(request)
    console.log(myProjects, joinedProjects);
    return { myProjects, joinedProjects };
}

export const action = async ({ request }: ActionFunctionArgs) => {
    const formData = await request.formData();
    const action = String(formData.get('action'));
    console.log(action);
    switch(action){
        case "newProject":
            const projectName = String(formData.get('projectName'));
            const projectDesc = String(formData.get('projectDesc'));
            await createProject(request, projectName, projectDesc);
            break;
        case "joinProject":
            const projectCode = String(formData.get('projectCode'));
            await joinProject(request, projectCode);
        default:
            console.log("WTF are you upto");
    }
}

export default function Page() {
    const { myProjects, joinedProjects } = useLoaderData<typeof loader>();
    return (
        <main className="w-full h-full grid grid-cols-1">
            <section>
                <div className="flex justify-between items-center w-full">
                    <h1 className="font-Righteous">
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
                        submit={<Button form="newProjectForm" type="submit"> Submit </Button>}
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
                            <input name="action" value="newProject" className="hidden"/>
                            <br />
                        </Form>
                    </Dialog>
                </div>
                <br />
                <section>
                    {myProjects.length === 0 ? (
                        <div className="flex flex-col w-full justify-center items-center text-primary/40">
                            <LucideIcon name="LuFolders" fontSize={128} />
                            <h5>
                                Oops! Looks like you haven&apos;t made any
                                projects
                            </h5>
                        </div>
                    ) : (
                            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full justify-start items-center">
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
                </section>
            </section>
            <section>
                <div className="flex justify-between items-center w-full">
                    <h1 className="font-Righteous">
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
                        submit={<Button form="joinProjectForm" type="submit"> Submit </Button>}
                        cancel={<Button variant="secondary"> Cancel </Button>}
                    >
                        <Form
                            id="joinProjectForm" 
                            method="POST"
                            action="/projects"
                            className="form-style">
                            <Input
                                type="text"
                                name="projectCode"
                                placeholder="Enter Project Code"
                                required
                            />
                            <input name="action" value="joinProject" className="hidden"/>
                            <br/>
                        </Form>
                    </Dialog>
                </div>
                <br />
                <section>
                    {joinedProjects.length === 0 ? (
                        <div className="flex flex-col w-full justify-center items-center text-primary/40">
                            <LucideIcon name="LuFolders" fontSize={128} />
                            <h5>
                                Oops! Looks like you haven&apos;t made any
                                projects
                            </h5>
                        </div>
                    ) : (
                            <div className="grid grid-cols-4 gap-4 w-full justify-start items-center">
                                {joinedProjects.map((joinedProject) => {
                                    return (
                                        <ProjectCard
                                            key={joinedProject.id}
                                            projectName={joinedProject.name}
                                            projectDesc={joinedProject.description || ""}
                                        />
                                    );
                                })}
                            </div>
                        )}
                </section>
            </section>
        </main>
    );
}
