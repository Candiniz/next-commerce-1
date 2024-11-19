import clsx from "clsx";

export default function SkeletonCard({ isLoading }: { isLoading?: boolean }) {
    return (
        <div className={clsx(
            'flex flex-col shadow-lg h-[540px] bg-white p-5 rounded-lg',
            {
                'relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.5s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent': isLoading
            }
        )}>
            <div className="relative h-[350px] flex-1 bg-pink-100"></div>
            <div className="flex justify-between h-[30px] w-[50%] font-bold my-3 bg-pink-100"></div>
            <div className="h-3 mt-auto rounded-md bg-pink-100"></div>
        </div>
    );
}
