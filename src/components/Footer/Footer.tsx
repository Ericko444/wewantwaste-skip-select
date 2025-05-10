const Footer = () => {
    const currentYear = new Date().getFullYear();
    return (
        <footer className="mt-16 py-8 text-center text-gray-500 text-sm border-t border-gray-200">
            <div className="container mx-auto px-4">
                <p>© {currentYear} WeWantWaste . All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;