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
        <div className="flex items-start justify-start rounded-2xl p-4 border border-gray-300">
            <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-lg">{task_name}</h3>
                <img src={logo} alt="logo" className="w-6 h-6 rounded-full" />
            </div>
            <hr></hr>
            <p className="text-sm mb-4">
                {task_description}
            </p>
            <div className="flex justify-between items-center mb-2">
           
            <div className="flex flex-wrap gap-2 mb-4">
                {tags.map((tag, index) => (
                    <span 
                        key={index} 
                        className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full"
                    >
                        {tag}
                    </span>
                ))}
            </div>
            
                {date}
            </div>
        </div>
    )
}

