import { Link } from "wouter";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  const handleLinkClick = () => {
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="md:hidden">
      <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t">
        <Link href="/" onClick={handleLinkClick} className="block px-3 py-2 rounded font-medium hover:bg-gray-100">
          Home
        </Link>
        <Link href="/professionals" onClick={handleLinkClick} className="block px-3 py-2 rounded font-medium hover:bg-gray-100">
          Find Professionals
        </Link>
        <Link href="/about" onClick={handleLinkClick} className="block px-3 py-2 rounded font-medium hover:bg-gray-100">
          About Us
        </Link>
        
        <Link href="/login" onClick={handleLinkClick} className="block px-3 py-2 rounded font-medium hover:bg-gray-100">
          Login
        </Link>
        <Link href="/register" onClick={handleLinkClick} className="block px-3 py-2 rounded font-medium hover:bg-gray-100">
          Register
        </Link>
      </div>
    </div>
  );
};

export default MobileMenu;
