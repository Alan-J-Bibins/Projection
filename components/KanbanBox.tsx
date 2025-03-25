export default function KanbanBox({
    task_name,
    task_description,
    logo,
    tags,
    date
}: {
    task_name: string,
    task_description: string,
    logo: string,
    tags: string[],
    date: string
}) {

    return (
        <div className="bg-white/20 border rounded-2xl p-4">
            <div className="title">
                <h3>{task_name}</h3>
                <img src={logo} alt="logo" />
            </div>
            <div className="description">
                <p>{task_description}</p>
            </div>
            <div className="description">
                {tags.map((tag, index) => {
                    return (
                        <span key={index}>
                            {tag}
                        </span>
                    );
                })}
            </div>
            <p>{date}</p>
        </div>
    )
}
