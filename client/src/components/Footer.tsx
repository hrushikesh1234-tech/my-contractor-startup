import { Link } from "wouter";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 font-inter">
              Kamshet<span className="text-[#f97316]">.Build</span>
            </h3>
            <p className="text-gray-300 mb-4">
              Connecting customers with the best construction professionals in Kamshet and surrounding areas.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white" aria-label="Facebook">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="text-gray-300 hover:text-white" aria-label="Twitter">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-gray-300 hover:text-white" aria-label="Instagram">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="text-gray-300 hover:text-white" aria-label="LinkedIn">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="/" className="text-gray-300 hover:text-white">Home</Link></li>
              <li><Link href="/professionals?type=contractor" className="text-gray-300 hover:text-white">Find Contractors</Link></li>
              <li><Link href="/professionals?type=architect" className="text-gray-300 hover:text-white">Find Architects</Link></li>
              <li><Link href="/about" className="text-gray-300 hover:text-white">About Us</Link></li>
              <li><Link href="/contact" className="text-gray-300 hover:text-white">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              <li><Link href="#" className="text-gray-300 hover:text-white">Construction Guide</Link></li>
              <li><Link href="#" className="text-gray-300 hover:text-white">Cost Calculator</Link></li>
              <li><Link href="#" className="text-gray-300 hover:text-white">Blog</Link></li>
              <li><Link href="#" className="text-gray-300 hover:text-white">FAQ</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><Link href="/terms" className="text-gray-300 hover:text-white">Terms of Service</Link></li>
              <li><Link href="/privacy" className="text-gray-300 hover:text-white">Privacy Policy</Link></li>
              <li><Link href="#" className="text-gray-300 hover:text-white">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
          <p>&copy; {new Date().getFullYear()} Kamshet.Build. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
