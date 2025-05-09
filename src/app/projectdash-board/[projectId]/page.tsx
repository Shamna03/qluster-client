'use client';

import { useQuery } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Calendar, CheckSquare, Settings, Clock, Tag, Users, FileText, Code, AlertCircle, ArrowLeft } from 'lucide-react';
import projectaxiosinstance from '@/api/projectaxiosinstance';

const ProjectDashboard = () => {
  const params = useParams();
  const router = useRouter();
  const projectId = params?.projectId as string;

  const { data: project, error, isPending } = useQuery({
    queryKey: ['getProject', projectId],
    queryFn: async () => {
      const { data } = await projectaxiosinstance.get(`project/getProject/${projectId}`);
      console.log(data);
      return data;
    },
    enabled: !!projectId,
  });

  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-purple-50 dark:from-gray-950 dark:to-[#1a0d1e]">
        <div className="animate-pulse flex flex-col items-center">
          <div className="rounded-full bg-purple-200 dark:bg-purple-900/40 h-12 w-12 mb-4"></div>
          <div className="h-4 bg-purple-200 dark:bg-purple-900/40 rounded w-48 mb-2"></div>
          <div className="h-3 bg-purple-200 dark:bg-purple-900/40 rounded w-36"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-purple-50 dark:from-gray-950 dark:to-[#1a0d1e]">
        <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-md max-w-md w-full border border-purple-100 dark:border-purple-900/30">
          <div className="flex items-center justify-center text-red-500 dark:text-red-400 mb-4">
            <AlertCircle size={32} />
          </div>
          <h2 className="text-xl font-semibold text-center mb-2 text-[#611f69] dark:text-purple-300">Error Loading Project</h2>
          <p className="text-gray-600 dark:text-gray-400 text-center">We couldn't load the project information. Please try again later.</p>
          <div className="mt-6 flex justify-center">
            <button 
              onClick={() => router.push("/projects")}
              className="flex items-center px-4 py-2 rounded-lg bg-gradient-to-r from-[#37113c] to-[#611f69] hover:from-[#4a1751] hover:to-[#7a2785] text-white"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Projects
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-purple-50 dark:from-gray-950 dark:to-[#1a0d1e]">
        <div className="text-center bg-white dark:bg-gray-900 p-8 rounded-lg shadow-md max-w-md w-full border border-purple-100 dark:border-purple-900/30">
          <div className="flex items-center justify-center text-amber-500 dark:text-amber-400 mb-4">
            <AlertCircle size={32} />
          </div>
          <h2 className="text-2xl font-bold text-[#611f69] dark:text-purple-300 mb-4">Project Not Found</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            The project you're looking for doesn't exist or you don't have access to it.
          </p>
          <button 
            onClick={() => router.push("/projects")}
            className="flex items-center px-4 py-2 rounded-lg bg-gradient-to-r from-[#37113c] to-[#611f69] hover:from-[#4a1751] hover:to-[#7a2785] text-white"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Projects
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-purple-50 dark:from-gray-950 dark:to-[#1a0d1e] mt-20">
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-b from-purple-100/40 to-transparent dark:from-purple-900/20 rounded-bl-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-t from-purple-100/40 to-transparent dark:from-purple-900/20 rounded-tr-full blur-3xl -z-10"></div>

      {/* Header */}
      <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-[#611f69] dark:text-purple-300">{project.title}</h1>
              <p className="mt-1 text-lg text-gray-600 dark:text-gray-300">{project.description}</p>
            </div>
            <div className="mt-4 md:mt-0 flex flex-wrap gap-3">
              {project.isOwner && (
                <Link href={`/projects/${projectId}/settings`}>
                  <button className="flex items-center gap-2 bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-700 transition">
                    <Settings size={18} />
                    <span>Settings</span>
                  </button>
                </Link>
              )}
              <Link href={`/projects/${projectId}/board`}>
                <button className="flex items-center gap-2 bg-gradient-to-r from-[#37113c] to-[#611f69] hover:from-[#4a1751] hover:to-[#7a2785] text-white px-4 py-2 rounded-lg transition">
                  <CheckSquare size={18} />
                  <span>Kanban Board</span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Project Details */}
          <div className="col-span-2">
            <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-lg shadow overflow-hidden border border-purple-100 dark:border-purple-900/30">
              <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-xl font-semibold text-[#611f69] dark:text-purple-300">Project Details</h2>
              </div>
              <div className="p-6 space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-[#611f69] dark:text-purple-300 mb-2">Overview</h3>
                  <div className="prose max-w-none text-gray-600 dark:text-gray-300">
                    <p>{project.description}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-medium text-[#611f69] dark:text-purple-300 mb-3">Problem Statement</h3>
                    <div className="bg-purple-50/70 dark:bg-gray-800/70 p-4 rounded-lg border border-purple-100 dark:border-purple-900/30">
                      <p className="text-gray-700 dark:text-gray-300">{project.problem}</p>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium text-[#611f69] dark:text-purple-300 mb-3">Solution Approach</h3>
                    <div className="bg-purple-50/70 dark:bg-gray-800/70 p-4 rounded-lg border border-purple-100 dark:border-purple-900/30">
                      <p className="text-gray-700 dark:text-gray-300">{project.solution}</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Tag className="text-[#611f69] dark:text-purple-300" size={20} />
                      <div>
                        <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Categories</h4>
                        <div className="mt-1 flex flex-wrap gap-2">
                          {project.category?.map((cat:string, index:number) => (
                            <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-[#611f69] dark:bg-purple-900/40 dark:text-purple-200">
                              {cat}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Code className="text-[#611f69] dark:text-purple-300" size={20} />
                      <div>
                        <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Tech Stack</h4>
                        <div className="mt-1 flex flex-wrap gap-2">
                          {project.techStack?.map((tech:string, index:number) => (
                            <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-200">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Users className="text-[#611f69] dark:text-purple-300" size={20} />
                      <div>
                        <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Required Roles</h4>
                        <div className="mt-1 flex flex-wrap gap-2">
                          {project.requiredRoles?.map((role:string, index:number) => (
                            <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-200">
                              {role}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Clock className="text-[#611f69] dark:text-purple-300" size={20} />
                      <div>
                        <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Timeline</h4>
                        <div className="mt-1 text-sm text-gray-700 dark:text-gray-300">
                          <p>Created: {new Date(project.createdAt).toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          })}</p>
                          <p>Last updated: {new Date(project.updatedAt).toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="col-span-1 space-y-8">
            {/* My Tasks */}
            <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-lg shadow overflow-hidden border border-purple-100 dark:border-purple-900/30">
              <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                <h2 className="text-xl font-semibold text-[#611f69] dark:text-purple-300">My Tasks</h2>
                <Link href={`/projects/${projectId}/tasks`}>
                  <button className="text-[#611f69] hover:text-[#7a2785] dark:text-purple-300 dark:hover:text-purple-200 text-sm font-medium">
                    View all
                  </button>
                </Link>
              </div>
              <div className="p-6">
                {project.tasks && project.tasks.length > 0 ? (
                  <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                    {project.tasks.slice(0, 5).map((task: { title?: string; status?: string }, index: number) => (
                      <li key={index} className="py-3">
                        <div className="flex items-start">
                          <div className="flex-shrink-0 mt-1">
                            <CheckSquare size={18} className="text-[#611f69] dark:text-purple-300" />
                          </div>
                          <div className="ml-3">
                            <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{task.title || 'Task Title'}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{task.status || 'In Progress'}</p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="text-center py-8">
                    <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-purple-100 dark:bg-purple-900/30">
                      <CheckSquare className="h-6 w-6 text-[#611f69] dark:text-purple-300" />
                    </div>
                    <p className="mt-2 text-sm font-medium text-gray-900 dark:text-gray-100">No tasks assigned</p>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">You don't have any tasks assigned to you yet.</p>
                    <div className="mt-6">
                      <Link href={`/projects/${projectId}/board`}>
                        <button className="inline-flex items-center px-4 py-2 rounded-md text-white bg-gradient-to-r from-[#37113c] to-[#611f69] hover:from-[#4a1751] hover:to-[#7a2785]">
                          Go to Kanban Board
                        </button>
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Team Members */}
            <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-lg shadow overflow-hidden border border-purple-100 dark:border-purple-900/30">
              <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-xl font-semibold text-[#611f69] dark:text-purple-300">Team Members</h2>
              </div>
              <div className="p-6">
                {project.team && project.team.length > 0 ? (
                  <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                    {project.team.map((member: { name?: string; role?: string }, index: number) => (
                      <li key={index} className="py-3 flex items-center">
                        <div className="flex-shrink-0">
                          <div className="h-10 w-10 rounded-full bg-gradient-to-r from-[#37113c] to-[#611f69] flex items-center justify-center text-white font-medium">
                            {member.name ? member.name.charAt(0).toUpperCase() : 'U'}
                          </div>
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{member.name || 'Unknown User'}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{member.role || 'Team Member'}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="text-center py-8">
                    <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-purple-100 dark:bg-purple-900/30">
                      <Users className="h-6 w-6 text-[#611f69] dark:text-purple-300" />
                    </div>
                    <p className="mt-2 text-sm font-medium text-gray-900 dark:text-gray-100">No team members yet</p>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">This project doesn't have any team members yet.</p>
                    {project.isOwner && (
                      <div className="mt-6">
                        <Link href={`/projects/${projectId}/invite`}>
                          <button className="inline-flex items-center px-4 py-2 border border-[#611f69] dark:border-purple-400 text-[#611f69] dark:text-purple-300 rounded-md hover:bg-purple-50 dark:hover:bg-purple-900/20">
                            Invite Team Members
                          </button>
                        </Link>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
            
            {/* Project Progress */}
            <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-lg shadow overflow-hidden border border-purple-100 dark:border-purple-900/30">
              <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-xl font-semibold text-[#611f69] dark:text-purple-300">Project Progress</h2>
              </div>
              <div className="p-6">
                <div className="mb-2 flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Overall Completion</span>
                  <span className="text-sm font-medium text-[#611f69] dark:text-purple-300">
                    {project.progress || '45'}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                  <div 
                    className="bg-gradient-to-r from-[#37113c] to-[#611f69] h-2.5 rounded-full" 
                    style={{ width: `${project.progress || 45}%` }}
                  ></div>
                </div>
                
                <div className="mt-6 space-y-4">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Tasks Completed</span>
                    <span className="font-medium text-gray-800 dark:text-gray-200">
                      {project.completedTasks || '12'}/{project.totalTasks || '28'}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Days Remaining</span>
                    <span className="font-medium text-gray-800 dark:text-gray-200">
                      {project.daysRemaining || '14'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDashboard;