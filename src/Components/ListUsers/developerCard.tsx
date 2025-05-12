
import React from 'react';
import { MapPin, Mail, Award, Star, ExternalLink } from 'lucide-react';

interface DeveloperProps {
  name: string;
  email: string;
  profilePicture?: string;
  profession?: string;
  isVerified: boolean;
  location?: string;
  skills?: string[];
 
}

const DeveloperListItem: React.FC<DeveloperProps> = ({
  name,
  email,
  profilePicture,
  profession,
  isVerified,
  location,
  skills,
  
}) => {
  return (
    <div className="flex items-center w-full py-4 px-4 border-b border-gray-100 hover:bg-gray-50 transition-colors pt-25">
      {/* Profile Image */}
      <div className="flex-shrink-0 mr-4 relative">
        {profilePicture ? (
          <img 
            src={profilePicture} 
            alt={`${name}'s profile`} 
            className="w-12 h-12 rounded-full object-cover"
          />
        ) : (
          <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-semibold">
            {name.charAt(0).toUpperCase()}
          </div>
        )}
        {isVerified && (
          <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-1 border-2 border-white">
            <Star size={10} className="text-white" />
          </div>
        )}
      </div>
      
      {/* Developer Info - Main part */}
      <div className="flex-grow flex flex-col md:flex-row md:items-center md:justify-between">
        <div className="flex-grow">
          <div className="flex items-center">
            <h3 className="font-medium text-gray-900">{name}</h3>
            {isVerified && (
              <span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-700">
                Verified
              </span>
            )}
          </div>
          
          {profession && (
            <p className="text-sm text-gray-600">{profession}</p>
          )}
          
          <div className="flex items-center mt-1 text-xs text-gray-500">
            <Mail size={12} className="mr-1" />
            <span>{email}</span>
            {location && (
              <>
                <span className="mx-2">•</span>
                <MapPin size={12} className="mr-1" />
                <span>{location}</span>
              </>
            )}
          </div>
        </div>
        
        {/* Skills and Endorsements - Right side */}
        <div className="mt-2 md:mt-0 flex flex-col md:items-end">
          {skills && skills.length > 0 && (
            <div className="flex flex-wrap gap-1 max-w-xs">
              {skills.slice(0, 3).map((skill, index) => (
                <span 
                  key={index}
                  className="bg-blue-50 text-blue-700 text-xs px-2 py-0.5 rounded-full"
                >
                  {skill}
                </span>
              ))}
              {skills.length > 3 && (
                <span className="text-xs text-gray-500">+{skills.length - 3} more</span>
              )}
            </div>
          )}
          
          
        </div>
      </div>
      
      {/* Action button */}
      <div className="flex-shrink-0 ml-4">
        <button className="p-1.5 rounded-full hover:bg-gray-200 transition-colors">
          <ExternalLink size={16} className="text-gray-400" />
        </button>
      </div>
    </div>
  );
};

export default DeveloperListItem;
