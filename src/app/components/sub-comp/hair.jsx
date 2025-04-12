export function Hair({ name }) {
    return (
        <div style={{ color: `var(--foreground)` }} className="hair mb-14 border rounded-full flex justify-center items-center p-1 px-5 max-w-[150px] max-h-[100px] w-[20%] h-[20%] bg-[#0001]">
            <p>{name || "Empty"}</p>
        </div>
    )
}