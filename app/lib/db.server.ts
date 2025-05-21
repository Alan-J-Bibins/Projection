import { db } from "database";
import { getUser } from "./utils.server";
import { project, projectMember } from "db/schema";
import { and, eq } from "drizzle-orm";

export async function getProjectsWhereUserIsAdmin(request: Request) {
    const user = await getUser(request);
    const result = await db.select({ project: project })
        .from(projectMember)
        .innerJoin(project, eq(projectMember.projectId, project.id))
        .where(and(eq(projectMember.userId, user.id), eq(projectMember.role, 'ADMIN')))
        .execute();
    const projects = result.map(row => row.project);
    return projects;
}

export async function getProjectsWhereUserIsMember(request: Request) {
    const user = await getUser(request);
    const projects = await db.select({ project: project })
        .from(projectMember)
        .innerJoin(project, eq(projectMember.projectId, project.id))
        .where(and(eq(projectMember.userId, user.id), eq(projectMember.role, 'MEMBER')))
        .execute();
    return projects;
}

export async function createProject(request: Request, projectName: string, projectDesc?: string) {
    const user = await getUser(request);
    db.transaction(async (tx) => {
        const [insertedProject] = await tx.insert(project)
            .values({
                name: projectName,
                description: projectDesc || "",
                createdAt: new Date(),
                updatedAt: new Date(),
            })
            .returning({ id: project.id })

        await tx.insert(projectMember)
            .values({
                userId: user.id,
                projectId: insertedProject.id,
                role: 'ADMIN',
                createdAt: new Date(),
                updatedAt: new Date(),
            })
    })
}
