export default function ProjectCard({ projectName, projectDesc }: { projectName: string, projectDesc: string }) {
    return (
        <div>
            <h4>{projectName}</h4>
            <p>{projectDesc}</p>
        </div>
    )
}

