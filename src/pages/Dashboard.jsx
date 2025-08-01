import React, { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import {
  FolderOpen,
  FileText,
  Headphones,
  Calendar,
  MessageCircle,
  Menu,
  X,
  Plus,
  ChevronDown,
} from "lucide-react";

export default function Dashboard() {
  const { user, userProfile } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const sidebarItems = [
    {
      category: "Project resources",
      items: [
        { name: "Boards", icon: FolderOpen },
        { name: "Notes", icon: FileText },
      ],
    },
    {
      category: "Messaging",
      items: [{ name: "Help", icon: Headphones }],
    },
    {
      category: "History",
      items: [{ name: "Order history", icon: Calendar }],
    },
  ];

  useEffect(() => {
    const checkScreenSize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      setIsSidebarOpen(!mobile);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const getUserDisplayName = () => {
    if (userProfile?.fullName) return userProfile.fullName.toLowerCase();
    if (user?.email)
      return user.email.split("@")[0].replace(".", " ").toLowerCase();
    return "user";
  };

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  return (
    <div className="flex flex-col h-screen mt-20 overflow-hidden bg-gray-50 md:mt-0">
      <div className="flex flex-1 h-0 overflow-hidden lg:pt-16">
        {/* Sidebar */}
        {isMobile ? (
          <>
            {/* Mobile Sidebar Drawer */}
            <div
              className={`fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-xl transform transition-transform duration-300 ease-in-out ${
                isSidebarOpen ? "translate-y-0" : "translate-y-full"
              }`}
            >
              <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-medium text-gray-700">Menu</span>
                  <button onClick={toggleSidebar}>
                    <X className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
                <div className="space-y-6">
                  {sidebarItems.map((section, sectionIndex) => (
                    <div key={sectionIndex}>
                      <h3 className="mb-2 text-xs font-semibold tracking-wide text-gray-500 uppercase">
                        {section.category}
                      </h3>
                      <div className="space-y-2">
                        {section.items.map((item, itemIndex) => (
                          <button
                            key={itemIndex}
                            className="flex items-center w-full gap-3 p-2 text-left text-gray-700 transition-colors rounded-lg hover:bg-gray-100"
                          >
                            <item.icon className="w-5 h-5 text-gray-500" />
                            <span className="text-sm font-medium">{item.name}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Mobile Sidebar Toggle Button */}
            <div className="fixed z-40 bottom-4 left-4">
              <button
                onClick={toggleSidebar}
                className="p-3 text-white bg-gray-800 rounded-full shadow-lg hover:bg-gray-700"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </>
        ) : (
          <div
            className={`h-full bg-white border-r border-gray-200 transition-all duration-300 ease-in-out relative z-50 flex-shrink-0 ${
              isSidebarOpen ? "w-80" : "w-16"
            }`}
          >
            <button
              onClick={toggleSidebar}
              className="absolute top-4 -right-3 z-20 p-1.5 bg-white border border-gray-200 rounded-full shadow-sm hover:bg-gray-50"
              aria-label={isSidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
            >
              {isSidebarOpen ? (
                <X className="w-4 h-4 text-gray-600" />
              ) : (
                <Menu className="w-4 h-4 text-gray-600" />
              )}
            </button>

            <div
              className={`h-full flex flex-col transition-opacity duration-300 overflow-hidden ${
                !isSidebarOpen ? "opacity-0 pointer-events-none" : "opacity-100"
              }`}
            >
              <div className="flex-1 p-6">
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-3">
                    <span className="mb-4 text-sm font-medium text-gray-700">
                      Choose project
                    </span>
                    <ChevronDown className="w-4 h-4 text-gray-500" />
                  </div>
                  <button className="flex items-center justify-center w-full gap-2 p-2 px-4 py-2 text-sm font-medium text-white bg-gray-800 rounded-full hover:bg-gray-700">
                    <Plus className="w-4 h-4" />
                    New project
                  </button>
                </div>

                <div className="space-y-8">
                  {sidebarItems.map((section, sectionIndex) => (
                    <div key={sectionIndex}>
                      <h3 className="mb-4 text-sm font-medium text-gray-500">
                        {section.category}
                      </h3>
                      <div className="space-y-2">
                        {section.items.map((item, itemIndex) => (
                          <button
                            key={itemIndex}
                            className="flex items-center w-full gap-3 p-1 text-left text-gray-700 transition-colors rounded-lg hover:bg-gray-50 group"
                          >
                            <item.icon className="w-5 h-5 text-gray-500 group-hover:text-gray-700" />
                            <span className="font-medium">{item.name}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="flex flex-col flex-1 h-full overflow-hidden">
          <div
            className={`flex-1 ${isMobile ? "p-4 pt-10" : "p-8"}`}
            style={{
              overflowY: "auto",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            <div className="max-w-5xl mx-auto">
              <div className="mb-8 text-center">
                <h1
                  className={`font-normal text-gray-800 ${
                    isMobile ? "text-xl" : "text-2xl"
                  }`}
                >
                  Hello, {getUserDisplayName()}
                </h1>
              </div>

              <div className="max-w-2xl mx-auto mb-12">
                <div
                  className={`text-center text-white bg-green-900 rounded-2xl ${
                    isMobile ? "p-6" : "p-8"
                  }`}
                >
                  <div className="mb-4">
                    <p className="mb-2 text-sm font-medium opacity-90">
                      ARTIST'S RESIDENCE
                    </p>
                    <h2
                      className={`mb-2 font-bold ${
                        isMobile ? "text-xl" : "text-2xl"
                      }`}
                    >
                      Curated by Creatives
                    </h2>
                    <p className="text-sm opacity-90">
                      Win a 2-night stay for 2 at Château La Coste in Provence.
                    </p>
                  </div>
                  <div className="mb-6">
                    <img
                      src="https://materialbank-eu-cdn.freetls.fastly.net/media/wysiwyg/CC_20250625_2.jpg"
                      alt="Curated materials and samples"
                      className={`object-cover w-full rounded-lg ${
                        isMobile ? "h-40" : "h-48"
                      }`}
                    />
                  </div>
                  <button className="px-6 py-2 font-medium text-gray-800 transition-colors bg-white rounded-full hover:bg-gray-100">
                    Learn more
                  </button>
                </div>
              </div>

              <div className="grid max-w-2xl gap-8 mx-auto mb-8 lg:grid-cols-1">
                <div className="p-6 bg-white shadow-sm rounded-xl">
                  <h3 className="mb-6 text-lg font-semibold text-gray-800">
                    Current Project
                  </h3>
                  <div className="py-8 text-center">
                    <h4 className="mb-4 text-base font-medium text-gray-600">
                      No projects yet
                    </h4>
                    <p className="mb-8 text-sm leading-relaxed text-gray-500">
                      Projects help keep you organized and allow for a more
                      <br />
                      personalized experience.
                    </p>
                    <button className="inline-flex items-center gap-2 px-6 py-3 text-sm text-gray-600 transition-colors rounded-full shadow-md hover:text-gray-80 hover:scale-105 bg-slate-100">
                      <Plus className="w-4 h-4" />
                      Create a new project
                    </button>
                  </div>
                </div>

                <div className="p-6 bg-white shadow-sm rounded-xl">
                  <h3 className="mb-6 text-lg font-semibold text-gray-800">
                    Recent Boards
                  </h3>
                  <div className="py-8 text-center">
                    <h4 className="mb-4 text-base font-medium text-gray-600">
                      No boards yet
                    </h4>
                    <p className="mb-8 text-sm leading-relaxed text-gray-500">
                      Create, present, and share expressive concepts with Boards.
                      {!isMobile && <br />}
                      Design starts here.™
                    </p>
                    <button className="inline-flex items-center gap-2 px-6 py-3 text-sm text-gray-600 transition-colors rounded-full shadow-md hover:text-gray-80 hover:scale-105 bg-slate-100">
                      <Plus className="w-4 h-4" />
                      Create a new board
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <style>{`
            div::-webkit-scrollbar {
              display: none;
            }
          `}</style>
        </div>
      </div>

      {/* Chat Button */}
     
    </div>
  );
}
