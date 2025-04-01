export default function Loader() {
    return (
        <div className={`pointer-events-none absolute inset-0 bg-black/20 z-50 flex justify-center items-center motion-preset-focus-sm motion-duration-150 motion-delay-75`}>
            <div className="bg-transparent border-4 border-accent h-1/4 w-auto aspect-square motion-preset-spin motion-ease-in-out-cubic rounded-2xl" />
        </div>
    )
}

