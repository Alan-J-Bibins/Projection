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
        <div className="flex flex-col items-start justify-start rounded-2xl p-4 border border-gray-300 border-primary/20 rounded-2xl bg-secondary/20 bg-gradient-to-b from-transparent to-primary/10 shadow-primary/25 shadow-none hover:bg-gradient-to-t hover:from-accent/20 hover:to-transparent">
            <div className="flex w-full items-center justify-between mb-2">
                <h3 className="font-bold text-lg">{task_name}</h3>
                <img src={logo} alt="logo" className="w-6 h-6 rounded-full" />
            </div>
            <hr className="w-full border-text/20"></hr>
            <p className="text-sm mb-4">
                {task_description}
            </p>
            <div className="flex w-full justify-between items-center mb-2">
           
            <div className="flex flex-wrap gap-2 mb-4">
                {tags.map((tag, index) => (
                    <span 
                        key={index} 
                        className="bg-secondary px-3 py-1 rounded-full"
                    >
                        {tag}
                    </span>
                ))}
            </div >
            <div className="text-primary">
                {date}
            </div>
            </div>
        </div>
    )
}

