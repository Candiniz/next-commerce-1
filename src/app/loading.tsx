import SkeletonCard from "./components/SkeletonCard";

export default function Loading() {
    return (
        <div className="text-gray-300 container bg-white min-h-screen mx-auto pt-8 px-8 xl:px-0 w-2/3">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 lx:gap-6 px-[1%]">
                <SkeletonCard isLoading />
                <SkeletonCard isLoading />
                <SkeletonCard isLoading />
                <SkeletonCard isLoading />
                <SkeletonCard isLoading />
                <SkeletonCard isLoading />
                <SkeletonCard isLoading />
                <SkeletonCard isLoading />
            </div>
        </div>
    )
}