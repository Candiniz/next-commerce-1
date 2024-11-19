import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import banner1 from "../../photos/banner1.jpg";
import styles from "./Banner.module.css"

import { AiFillInstagram } from "react-icons/ai";
import { FaFacebook } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";

export default function Banner1() {
  const [typedText, setTypedText] = useState({
    h1: "",
    h2_1: "",
    h2_2: "",
    p: "",
  });
  const [loopText, setLoopText] = useState("");
  const [loopIndex, setLoopIndex] = useState(0);
  const [showLoopText, setShowLoopText] = useState(false); // Flag para mostrar MUNDO e MANEIRA
  const [showPunctuation, setShowPunctuation] = useState(false); // Flag para mostrar os símbolos como "!" (remover vírgula)
  const isTyping = useRef(false);

  const h1Text = "Produtos sob medida de alta qualidade!";
  const h2_1Text = "NO SEU ";
  const h2_2Text = "DA SUA ";
  const pText = "Faça seu pedido:";
  const loopTexts = ["MUNDO", "MANEIRA"];

  // Efeito de digitação para os textos iniciais
  useEffect(() => {
    const typeText = async (key: keyof typeof typedText, text: string, delay: number = 100) => {
      for (let i = 0; i <= text.length; i++) {
        setTypedText((prev) => ({ ...prev, [key]: text.slice(0, i) }));
        await new Promise((resolve) => setTimeout(resolve, delay)); // Atraso mais lento
      }
    };

    const startTyping = async () => {
      await typeText("h1", h1Text, 150);  // Texto do h1 com atraso maior
      await typeText("p", pText, 150);    // Texto do p com atraso maior
      await typeText("h2_1", h2_1Text, 150);  // "NO SEU" também com atraso
      setTypedText((prev) => ({ ...prev, h2_2: h2_2Text }));
      setShowLoopText(true); // Liberando para o loop aparecer após digitar os textos principais
      setTimeout(() => setShowPunctuation(true), 500); // Adicionando delay para os símbolos "!" aparecerem
    };

    startTyping();
  }, []);

  // Efeito de digitação em loop para os dois h2
  useEffect(() => {
    const loopTyping = async () => {
      if (isTyping.current) return;
      isTyping.current = true;

      const text = loopTexts[loopIndex];
      // Digita o texto atual
      for (let i = 0; i <= text.length; i++) {
        setLoopText(text.slice(0, i));
        await new Promise((resolve) => setTimeout(resolve, 150)); // Atraso maior para o loop
      }
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // Apaga o texto atual
      for (let i = text.length; i >= 0; i--) {
        setLoopText(text.slice(0, i));
        await new Promise((resolve) => setTimeout(resolve, 100)); // Atraso maior ao apagar
      }

      setLoopIndex((prev) => (prev + 1) % loopTexts.length);
      isTyping.current = false;
    };

    if (showLoopText) { // Só inicia o loop depois que os textos iniciais são digitados
      loopTyping();
    }
  }, [loopIndex, loopTexts, showLoopText]);

  return (
    <div className={`relative shadow-2xl w-[95%] sm:w-4/5 md:w-4/5 lg:w-2/3 mx-auto ${styles.reflexoBrilhante}`}>
      <Image alt="Produtos Sob Medida" src={banner1} className="w-full" />
      <div
        className="
          absolute flex flex-col justify-evenly
          top-[10%] sm:top-[10%] md:top-[12%] lg:top-[20%] 
          right-[3%] sm:right-[8%] md:right-[10%] lg:right-[9%]
        "
      >
        {/* H1 */}
        <h1
          className="
            text-[#755f3c] text-shadow text-left
            text-[3.2vw] sm:text-[2.5vw] md:text-[2.3vw] lg:text-[2vw]
            relative
          "
        >
          <span className="invisible">{h1Text}</span>
          <span className="absolute top-0 left-0">{typedText.h1}</span>
        </h1>

        <div className="w-full mt-4 sm:mt-6 md:mt-10 lg:mt-12">
          {/* H2-1 */}
          <h2
            className="
              text-[#8a8377] text-shadow text-left 
              text-[4.5vw] sm:text-[4vw] md:text-[3.5vw] lg:text-[3vw]
              relative
            "
          >
            <span className="invisible">
              {h2_1Text}
              <span className="bg-pink-300 text-[#ede9df] leading-none px-2 py-1">
                {"MUNDO"}
              </span>
              &nbsp;
            </span>
            <span className="absolute top-0 left-0">
              {typedText.h2_1}
              <span className={`bg-pink-300 text-[#ede9df] leading-none px-2 py-1 ${typedText.h2_1 ? "visible" : "invisible"}`}>
                {loopIndex === 0 ? loopText : ""}
              </span>
              &nbsp;
            </span>
          </h2>

          {/* H2-2 */}
          <h2
            className="
              text-[#8a8377] text-shadow text-left 
              text-[4.5vw] sm:text-[4vw] md:text-[3.5vw] lg:text-[3vw]
              relative
            "
          >
            <span className="invisible">
              {h2_2Text}
              <span className="bg-pink-400 text-[#ede9df] leading-none px-2 py-1">
                {"MANEIRA"}
              </span>
              &nbsp;!
            </span>
            <span className="absolute top-0 left-0">
              {typedText.h2_2}
              <span className={`bg-pink-400 text-[#ede9df] leading-none px-2 py-1 ${typedText.h2_2 ? "visible" : "invisible"}`}>
                {loopIndex === 1 ? loopText : ""}
              </span>
              &nbsp;{showPunctuation && <span className="visible">!</span>} {/* Só mantivemos a exclamação */}
            </span>
          </h2>
        </div>

        <div className="flex flex-col md:flex-row items-center mt-6 lg:mt-12 w-full">
          {/* P */}
          <p
            className="
              text-[#8a8377] text-shadow text-left 
              text-[3.5vw] sm:text-[3vw] md:text-[2.5vw] lg:text-[2vw]
              relative
            "
          >
            <span className="invisible">{pText}</span>
            <span className="absolute top-0 left-0">{typedText.p}</span>
          </p>
          <div className="flex justify-start md:ml-6 gap-4 lg:gap-6">
            <a href="https://www.instagram.com/sobrinha_artesanatos/" target="_blank">
                <AiFillInstagram className="fill-[#8a8377] text-[5.3vw] sm:text-[4.2vw] md:text-[3.2vw] lg:text-[2.7vw] hover:fill-pink-500
                transition-all duration-500" /></a>
            <a href="https://www.facebook.com/sobrinha_artesanatos" target="_blank"><FaFacebook className="fill-[#8a8377] text-[5vw] sm:text-[4vw] md:text-[3vw] lg:text-[2.5vw] hover:fill-pink-500
                transition-all duration-500" /></a>
            <a href="https://wa.me/5511980187457?text=Olá!%20Gostaria%20de%20fazer%20uma%20encomenda!" target="_blank"><IoLogoWhatsapp className="fill-[#8a8377] text-[5vw] sm:text-[4vw] md:text-[3vw] lg:text-[2.5vw] hover:fill-pink-500
                transition-all duration-500" /></a>
          </div>
        </div>
      </div>
    </div>
  );
}
