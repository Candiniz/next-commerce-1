'use client'

import { useEffect, useRef, useState } from "react";
import { FaShoppingBag, FaUmbrellaBeach } from "react-icons/fa";
import { MdTableBar } from "react-icons/md";
import { GiLargeDress } from "react-icons/gi";

export default function CategoryMenu() {
    const staticMenuRef = useRef<HTMLDivElement>(null);
    const [isSticky, setIsSticky] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                // Queremos ativar o sticky apenas se a div saiu pelo topo
                if (!entry.isIntersecting && entry.boundingClientRect.top < 0) {
                    setIsSticky(true);
                } else {
                    setIsSticky(false);
                }
            },
            {
                threshold: 0,
            }
        );

        if (staticMenuRef.current) observer.observe(staticMenuRef.current);

        return () => {
            if (staticMenuRef.current) observer.unobserve(staticMenuRef.current);
        };
    }, []);


    const menuContent = (
        <>
            <button
                onClick={() => document.getElementById("bolsas-acessorios")?.scrollIntoView({ behavior: "smooth" })}
                className="px-3 py-1 text-[#755f3c] hover:text-white flex flex-col gap-2 items-center justify-center hover:bg-pink-300 text-xs md:text-sm cursor-pointer transition-all"
            >
                <FaShoppingBag /> Bolsas &<br /> Acessórios
            </button>
            <button
                onClick={() => document.getElementById("jogos-americanos")?.scrollIntoView({ behavior: "smooth" })}
                className="px-3 py-1 text-[#755f3c] hover:text-white flex flex-col gap-2 items-center justify-center hover:bg-pink-300 text-xs md:text-sm cursor-pointer transition-all"
            >
                <MdTableBar /> Jogos<br /> Americanos
            </button>
            <button
                onClick={() => document.getElementById("vestidos-saias")?.scrollIntoView({ behavior: "smooth" })}
                className="px-3 py-1 text-[#755f3c] hover:text-white flex flex-col gap-2 items-center justify-center hover:bg-pink-300 text-xs md:text-sm cursor-pointer transition-all"
            >
                <GiLargeDress /> Vestidos &<br /> Saias
            </button>
            <button
                onClick={() => document.getElementById("biquinis-praia")?.scrollIntoView({ behavior: "smooth" })}
                className="px-3 py-1 text-[#755f3c] hover:text-white flex flex-col gap-2 items-center justify-center hover:bg-pink-300 text-xs md:text-sm cursor-pointer transition-all"
            >
                <FaUmbrellaBeach /> Biquinis &<br /> Praia
            </button>
        </>
    );

    return (
        <>
            {/* Menu estático - observado diretamente */}
            <div ref={staticMenuRef} className="bg-white gap-5 flex justify-center w-full px-3 shadow-inner py-4 z-10">
                {menuContent}
            </div>

            {/* Menu fixo com animação de entrada e saída */}
            <div
                className={`fixed top-[65px] left-0 w-full bg-white gap-5 flex justify-center px-3 py-4 shadow-md border-b border-[#e0dad4] z-40
          transition-transform duration-500 ease-in-out
          ${isSticky ? "translate-y-0" : "-translate-y-full"}
        `}
            >
                {menuContent}
            </div>
        </>
    );
}
