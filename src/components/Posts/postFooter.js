export default function PostFooter({caption , Name}){
    return (
        <div className="flex w-full space-x-1 items-center px-2 py-1 bg-gradient-to-r from-sky-400 to-red-500">
            <span className=" flex text-sm font-bold">{Name}:</span>
            <span className="flex text-sm"> {caption}</span>
        </div>
    )
}