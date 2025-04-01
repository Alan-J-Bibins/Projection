import { PrismaClient } from "@prisma/client";
import { ActionFunctionArgs, LoaderFunctionArgs, redirect } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react"
import Dock from "components/Dock";
import { getUser } from "~/utils/actions";

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
    const { user } = await getUser(request);
    const prisma = new PrismaClient();
    const project = await prisma.project.findUnique({
        where: {
            id: params.projectId
        },
        include: {
            members: {
                where: {
                    userId: user.id
                },
                select: {
                    role: true
                }
            }
        }
    })
    if (!project) {
        throw new Response('Project Not Found', { status: 404 });
    }
    if (project.members.length === 0) {
        throw new Response('Forbidden - Not A Project Member', { status: 403 });
    }
    console.log("Ze Project while we are in layout", project);
    return { user, project };
}

export const action = async ({ request, params }: ActionFunctionArgs) => {
    const { user } = await getUser(request);
    const prisma = new PrismaClient();
    const projectId = params.projectId || "";
    // Debug log to verify values
    console.log("Action params:", {
        projectId: projectId,
        userId: user?.id,
        routeParamName: Object.keys(params)
    });

    try {
        const membership = await prisma.projectMember.findFirst({
            where: {
                userId: user.id,
                projectId: projectId,
                role: 'ADMIN'
            }
        })
        if (!membership) {
            throw new Response('Forbidden', { status: 403 })
        }
        await prisma.projectMember.delete({
            where: {
                id: membership.id,
                projectId: projectId,
                role: 'ADMIN'
            }
        })

        await prisma.project.delete({
            where: {
                id: projectId
            }
        })
        console.log("Project Deleted");
        return redirect('/projects');
    } catch (error) {
        console.log('Error in Deletion', error);
        throw new Response("Delete Failed", { status: 500 })
    } finally {
        await prisma.$disconnect();
    }
}

export default function Layout() {
    const { project } = useLoaderData<typeof loader>();
    return (
        <div className="relative w-full h-full flex flex-col gap-4 overflow-hidden">
            <div className="w-full flex items-center justify-between">
                <h1 className="text-4xl font-righteous">{project?.name}</h1>
            </div>
            <div className="w-full h-full overflow-y-auto">
                <Outlet />
            </div>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10">
                <Dock />
            </div>
        </div>
    )
}
