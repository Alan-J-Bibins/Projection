import { PrismaClient } from "@prisma/client";
import { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react"
import { getUser } from "~/utils/actions";

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
    const user = await getUser(request);
    const prisma = new PrismaClient();
    const project = await prisma.project.findUnique({
        where: { id: params.projectID }
    })
    console.log("Ze Project", project);
    return { user, project };
}

export default function Page() {
    const { project } = useLoaderData<typeof loader>();
    return (
        <div>
            <div className="w-full flex items-center justify-between">
                <h1 className="text-4xl font-righteous">{project?.name}</h1>
            </div>
        </div>
    )
}

