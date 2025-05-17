import { useLocation } from 'react-router';

export default function BreadCrumbs() {
    const pathname = useLocation().pathname.split('/');
    console.log(pathname);
    return (
        <div className="text-primary">
            {pathname[1][0].toUpperCase() + pathname[1].slice(1)}
        </div>
    );
}

