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
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [showBoardModal, setShowBoardModal] = useState(false);
  const [projectForm, setProjectForm] = useState({ name: '', description: '' });
  const [boardForm, setBoardForm] = useState({ name: '', description: '', category: 'design' });
  const [projects, setProjects] = useState([]);
  const [boards, setBoards] = useState([]);
  const [showNotesModal, setShowNotesModal] = useState(false);
  const [showOrderHistoryModal, setShowOrderHistoryModal] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [orderHistory, setOrderHistory] = useState([
    { id: 1, orderNumber: 'ORD-2025-001', date: '2025-01-15', items: 3, total: '$245.00', status: 'Delivered' },
    { id: 2, orderNumber: 'ORD-2025-002', date: '2025-01-20', items: 5, total: '$189.50', status: 'Processing' },
    { id: 3, orderNumber: 'ORD-2025-003', date: '2025-01-25', items: 2, total: '$320.00', status: 'Shipped' }
  ]);

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
    if (userProfile?.fullName) return userProfile.fullName;
    if (user?.firstName && user?.lastName)
      return `${user.firstName} ${user.lastName}`;
    if (user?.firstName) return user.firstName;
    if (user?.email)
      return user.email.split("@")[0].replace(".", " ");
    return "user";
  };

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  const handleCreateProject = () => {
    if (!projectForm.name.trim()) return;

    const newProject = {
      id: Date.now(),
      name: projectForm.name,
      description: projectForm.description,
      createdAt: new Date().toISOString(),
      boardsCount: 0
    };

    setProjects(prev => [newProject, ...prev]);
    setProjectForm({ name: '', description: '' });
    setShowProjectModal(false);
  };

  const handleCreateBoard = () => {
    if (!boardForm.name.trim()) return;

    const newBoard = {
      id: Date.now(),
      name: boardForm.name,
      description: boardForm.description,
      category: boardForm.category,
      createdAt: new Date().toISOString(),
      itemsCount: 0
    };

    setBoards(prev => [newBoard, ...prev]);
    setBoardForm({ name: '', description: '', category: 'design' });
    setShowBoardModal(false);
  };

  const handleSidebarAction = (action) => {
    switch(action) {
      case 'Boards':
        setShowBoardModal(true);
        break;
      case 'Notes':
        setShowNotesModal(true);
        break;
      case 'Help':
        setShowHelpModal(true);
        break;
      case 'Order history':
        setShowOrderHistoryModal(true);
        break;
      default:
        break;
    }
  };

  const handleAddNote = () => {
    if (!newNote.trim()) return;

    const note = {
      id: Date.now(),
      content: newNote,
      createdAt: new Date().toISOString()
    };

    setNotes(prev => [note, ...prev]);
    setNewNote('');
  };

  const handleDeleteNote = (id) => {
    setNotes(prev => prev.filter(note => note.id !== id));
  };

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
                            onClick={() => handleSidebarAction(item.name)}
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
                            onClick={() => handleSidebarAction(item.name)}
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
                  {projects.length === 0 ? (
                    <div className="py-8 text-center">
                      <h4 className="mb-4 text-base font-medium text-gray-600">
                        No projects yet
                      </h4>
                      <p className="mb-8 text-sm leading-relaxed text-gray-500">
                        Projects help keep you organized and allow for a more
                        <br />
                        personalized experience.
                      </p>
                      <button
                        onClick={() => setShowProjectModal(true)}
                        className="inline-flex items-center gap-2 px-6 py-3 text-sm text-gray-600 transition-colors rounded-full shadow-md hover:text-gray-800 hover:scale-105 bg-slate-100"
                      >
                        <Plus className="w-4 h-4" />
                        Create a new project
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {projects.slice(0, 3).map((project) => (
                        <div key={project.id} className="p-4 border rounded-lg hover:bg-gray-50">
                          <h4 className="font-medium text-gray-800">{project.name}</h4>
                          <p className="text-sm text-gray-500">{project.description}</p>
                          <p className="text-xs text-gray-400 mt-2">
                            Created {new Date(project.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      ))}
                      <button
                        onClick={() => setShowProjectModal(true)}
                        className="inline-flex items-center gap-2 px-4 py-2 text-sm text-gray-600 transition-colors rounded-lg hover:bg-gray-100"
                      >
                        <Plus className="w-4 h-4" />
                        Create new project
                      </button>
                    </div>
                  )}
                </div>

                <div className="p-6 bg-white shadow-sm rounded-xl">
                  <h3 className="mb-6 text-lg font-semibold text-gray-800">
                    Recent Boards
                  </h3>
                  {boards.length === 0 ? (
                    <div className="py-8 text-center">
                      <h4 className="mb-4 text-base font-medium text-gray-600">
                        No boards yet
                      </h4>
                      <p className="mb-8 text-sm leading-relaxed text-gray-500">
                        Create, present, and share expressive concepts with Boards.
                        {!isMobile && <br />}
                        Design starts here.™
                      </p>
                      <button
                        onClick={() => setShowBoardModal(true)}
                        className="inline-flex items-center gap-2 px-6 py-3 text-sm text-gray-600 transition-colors rounded-full shadow-md hover:text-gray-800 hover:scale-105 bg-slate-100"
                      >
                        <Plus className="w-4 h-4" />
                        Create a new board
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {boards.slice(0, 3).map((board) => (
                        <div key={board.id} className="p-4 border rounded-lg hover:bg-gray-50">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="font-medium text-gray-800">{board.name}</h4>
                            <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded">
                              {board.category}
                            </span>
                          </div>
                          <p className="text-sm text-gray-500">{board.description}</p>
                          <p className="text-xs text-gray-400 mt-2">
                            Created {new Date(board.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      ))}
                      <button
                        onClick={() => setShowBoardModal(true)}
                        className="inline-flex items-center gap-2 px-4 py-2 text-sm text-gray-600 transition-colors rounded-lg hover:bg-gray-100"
                      >
                        <Plus className="w-4 h-4" />
                        Create new board
                      </button>
                    </div>
                  )}
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

      {/* Project Creation Modal */}
      {showProjectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Create New Project</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Project Name</label>
                  <input
                    type="text"
                    value={projectForm.name}
                    onChange={(e) => setProjectForm(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter project name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description (Optional)</label>
                  <textarea
                    value={projectForm.description}
                    onChange={(e) => setProjectForm(prev => ({ ...prev, description: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter project description"
                    rows={3}
                  />
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowProjectModal(false)}
                  className="flex-1 px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateProject}
                  disabled={!projectForm.name.trim()}
                  className="flex-1 px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  Create Project
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Board Creation Modal */}
      {showBoardModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Create New Board</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Board Name</label>
                  <input
                    type="text"
                    value={boardForm.name}
                    onChange={(e) => setBoardForm(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter board name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select
                    value={boardForm.category}
                    onChange={(e) => setBoardForm(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="design">Design</option>
                    <option value="mood">Mood Board</option>
                    <option value="materials">Materials</option>
                    <option value="inspiration">Inspiration</option>
                    <option value="presentation">Presentation</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description (Optional)</label>
                  <textarea
                    value={boardForm.description}
                    onChange={(e) => setBoardForm(prev => ({ ...prev, description: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter board description"
                    rows={3}
                  />
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowBoardModal(false)}
                  className="flex-1 px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateBoard}
                  disabled={!boardForm.name.trim()}
                  className="flex-1 px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  Create Board
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Notes Modal */}
      {showNotesModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4 max-h-[80vh] overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-800">Notes</h3>
                <button
                  onClick={() => setShowNotesModal(false)}
                  className="p-1 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="p-6 overflow-y-auto max-h-[60vh]">
              <div className="space-y-4 mb-6">
                <div className="flex gap-3">
                  <textarea
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    placeholder="Add a new note..."
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows={3}
                  />
                  <button
                    onClick={handleAddNote}
                    disabled={!newNote.trim()}
                    className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed h-fit"
                  >
                    Add
                  </button>
                </div>
              </div>
              <div className="space-y-3">
                {notes.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">No notes yet. Add your first note above.</p>
                ) : (
                  notes.map((note) => (
                    <div key={note.id} className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <p className="text-sm text-gray-600">
                          {new Date(note.createdAt).toLocaleDateString()}
                        </p>
                        <button
                          onClick={() => handleDeleteNote(note.id)}
                          className="text-red-500 hover:text-red-700 text-sm"
                        >
                          Delete
                        </button>
                      </div>
                      <p className="text-gray-800">{note.content}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Order History Modal */}
      {showOrderHistoryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl mx-4 max-h-[80vh] overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-800">Order History</h3>
                <button
                  onClick={() => setShowOrderHistoryModal(false)}
                  className="p-1 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="p-6 overflow-y-auto max-h-[60vh]">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 text-sm font-medium text-gray-500">Order Number</th>
                      <th className="text-left py-3 text-sm font-medium text-gray-500">Date</th>
                      <th className="text-left py-3 text-sm font-medium text-gray-500">Items</th>
                      <th className="text-left py-3 text-sm font-medium text-gray-500">Total</th>
                      <th className="text-left py-3 text-sm font-medium text-gray-500">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orderHistory.map((order) => (
                      <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-4 text-sm font-medium text-gray-900">{order.orderNumber}</td>
                        <td className="py-4 text-sm text-gray-600">{order.date}</td>
                        <td className="py-4 text-sm text-gray-600">{order.items} items</td>
                        <td className="py-4 text-sm font-medium text-gray-900">{order.total}</td>
                        <td className="py-4">
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                            order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {order.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Help Modal */}
      {showHelpModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4 max-h-[80vh] overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-800">Help & Support</h3>
                <button
                  onClick={() => setShowHelpModal(false)}
                  className="p-1 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="p-6 overflow-y-auto max-h-[60vh]">
              <div className="space-y-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Frequently Asked Questions</h4>
                  <div className="space-y-3">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h5 className="font-medium text-gray-800 mb-2">How do I create a new project?</h5>
                      <p className="text-sm text-gray-600">Click the "Create a new project" button on your dashboard or in the sidebar to get started.</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h5 className="font-medium text-gray-800 mb-2">How do I add products to my boards?</h5>
                      <p className="text-sm text-gray-600">Navigate to the Products page, find items you like, and click "Add to cart" or use the product detail view.</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h5 className="font-medium text-gray-800 mb-2">Can I share my boards with others?</h5>
                      <p className="text-sm text-gray-600">Board sharing features are coming soon. Stay tuned for updates!</p>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Contact Support</h4>
                  <div className="space-y-3">
                    <p className="text-sm text-gray-600">Need additional help? Reach out to our support team:</p>
                    <div className="flex gap-4">
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">
                        Email Support
                      </button>
                      <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-sm">
                        Live Chat
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
