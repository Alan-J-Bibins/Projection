import ThemeToggle from "~/components/ThemeToggle";

export const loader = async () => {
    console.log('protcted.projects.tsx')
}

export default function Page () {
    return(
        <div>
            Project page
            <ThemeToggle />
        </div>
    );
}
