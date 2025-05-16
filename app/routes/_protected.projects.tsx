import ThemeSelect from "~/components/ThemeSelect";

export const loader = async () => {
    console.log('protcted.projects.tsx')
}

export default function Page() {
    return (
        <div>
            Project page
            <ThemeSelect />
        </div>
    );
}
