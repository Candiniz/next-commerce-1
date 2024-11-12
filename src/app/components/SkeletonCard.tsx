import clsx from "clsx";

export default function SkeletonCard({ isLoading }: { isLoading?: boolean }) {
    return (
        <div className={clsx(
            'flex flex-col shadow-lg h-[540px] bg-slate-800 p-5',
            {
                'relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.5s_infinite] before:bg-gradient-to-r before:from-transparent before:via-slate-500/10 before:to-transparent': isLoading
            }
        )}>
            <div className="relative h-[350px] flex-1 bg-zinc-700"></div>
            <div className="flex justify-between h-[30px] w-[50%] font-bold my-3 bg-zinc-700"></div>
            <div className="h-3 mt-auto rounded-md bg-zinc-700"></div>
        </div>
    );
}
