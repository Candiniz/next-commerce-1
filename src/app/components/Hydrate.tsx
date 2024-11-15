'use client'

import { ReactNode, useState, useEffect } from "react";

export default function Hydrate({ children }: { children: ReactNode }) {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true); // Marca como montado após o carregamento do JS no cliente
    }, []);

    return isMounted ? (
        <>{children}</> // Exibe os filhos (conteúdo real) quando o JS terminar a hidratação
    ) : (
        // Exibe um spinner enquanto o JS não foi carregado
        <div className="flex justify-center items-center h-screen bg-gray-900 text-white">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-teal-300"></div>
        </div>
    );
}
