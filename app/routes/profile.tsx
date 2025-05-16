import { db } from "database"

export const loader = async () => {
    const tables = await db.select();
    console.log(tables);
}
export default function profile() {
    return (
        <div>profile</div>
    )
}

