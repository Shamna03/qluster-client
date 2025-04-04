import React from 'react'

const Footer = () => {
  return (
   <footer className="bg-[#611f69] text-white py-12">
  <div className="max-w-7xl mx-auto px-6 lg:px-8">
    {/* CTA Section */}
    <div className="text-center mb-8">
      <h2 className="text-2xl font-bold">Let's collaborate on something innovative</h2>
      <p className="mt-2 text-sm">Have a project in mind? Reach out to us.</p>
    </div>

    {/* Contact Information */}
    <div className="text-center mb-8">
      <p className="text-sm">Contact us at:</p>
      <p className="text-lg font-semibold">+44 (0) 2920 090 505</p>
      <p className="text-lg font-semibold">hi@qluster.com</p>
    </div>

    {/* Navigation Links */}
    <div className="flex justify-center space-x-6 mb-8">
      <a href="#" className="hover:underline">Home</a>
      <a href="#" className="hover:underline">About</a>
      <a href="#" className="hover:underline">Services</a>
      <a href="#" className="hover:underline">Portfolio</a>
      <a href="#" className="hover:underline">Journal</a>
      <a href="#" className="hover:underline">Contact</a>
    </div>

    {/* Social Media Icons */}
    <div className="flex justify-center space-x-4 mb-8">
      <a href="#" className="hover:text-gray-300"><i className="fab fa-facebook-f"></i></a>
      <a href="#" className="hover:text-gray-300"><i className="fab fa-twitter"></i></a>
      <a href="#" className="hover:text-gray-300"><i className="fab fa-instagram"></i></a>
    </div>

    {/* Legal Links and Copyright */}
    <div className="text-center text-sm opacity-80">
      <div className="flex justify-center space-x-4 mb-2">
        <a href="#" className="hover:underline">Terms of Use</a>
        <a href="#" className="hover:underline">Privacy Notice</a>
        <a href="#" className="hover:underline">Cookie Policy</a>
      </div>
      <p>© {new Date().getFullYear()} Qluster . All rights reserved.</p>
    </div>
  </div>
</footer>


  )
}

export default Footer