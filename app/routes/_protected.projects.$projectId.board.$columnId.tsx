import { PrismaClient } from "@prisma/client";
import { ActionFunctionArgs } from "@remix-run/node";

export const action = async ({ request }: ActionFunctionArgs) => {
    const formData = await request.formData();
    const columns = JSON.parse(String(formData.get('columns')));
    const prisma = new PrismaClient();

    try {
        await prisma.$transaction(
            columns.map((col: { id: string; position: number }) =>
                prisma.column.update({
                    where: { id: col.id },
                    data: { position: col.position }
                })
            )
        );
        return { success: true };
    } finally {
        await prisma.$disconnect();
    }
}
