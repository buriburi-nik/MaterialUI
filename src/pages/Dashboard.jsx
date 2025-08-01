import React, { useState } from "react";
import { useSelector } from "react-redux";
import { ChevronDown, Plus, FolderOpen, FileText, Headphones, Calendar } from "lucide-react";
import Footer from "@/components/layout/Footer";

export default function Dashboard() {
  const { user } = useSelector((state) => state.auth);
  const [selectedProject, setSelectedProject] = useState("Choose project");
  const [isProjectDropdownOpen, setIsProjectDropdownOpen] = useState(false);

  const projects = [
    "Office Renovation 2024",
    "Residential Complex A",
    "Hotel Lobby Design",
    "Modern Apartment"
  ];

  const sidebarItems = [
    {
      category: "Project resources",
      items: [
        { name: "Boards", icon: FolderOpen, count: null },
        { name: "Notes", icon: FileText, count: null }
      ]
    },
    {
      category: "Messaging",
      items: [
        { name: "Help", icon: Headphones, count: null }
      ]
    },
    {
      category: "History",
      items: [
        { name: "Order history", icon: Calendar, count: null }
      ]
    }
  ];

  const getUserDisplayName = () => {
    if (!user?.email) return "User";
    const email = user.email;
    const localPart = email.split("@")[0];
    return localPart.replace(".", " ");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content Area */}
      <div className="flex pt-16">
        {/* Sidebar */}
        <div className="w-80 bg-white border-r border-gray-200 min-h-screen p-6">
          {/* Project Selector */}
          <div className="mb-8">
            <div className="relative">
              <button
                onClick={() => setIsProjectDropdownOpen(!isProjectDropdownOpen)}
                className="w-full flex items-center justify-between p-3 text-left text-gray-700 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <span className="font-medium">{selectedProject}</span>
                <ChevronDown className="w-4 h-4 text-gray-500" />
              </button>
              
              {isProjectDropdownOpen && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                  {projects.map((project, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setSelectedProject(project);
                        setIsProjectDropdownOpen(false);
                      }}
                      className="w-full px-3 py-2 text-left text-gray-700 hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg"
                    >
                      {project}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* New Project Button */}
          <button className="w-full flex items-center justify-center gap-3 p-4 mb-8 bg-gray-800 text-white rounded-full hover:bg-gray-700 transition-colors">
            <Plus className="w-5 h-5" />
            <span className="font-medium">New project</span>
          </button>

          {/* Sidebar Navigation */}
          <div className="space-y-8">
            {sidebarItems.map((section, sectionIndex) => (
              <div key={sectionIndex}>
                <h3 className="text-sm font-medium text-gray-500 mb-4">
                  {section.category}
                </h3>
                <div className="space-y-2">
                  {section.items.map((item, itemIndex) => (
                    <button
                      key={itemIndex}
                      className="w-full flex items-center gap-3 p-3 text-left text-gray-700 hover:bg-gray-50 rounded-lg transition-colors group"
                    >
                      <item.icon className="w-5 h-5 text-gray-500 group-hover:text-gray-700" />
                      <span className="font-medium">{item.name}</span>
                      {item.count && (
                        <span className="ml-auto text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded-full">
                          {item.count}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          <div className="max-w-4xl">
            {/* Welcome Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Welcome back, {getUserDisplayName()}!
              </h1>
              <p className="text-gray-600">
                Manage your projects, explore materials, and track your sample orders.
              </p>
            </div>

            {/* Dashboard Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {/* Quick Actions Card */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <button className="w-full text-left p-3 hover:bg-gray-50 rounded-lg transition-colors">
                    <div className="font-medium text-gray-900">Start New Project</div>
                    <div className="text-sm text-gray-500">Create a project and begin sampling</div>
                  </button>
                  <button className="w-full text-left p-3 hover:bg-gray-50 rounded-lg transition-colors">
                    <div className="font-medium text-gray-900">Browse Materials</div>
                    <div className="text-sm text-gray-500">Explore our material library</div>
                  </button>
                  <button className="w-full text-left p-3 hover:bg-gray-50 rounded-lg transition-colors">
                    <div className="font-medium text-gray-900">View Brands</div>
                    <div className="text-sm text-gray-500">See all available brands</div>
                  </button>
                </div>
              </div>

              {/* Recent Projects Card */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Projects</h3>
                <div className="space-y-3">
                  {projects.slice(0, 3).map((project, index) => (
                    <div key={index} className="p-3 border border-gray-100 rounded-lg">
                      <div className="font-medium text-gray-900">{project}</div>
                      <div className="text-sm text-gray-500">Updated 2 days ago</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sample Orders Card */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Sample Orders</h3>
                <div className="space-y-3">
                  <div className="p-3 border border-gray-100 rounded-lg">
                    <div className="font-medium text-gray-900">Order #2024-001</div>
                    <div className="text-sm text-green-600">Delivered</div>
                  </div>
                  <div className="p-3 border border-gray-100 rounded-lg">
                    <div className="font-medium text-gray-900">Order #2024-002</div>
                    <div className="text-sm text-blue-600">In Transit</div>
                  </div>
                  <div className="p-3 border border-gray-100 rounded-lg">
                    <div className="font-medium text-gray-900">Order #2024-003</div>
                    <div className="text-sm text-yellow-600">Processing</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <div>
                      <div className="font-medium text-gray-900">New samples ordered</div>
                      <div className="text-sm text-gray-500">Office Renovation 2024 • 2 hours ago</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <div>
                      <div className="font-medium text-gray-900">Project created</div>
                      <div className="text-sm text-gray-500">Modern Apartment • 1 day ago</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                    <div>
                      <div className="font-medium text-gray-900">Board updated</div>
                      <div className="text-sm text-gray-500">Hotel Lobby Design • 3 days ago</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
