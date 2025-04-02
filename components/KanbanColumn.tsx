export default function KanbanColumn({ name }: { name: string }) {
    // TODO: Render the Tasks here, configure adding new tasks, and setup deleting columns
    return (
        <div className="flex flex-col justify-center items-center bg-secondary/40 rounded-2xl">
            {name}
        </div>
    )
}

