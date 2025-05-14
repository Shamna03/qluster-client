import Link from "next/link"
import { Github, Twitter, Linkedin, Mail, Heart } from "lucide-react"

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-[#37113c] to-[#611f69] text-white py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* CTA Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Let's collaborate on something innovative</h2>
          <p className="text-lg opacity-90 max-w-2xl mx-auto mb-8">
            Have a project in mind? Join our community of developers and bring your ideas to life.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="#"
              className="px-6 py-3 bg-white text-[#611f69] font-medium rounded-full hover:bg-opacity-90 transition-all"
            >
              Start Collaborating
            </Link>
            <Link
              href="#"
              className="px-6 py-3 bg-transparent border border-white text-white font-medium rounded-full hover:bg-white/10 transition-all"
            >
              Contact Us
            </Link>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-xl font-bold mb-4">CLUSTER</h3>
            <p className="text-sm opacity-80 mb-4">
              The platform for developers to connect, collaborate, and create amazing projects together.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-white hover:text-gray-300 transition-colors">
                <Github size={20} />
              </Link>
              <Link href="#" className="text-white hover:text-gray-300 transition-colors">
                <Twitter size={20} />
              </Link>
              <Link href="#" className="text-white hover:text-gray-300 transition-colors">
                <Linkedin size={20} />
              </Link>
              <Link href="#" className="text-white hover:text-gray-300 transition-colors">
                <Mail size={20} />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Platform</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-sm opacity-80 hover:opacity-100 transition-opacity">
                  Features
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm opacity-80 hover:opacity-100 transition-opacity">
                  Projects
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm opacity-80 hover:opacity-100 transition-opacity">
                  Developers
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm opacity-80 hover:opacity-100 transition-opacity">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-sm opacity-80 hover:opacity-100 transition-opacity">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm opacity-80 hover:opacity-100 transition-opacity">
                  API Reference
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm opacity-80 hover:opacity-100 transition-opacity">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm opacity-80 hover:opacity-100 transition-opacity">
                  Community
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-sm opacity-80 hover:opacity-100 transition-opacity">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm opacity-80 hover:opacity-100 transition-opacity">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm opacity-80 hover:opacity-100 transition-opacity">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm opacity-80 hover:opacity-100 transition-opacity">
                  Partners
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="pt-8 border-t border-white/20 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm opacity-80 mb-4 md:mb-0">© {new Date().getFullYear()} CLUSTER. All rights reserved.</p>
          <div className="flex flex-wrap justify-center gap-6">
            <Link href="#" className="text-sm opacity-80 hover:opacity-100 transition-opacity">
              Terms of Service
            </Link>
            <Link href="#" className="text-sm opacity-80 hover:opacity-100 transition-opacity">
              Privacy Policy
            </Link>
            <Link href="#" className="text-sm opacity-80 hover:opacity-100 transition-opacity">
              Cookie Policy
            </Link>
          </div>
        </div>

        <div className="text-center mt-8 text-sm opacity-70 flex items-center justify-center">
          Made with <Heart className="w-4 h-4 mx-1 text-red-400" /> for developers worldwide
        </div>
      </div>
    </footer>
  )
}

export default Footer

