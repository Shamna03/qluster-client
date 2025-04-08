import React from 'react';
import { Globe, Briefcase, MapPin, Mail, ExternalLink, Twitter, Linkedin } from 'lucide-react';

const Page = () => {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 w-full min-h-screen p-4 md:p-8 lg:p-16 flex justify-center items-center">
      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-xl overflow-hidden">
        
        {/* Hero Banner */}
        <div className="w-full h-56 md:h-64 relative overflow-hidden">
          <img 
            src="Screenshot (2).png" 
            className="w-full h-full object-cover"
            alt="Banner background"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-blue-900/30"></div>
        </div>
        
        {/* Profile Section */}
        <div className="relative px-6 md:px-8 pb-8">
          {/* Profile Picture */}
          <div className="absolute -top-16 left-6 md:left-8 rounded-full border-4 border-white shadow-lg">
            <div className="w-32 h-32 bg-white rounded-full flex justify-center items-center overflow-hidden">
              <img 
                src="WhatsApp Image 2023-12-02 at 20.12.12_c469398a.jpg" 
                className="w-full h-full object-cover" 
                alt="Hashim's profile"
              />
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex justify-end pt-4">
            
          </div>
          
          {/* Profile Info */}
          <div className="mt-12 md:flex justify-between">
            <div className="md:w-2/3">
              <h1 className="text-3xl font-bold text-gray-900 p-2">Hashim</h1>
              <h2 className="text-xl text-blue-600 font-medium mt-1">MERN Stack Developer</h2>
              
              <div className="flex items-center mt-3 text-gray-600">
                <MapPin size={18} className="mr-2" />
                <p>Vadakara, Kerala, India</p>
              </div>
              
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-800">About</h3>
                <p className="mt-2 text-gray-600">
                  Passionate MERN stack developer with expertise in building responsive and 
                  efficient web applications. Specializing in MongoDB, Express, React, and Node.js.
                  Dedicated to creating seamless user experiences through clean and maintainable code.
                </p>
              </div>
              
              {/* Skills */}
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-800">Skills</h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {['MongoDB', 'Express', 'React', 'Node.js', 'JavaScript', 'TypeScript', 'Tailwind CSS', 'REST API'].map((skill) => (
                    <span key={skill} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Contact Links */}
            <div className="mt-8 md:mt-0 md:w-1/3 md:pl-8">
              <h3 className="text-lg font-semibold text-gray-800">Contact & Links</h3>
              <ul className="mt-3 space-y-3">
                <li className="flex items-center text-gray-700 hover:text-blue-600 transition-colors">
                  <Globe size={20} className="mr-3 text-blue-500" />
                  <a href="#" className="hover:underline">portfolio77.com</a>
                </li>
                
                
                <li className="flex items-center text-gray-700 hover:text-blue-600 transition-colors">
                  <Linkedin size={20} className="mr-3 text-blue-500" />
                  <a href="#" className="hover:underline">linkedin.com/in/hashim</a>
                </li>
                
              </ul>
            </div>
          </div>
          
          {/* Project Highlights */}
          <div className="mt-10">
            <h3 className="text-lg font-semibold text-gray-800">Featured Projects</h3>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                <div className="h-40 bg-gray-100">
                  <img src="/api/placeholder/400/200" className="w-full h-full object-cover" alt="Project 1" />
                </div>
                <div className="p-4">
                  <h4 className="font-semibold">E-commerce Platform</h4>
                  <p className="text-sm text-gray-600 mt-1">Full-stack MERN application with user authentication and payment processing</p>
                </div>
              </div>
              <div className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                <div className="h-40 bg-gray-100">
                  <img src="/api/placeholder/400/200" className="w-full h-full object-cover" alt="Project 2" />
                </div>
                <div className="p-4">
                  <h4 className="font-semibold">Task Management App</h4>
                  <p className="text-sm text-gray-600 mt-1">React-based application with drag-and-drop functionality and real-time updates</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;