import { Form, redirect, useLoaderData, type ActionFunctionArgs } from "react-router";
import Button from "~/components/Button";
import Dialog from "~/components/Dialog";
import Input from "~/components/Input";
import { LucideIcon } from "~/components/LucideIcon";

export const loader = async () => {
    const projects: string[] = [];
    return { projects };
}

export const action = async ({ request }: ActionFunctionArgs) => {
    const formData = await request.formData();
    console.log("Hello there");
    console.log(formData);
    return redirect('/settings')
}

export default function Page() {
    const { projects } = useLoaderData<typeof loader>();
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
                            required={true}
                        />
                        <br />
                    </Form>
                </Dialog>
            </div>
            <br />
            {projects.length === 0 && (
                <div className="flex flex-col w-full justify-center items-center text-primary/40">
                    <LucideIcon name="LuFolders" fontSize={128} />
                    <h5>
                        Oops! Looks like you haven&apos;t made any
                        projects
                    </h5>
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
            {projects.length === 0 && (
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
