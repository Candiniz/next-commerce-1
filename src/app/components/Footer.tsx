type FooterProps = {
  show: boolean;
};

export default function Footer({ show }: FooterProps) {
    return (
        
        <footer className={`
        fixed bottom-0 left-0 w-full h-[50px] bg-black text-[#ceb176] flex items-center justify-center 
        transition-transform duration-500 
        ${show ? 'translate-y-0' : 'translate-y-full'}`}>
            <span>Sobrinha &copy; | 2024</span>
        </footer>
    );
}
