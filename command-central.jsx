import React, { useState, useMemo } from 'react';
import { 
  LayoutDashboard, FolderKanban, Calendar, BarChart3, Clock, Users, 
  Settings, Bell, Search, Plus, ChevronDown, ChevronRight,
  CheckCircle2, Circle, AlertCircle, MessageSquare,
  Grid3X3, List, Target, ArrowRight, Play, Eye, ChevronLeft, X,
  Mail, Phone, MoreHorizontal, Shield, CreditCard, Key, Building2,
  Lock, UserCog, Database, Globe, Trash2, Edit3, ToggleLeft, ToggleRight,
  Download, FileText, Upload, UserPlus, Copy, Check
} from 'lucide-react';

const PRIORITIES = {
  critical: { color: '#f43f5e', bg: 'rgba(244, 63, 94, 0.15)', label: 'Critical' },
  high: { color: '#f59e0b', bg: 'rgba(245, 158, 11, 0.15)', label: 'High' },
  medium: { color: '#00d4ff', bg: 'rgba(0, 212, 255, 0.15)', label: 'Medium' },
  low: { color: '#10b981', bg: 'rgba(16, 185, 129, 0.15)', label: 'Low' },
};

const STATUSES = {
  todo: { color: '#94a3b8', label: 'To Do' },
  in_progress: { color: '#00d4ff', label: 'In Progress' },
  review: { color: '#f59e0b', label: 'In Review' },
  completed: { color: '#10b981', label: 'Completed' },
  blocked: { color: '#f43f5e', label: 'Blocked' },
};

const projects = [
  { id: 1, name: 'Website Redesign', color: '#00d4ff', progress: 67, tasks: 24, completed: 16 },
  { id: 2, name: 'Mobile App Launch', color: '#f59e0b', progress: 45, tasks: 32, completed: 14 },
  { id: 3, name: 'Q4 Marketing Campaign', color: '#10b981', progress: 82, tasks: 18, completed: 15 },
  { id: 4, name: 'Infrastructure Upgrade', color: '#8b5cf6', progress: 30, tasks: 12, completed: 4 },
];

const tasks = [
  { id: 1, title: 'Implement user authentication flow', description: 'Set up JWT authentication with WordPress integration', status: 'in_progress', priority: 'high', project: 'Website Redesign', assignee: 'SC', dueDate: '2025-11-28', comments: 5, subtasks: { total: 4, completed: 2 } },
  { id: 2, title: 'Design dashboard wireframes', description: 'Create high-fidelity wireframes for the main dashboard view', status: 'review', priority: 'medium', project: 'Website Redesign', assignee: 'MJ', dueDate: '2025-11-24', comments: 12, subtasks: { total: 6, completed: 6 } },
  { id: 3, title: 'Set up CI/CD pipeline', description: 'Configure GitHub Actions for automated testing and deployment', status: 'todo', priority: 'critical', project: 'Infrastructure Upgrade', assignee: 'AK', dueDate: '2025-11-30', comments: 3, subtasks: { total: 8, completed: 0 } },
  { id: 4, title: 'Write API documentation', description: 'Document all REST endpoints with examples', status: 'completed', priority: 'medium', project: 'Website Redesign', assignee: 'SC', dueDate: '2025-11-21', comments: 2, subtasks: { total: 3, completed: 3 } },
  { id: 5, title: 'Social media content calendar', description: 'Plan and schedule Q4 social media posts', status: 'in_progress', priority: 'high', project: 'Q4 Marketing Campaign', assignee: 'JL', dueDate: '2025-12-01', comments: 8, subtasks: { total: 12, completed: 7 } },
  { id: 6, title: 'Mobile app beta testing', description: 'Coordinate beta testing with selected user group', status: 'blocked', priority: 'critical', project: 'Mobile App Launch', assignee: 'MJ', dueDate: '2025-11-25', comments: 15, subtasks: { total: 5, completed: 2 } },
];

const events = [
  { id: 1, title: 'Sprint Planning', time: '09:00', duration: 60 },
  { id: 2, title: 'Design Review', time: '14:00', duration: 45 },
  { id: 3, title: 'Team Standup', time: '10:00', duration: 15 },
];

const teamMembers = [
  { id: 1, initials: 'JD', name: 'John Doe', role: 'Project Manager', email: 'john.doe@markitek.com', status: 'online', color: 'from-amber-500 to-amber-600', permissions: ['admin', 'projects', 'team', 'reports', 'billing'], assignedProjects: [1, 2, 3, 4] },
  { id: 2, initials: 'SC', name: 'Sarah Chen', role: 'Senior Developer', email: 'sarah.chen@markitek.com', status: 'online', color: 'from-cyan-500 to-cyan-600', permissions: ['projects', 'tasks', 'time-tracking', 'code-review'], assignedProjects: [1, 4] },
  { id: 3, initials: 'MJ', name: 'Mike Johnson', role: 'UI/UX Designer', email: 'mike.johnson@markitek.com', status: 'away', color: 'from-violet-500 to-violet-600', permissions: ['projects', 'tasks', 'design-assets', 'prototypes'], assignedProjects: [1, 2] },
  { id: 4, initials: 'AK', name: 'Anna Kim', role: 'DevOps Engineer', email: 'anna.kim@markitek.com', status: 'online', color: 'from-emerald-500 to-emerald-600', permissions: ['admin', 'projects', 'deployments', 'infrastructure', 'monitoring'], assignedProjects: [4] },
  { id: 5, initials: 'JL', name: 'James Lee', role: 'Marketing Lead', email: 'james.lee@markitek.com', status: 'offline', color: 'from-rose-500 to-rose-600', permissions: ['projects', 'tasks', 'campaigns', 'analytics', 'content'], assignedProjects: [3] },
];

const PERMISSIONS = {
  'admin': { label: 'Admin', color: '#f43f5e', description: 'Full system access' },
  'projects': { label: 'Projects', color: '#00d4ff', description: 'Create and manage projects' },
  'team': { label: 'Team', color: '#8b5cf6', description: 'Manage team members' },
  'reports': { label: 'Reports', color: '#f59e0b', description: 'View and export reports' },
  'billing': { label: 'Billing', color: '#ec4899', description: 'Access billing and invoices' },
  'tasks': { label: 'Tasks', color: '#10b981', description: 'Create and assign tasks' },
  'time-tracking': { label: 'Time Tracking', color: '#06b6d4', description: 'Log and view time entries' },
  'code-review': { label: 'Code Review', color: '#6366f1', description: 'Review and approve code' },
  'design-assets': { label: 'Design Assets', color: '#a855f7', description: 'Upload and manage designs' },
  'prototypes': { label: 'Prototypes', color: '#d946ef', description: 'Create interactive prototypes' },
  'deployments': { label: 'Deployments', color: '#14b8a6', description: 'Deploy to environments' },
  'infrastructure': { label: 'Infrastructure', color: '#64748b', description: 'Manage servers and services' },
  'monitoring': { label: 'Monitoring', color: '#eab308', description: 'View system health and logs' },
  'campaigns': { label: 'Campaigns', color: '#f97316', description: 'Manage marketing campaigns' },
  'analytics': { label: 'Analytics', color: '#3b82f6', description: 'View marketing analytics' },
  'content': { label: 'Content', color: '#84cc16', description: 'Create and publish content' },
};

const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  const today = new Date();
  if (date.toDateString() === today.toDateString()) return 'Today';
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

const getDaysUntil = (dateStr) => {
  const date = new Date(dateStr);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return Math.ceil((date - today) / (1000 * 60 * 60 * 24));
};

// FilterBar
const FilterBar = ({ filters, setFilters, showViewToggle, viewMode, setViewMode }) => {
  return (
    <div className="flex items-center gap-3 p-4 bg-slate-900/50 border-b border-white/10 flex-wrap">
      <div className="relative flex-1 min-w-[160px] max-w-[240px]">
        <Search size={16} strokeWidth={1.5} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
        <input
          type="text"
          placeholder="Search tasks..."
          value={filters.search}
          onChange={(e) => setFilters({ ...filters, search: e.target.value })}
          className="w-full py-2 pl-9 pr-3 bg-slate-800 border border-slate-700 rounded-lg text-white text-sm outline-none focus:border-cyan-500"
        />
      </div>

      <select 
        value={filters.status} 
        onChange={(e) => setFilters({ ...filters, status: e.target.value })}
        className="bg-slate-800 text-white border border-slate-700 rounded-lg px-3 py-2 text-sm outline-none"
      >
        <option value="">All Statuses</option>
        {Object.entries(STATUSES).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
      </select>

      <select 
        value={filters.priority} 
        onChange={(e) => setFilters({ ...filters, priority: e.target.value })}
        className="bg-slate-800 text-white border border-slate-700 rounded-lg px-3 py-2 text-sm outline-none"
      >
        <option value="">All Priorities</option>
        {Object.entries(PRIORITIES).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
      </select>

      <select 
        value={filters.project} 
        onChange={(e) => setFilters({ ...filters, project: e.target.value })}
        className="bg-slate-800 text-white border border-slate-700 rounded-lg px-3 py-2 text-sm outline-none"
      >
        <option value="">All Projects</option>
        {projects.map(p => <option key={p.id} value={p.name}>{p.name}</option>)}
      </select>

      {(filters.search || filters.status || filters.priority || filters.project) && (
        <button 
          onClick={() => setFilters({ search: '', status: '', priority: '', project: '' })}
          className="flex items-center gap-1 px-3 py-2 bg-rose-500/20 border border-rose-500/30 rounded-lg text-rose-400 text-sm"
        >
          <X size={14} strokeWidth={1.5} /> Clear
        </button>
      )}

      <div className="flex-1" />

      {showViewToggle && (
        <div className="flex bg-slate-800 rounded-lg p-1">
          <button 
            onClick={() => setViewMode('list')}
            className={`p-2 rounded ${viewMode === 'list' ? 'bg-cyan-500/20 text-cyan-400' : 'text-slate-400'}`}
          >
            <List size={16} strokeWidth={1.5} />
          </button>
          <button 
            onClick={() => setViewMode('board')}
            className={`p-2 rounded ${viewMode === 'board' ? 'bg-cyan-500/20 text-cyan-400' : 'text-slate-400'}`}
          >
            <Grid3X3 size={16} strokeWidth={1.5} />
          </button>
        </div>
      )}
    </div>
  );
};

// Sidebar
const Sidebar = ({ activeView, setActiveView, collapsed, setCollapsed }) => {
  const navItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'tasks', icon: CheckCircle2, label: 'My Tasks' },
    { id: 'projects', icon: FolderKanban, label: 'Projects' },
    { id: 'calendar', icon: Calendar, label: 'Calendar' },
    { id: 'reports', icon: BarChart3, label: 'Reports' },
    { id: 'time', icon: Clock, label: 'Time Tracking' },
    { id: 'team', icon: Users, label: 'Team' },
    { id: 'admin', icon: Settings, label: 'Admin' },
  ];

  return (
    <aside className={`${collapsed ? 'w-16' : 'w-60'} bg-slate-950 border-r border-slate-800 flex flex-col transition-all duration-300 relative flex-shrink-0`}>
      <div className={`${collapsed ? 'px-3' : 'px-4'} py-4 border-b border-slate-800 flex items-center gap-3`}>
        <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-cyan-400 to-cyan-600 flex items-center justify-center flex-shrink-0">
          <Target size={20} strokeWidth={1.5} className="text-white" />
        </div>
        {!collapsed && (
          <div>
            <div className="text-sm font-bold text-white">Command Central</div>
            <div className="text-[10px] text-slate-500 uppercase">MarkiTek Labs</div>
          </div>
        )}
      </div>

      <nav className="p-2 flex-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id)}
              className={`w-full flex items-center gap-3 ${collapsed ? 'justify-center' : ''} px-3 py-2.5 mb-1 rounded-lg transition-all ${isActive ? 'bg-cyan-500/15 text-cyan-400' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
            >
              <Icon size={18} strokeWidth={1.5} />
              {!collapsed && <span className="text-sm">{item.label}</span>}
            </button>
          );
        })}
      </nav>

      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-16 w-6 h-6 rounded-full bg-slate-800 border border-slate-700 text-slate-400 flex items-center justify-center"
      >
        {collapsed ? <ChevronRight size={12} strokeWidth={1.5} /> : <ChevronLeft size={12} strokeWidth={1.5} />}
      </button>

      <div className={`${collapsed ? 'px-3 justify-center' : 'px-4'} py-3 border-t border-slate-800 flex items-center gap-3`}>
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">JD</div>
        {!collapsed && (
          <div className="flex-1 overflow-hidden">
            <div className="text-sm text-white truncate">John Doe</div>
            <div className="text-xs text-slate-500 truncate">Project Manager</div>
          </div>
        )}
      </div>
    </aside>
  );
};

// Header
const Header = ({ activeView }) => {
  const titles = { dashboard: 'Dashboard', tasks: 'My Tasks', projects: 'Projects', calendar: 'Calendar', reports: 'Reports', time: 'Time Tracking', team: 'Team', admin: 'Admin Settings' };
  return (
    <header className="h-16 bg-slate-900/80 border-b border-slate-800 flex items-center justify-between px-6">
      <h1 className="text-xl font-bold text-white">{titles[activeView]}</h1>
      <div className="flex items-center gap-2">
        <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-cyan-600 rounded-lg text-white text-sm font-semibold">
          <Plus size={16} strokeWidth={1.5} /> New Task
        </button>
        <button className="w-10 h-10 rounded-lg bg-slate-800 border border-slate-700 text-slate-400 flex items-center justify-center relative">
          <Bell size={18} strokeWidth={1.5} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full" />
        </button>
      </div>
    </header>
  );
};

// TaskCard
const TaskCard = ({ task }) => {
  const priority = PRIORITIES[task.priority];
  const daysUntil = getDaysUntil(task.dueDate);
  const isOverdue = daysUntil < 0;

  return (
    <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4 hover:border-cyan-500/50 transition-all">
      <div className="flex items-center gap-2 mb-3">
        <span className="px-2 py-0.5 rounded text-[10px] font-semibold uppercase" style={{ background: priority.bg, color: priority.color }}>{priority.label}</span>
      </div>
      <h3 className="text-sm font-semibold text-white mb-2">{task.title}</h3>
      <p className="text-xs text-slate-400 mb-3 line-clamp-2">{task.description}</p>
      
      {task.subtasks.total > 0 && (
        <div className="mb-3">
          <div className="flex justify-between mb-1 text-[10px] text-slate-500">
            <span>Progress</span>
            <span>{task.subtasks.completed}/{task.subtasks.total}</span>
          </div>
          <div className="h-1 bg-slate-700 rounded-full overflow-hidden">
            <div className="h-full bg-cyan-500 rounded-full" style={{ width: `${(task.subtasks.completed / task.subtasks.total) * 100}%` }} />
          </div>
        </div>
      )}

      <div className="flex items-center justify-between pt-3 border-t border-slate-700">
        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-cyan-500 to-cyan-600 flex items-center justify-center text-white text-[10px] font-bold">{task.assignee}</div>
        <div className="flex items-center gap-3 text-xs text-slate-500">
          <span className="flex items-center gap-1"><MessageSquare size={12} strokeWidth={1.5} />{task.comments}</span>
          <span className={`flex items-center gap-1 ${isOverdue ? 'text-rose-400' : ''}`}>
            <Calendar size={12} strokeWidth={1.5} />{formatDate(task.dueDate)}
          </span>
        </div>
      </div>
    </div>
  );
};

// Dashboard
const DashboardView = ({ setActiveView }) => {
  const [filters, setFilters] = useState({ search: '', status: '', priority: '', project: '' });
  
  const filteredTasks = useMemo(() => {
    return tasks.filter(t => {
      if (filters.search && !t.title.toLowerCase().includes(filters.search.toLowerCase())) return false;
      if (filters.status && t.status !== filters.status) return false;
      if (filters.priority && t.priority !== filters.priority) return false;
      if (filters.project && t.project !== filters.project) return false;
      return true;
    });
  }, [filters]);
  
  const upcomingTasks = filteredTasks.filter(t => t.status !== 'completed').slice(0, 4);
  const stats = {
    active: filteredTasks.filter(t => t.status !== 'completed').length,
    inProgress: filteredTasks.filter(t => t.status === 'in_progress').length,
    blocked: filteredTasks.filter(t => t.status === 'blocked').length,
  };

  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

  return (
    <div className="flex flex-col h-full">
      <FilterBar filters={filters} setFilters={setFilters} showViewToggle={false} />
      
      <div className="p-6 flex-1 overflow-auto">
        <div className="mb-6">
          <p className="text-slate-500 text-sm">{today}</p>
          <h2 className="text-2xl font-bold text-white">Good morning, John! 👋</h2>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6">
          {[
            { label: 'Active Tasks', value: stats.active, color: '#00d4ff', Icon: CheckCircle2 },
            { label: 'In Progress', value: stats.inProgress, color: '#f59e0b', Icon: Play },
            { label: 'Blocked', value: stats.blocked, color: '#f43f5e', Icon: AlertCircle },
          ].map((s, i) => (
            <div key={i} className="rounded-xl p-4 flex items-center gap-4 border" style={{ background: `${s.color}10`, borderColor: `${s.color}30` }}>
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: `${s.color}20` }}>
                <s.Icon size={20} strokeWidth={1.5} style={{ color: s.color }} />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">{s.value}</div>
                <div className="text-xs text-slate-400">{s.label}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2">
            <div className="bg-slate-900/50 border border-slate-800 rounded-xl overflow-hidden mb-6">
              <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between">
                <h3 className="text-sm font-semibold text-white">
                  Upcoming Tasks
                  {(filters.search || filters.status || filters.priority || filters.project) && (
                    <span className="ml-2 text-xs text-slate-500 font-normal">({filteredTasks.length} filtered)</span>
                  )}
                </h3>
                <button onClick={() => setActiveView('tasks')} className="text-cyan-400 text-xs font-medium flex items-center gap-1">
                  View All <ArrowRight size={12} strokeWidth={1.5} />
                </button>
              </div>
              <div className="grid grid-cols-2 gap-4 p-4">
                {upcomingTasks.length > 0 ? (
                  upcomingTasks.map(task => <TaskCard key={task.id} task={task} />)
                ) : (
                  <div className="col-span-2 text-center py-8 text-slate-500 text-sm">No tasks match your filters</div>
                )}
              </div>
            </div>

            <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-white">Project Progress</h3>
                <button onClick={() => setActiveView('reports')} className="text-cyan-400 text-xs font-medium flex items-center gap-1">
                  View Reports <ArrowRight size={12} strokeWidth={1.5} />
                </button>
              </div>
              <div className="space-y-4">
                {projects.map(p => (
                  <div key={p.id}>
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full" style={{ background: p.color }} />
                        <span className="text-white text-sm">{p.name}</span>
                      </div>
                      <span className="text-slate-500 text-xs">{p.completed}/{p.tasks}</span>
                    </div>
                    <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${p.progress}%`, background: p.color }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-5 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-white">Today's Schedule</h3>
                <button onClick={() => setActiveView('calendar')} className="text-cyan-400 text-xs font-medium">Calendar</button>
              </div>
              <div className="space-y-3">
                {events.map(e => (
                  <div key={e.id} className="flex items-start gap-3 p-3 bg-slate-800/50 rounded-lg border-l-2 border-cyan-500">
                    <div className="text-xs text-slate-500 min-w-[40px]">{e.time}</div>
                    <div>
                      <div className="text-sm text-white">{e.title}</div>
                      <div className="text-xs text-slate-500">{e.duration} min</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Tasks View
const TasksView = () => {
  const [viewMode, setViewMode] = useState('board');
  const [filters, setFilters] = useState({ search: '', status: '', priority: '', project: '' });

  const filteredTasks = useMemo(() => {
    return tasks.filter(t => {
      if (filters.search && !t.title.toLowerCase().includes(filters.search.toLowerCase())) return false;
      if (filters.status && t.status !== filters.status) return false;
      if (filters.priority && t.priority !== filters.priority) return false;
      if (filters.project && t.project !== filters.project) return false;
      return true;
    });
  }, [filters]);

  const tasksByStatus = Object.fromEntries(
    Object.keys(STATUSES).map(k => [k, filteredTasks.filter(t => t.status === k)])
  );

  return (
    <div className="flex flex-col h-full">
      <FilterBar filters={filters} setFilters={setFilters} showViewToggle={true} viewMode={viewMode} setViewMode={setViewMode} />
      
      <div className="p-6 flex-1 overflow-auto">
        <div className="mb-4 text-slate-500 text-sm">{filteredTasks.length} tasks found</div>

        {viewMode === 'board' ? (
          <div className="grid grid-cols-5 gap-4">
            {Object.entries(STATUSES).map(([key, status]) => (
              <div key={key} className="bg-slate-900/30 rounded-xl p-3 min-h-[300px]">
                <div className="flex items-center justify-between mb-3 pb-2 border-b-2" style={{ borderBottomColor: status.color }}>
                  <span className="text-white text-sm font-semibold">{status.label}</span>
                  <span className="bg-slate-800 px-2 py-0.5 rounded text-slate-400 text-xs">{tasksByStatus[key].length}</span>
                </div>
                <div className="space-y-3">
                  {tasksByStatus[key].map(t => <TaskCard key={t.id} task={t} />)}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-slate-900/50 border border-slate-800 rounded-xl overflow-hidden">
            <div className="grid grid-cols-[1fr_100px_80px_100px] gap-4 px-4 py-2 bg-slate-800/50 text-xs text-slate-500 uppercase font-semibold">
              <span>Task</span>
              <span>Priority</span>
              <span>Assignee</span>
              <span>Due Date</span>
            </div>
            {filteredTasks.map(t => (
              <div key={t.id} className="grid grid-cols-[1fr_100px_80px_100px] gap-4 px-4 py-3 border-t border-slate-800 hover:bg-slate-800/30">
                <div>
                  <div className="text-sm text-white">{t.title}</div>
                  <div className="text-xs text-slate-500">{t.project}</div>
                </div>
                <span className="px-2 py-1 rounded text-[10px] font-semibold h-fit" style={{ background: PRIORITIES[t.priority].bg, color: PRIORITIES[t.priority].color }}>{PRIORITIES[t.priority].label}</span>
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-cyan-500 to-cyan-600 flex items-center justify-center text-white text-[10px] font-bold">{t.assignee}</div>
                <span className="text-sm text-slate-400">{formatDate(t.dueDate)}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// Team View
const TeamView = () => {
  const [selectedMember, setSelectedMember] = useState(null);
  const [viewMode, setViewMode] = useState('grid');

  const getMemberTasks = (initials) => tasks.filter(t => t.assignee === initials);
  
  const getMemberStats = (initials) => {
    const memberTasks = getMemberTasks(initials);
    return {
      total: memberTasks.length,
      completed: memberTasks.filter(t => t.status === 'completed').length,
      inProgress: memberTasks.filter(t => t.status === 'in_progress').length,
      blocked: memberTasks.filter(t => t.status === 'blocked').length,
    };
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'online': return '#10b981';
      case 'away': return '#f59e0b';
      case 'offline': return '#64748b';
      default: return '#64748b';
    }
  };

  const MemberCard = ({ member }) => {
    const stats = getMemberStats(member.initials);
    const workload = stats.total > 0 ? Math.min((stats.inProgress / 5) * 100, 100) : 0;
    
    return (
      <div 
        onClick={() => setSelectedMember(member)}
        className="bg-slate-900/50 border border-slate-800 rounded-xl p-5 hover:border-cyan-500/50 transition-all cursor-pointer"
      >
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${member.color} flex items-center justify-center text-white font-bold`}>
                {member.initials}
              </div>
              <div 
                className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full border-2 border-slate-900"
                style={{ background: getStatusColor(member.status) }}
              />
            </div>
            <div>
              <h3 className="text-white font-semibold">{member.name}</h3>
              <p className="text-xs text-slate-500">{member.role}</p>
            </div>
          </div>
          <button className="p-1.5 hover:bg-slate-800 rounded-lg text-slate-500 hover:text-white transition-colors">
            <MoreHorizontal size={16} strokeWidth={1.5} />
          </button>
        </div>

        <div className="mb-4">
          <div className="flex justify-between mb-2">
            <span className="text-xs text-slate-500">Workload</span>
            <span className={`text-xs font-semibold ${workload > 80 ? 'text-rose-400' : workload > 50 ? 'text-amber-400' : 'text-cyan-400'}`}>
              {stats.inProgress} active
            </span>
          </div>
          <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
            <div 
              className={`h-full rounded-full transition-all ${workload > 80 ? 'bg-rose-500' : workload > 50 ? 'bg-amber-500' : 'bg-cyan-500'}`}
              style={{ width: `${workload}%` }} 
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-800">
          <div className="text-center">
            <div className="text-lg font-bold text-white">{stats.total}</div>
            <div className="text-[10px] text-slate-500">Total</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-cyan-400">{stats.inProgress}</div>
            <div className="text-[10px] text-slate-500">Active</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-emerald-400">{stats.completed}</div>
            <div className="text-[10px] text-slate-500">Done</div>
          </div>
        </div>

        {stats.blocked > 0 && (
          <div className="mt-3 px-2 py-1.5 bg-rose-500/10 border border-rose-500/20 rounded-lg flex items-center gap-2">
            <AlertCircle size={12} className="text-rose-400" />
            <span className="text-xs text-rose-400">{stats.blocked} blocked</span>
          </div>
        )}

        <div className="mt-3 pt-3 border-t border-slate-800">
          <div className="text-[10px] text-slate-500 mb-2">Permissions</div>
          <div className="flex flex-wrap gap-1">
            {member.permissions.slice(0, 3).map(perm => (
              <span 
                key={perm}
                className="px-1.5 py-0.5 rounded text-[9px] font-medium"
                style={{ 
                  background: `${PERMISSIONS[perm]?.color}15`, 
                  color: PERMISSIONS[perm]?.color 
                }}
              >
                {PERMISSIONS[perm]?.label}
              </span>
            ))}
            {member.permissions.length > 3 && (
              <span className="px-1.5 py-0.5 rounded text-[9px] font-medium bg-slate-800 text-slate-400">
                +{member.permissions.length - 3}
              </span>
            )}
          </div>
        </div>
      </div>
    );
  };

  const MemberDetail = ({ member, onBack }) => {
    const stats = getMemberStats(member.initials);
    const memberTasks = getMemberTasks(member.initials);

    return (
      <div className="flex flex-col h-full">
        <div className="p-4 bg-slate-900/50 border-b border-white/10 flex items-center gap-4">
          <button onClick={onBack} className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors">
            <ChevronLeft size={20} strokeWidth={1.5} />
          </button>
          <div className="flex items-center gap-3 flex-1">
            <div className="relative">
              <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${member.color} flex items-center justify-center text-white font-bold`}>
                {member.initials}
              </div>
              <div 
                className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full border-2 border-slate-900"
                style={{ background: getStatusColor(member.status) }}
              />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">{member.name}</h2>
              <p className="text-xs text-slate-500">{member.role}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-400 hover:text-white hover:border-slate-600 transition-colors">
              <Mail size={18} strokeWidth={1.5} />
            </button>
            <button className="p-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-400 hover:text-white hover:border-slate-600 transition-colors">
              <MessageSquare size={18} strokeWidth={1.5} />
            </button>
          </div>
        </div>

        <div className="p-6 flex-1 overflow-auto">
          <div className="grid grid-cols-3 gap-6 mb-6">
            <div className="col-span-2">
              <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-5 mb-6">
                <h3 className="text-sm font-semibold text-white mb-4">Contact Information</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400">
                      <Mail size={14} strokeWidth={1.5} />
                    </div>
                    <div>
                      <div className="text-xs text-slate-500">Email</div>
                      <div className="text-sm text-white">{member.email}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400">
                      <Users size={14} strokeWidth={1.5} />
                    </div>
                    <div>
                      <div className="text-xs text-slate-500">Department</div>
                      <div className="text-sm text-white">{member.role.includes('Developer') || member.role.includes('DevOps') ? 'Engineering' : member.role.includes('Design') ? 'Design' : member.role.includes('Marketing') ? 'Marketing' : 'Management'}</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-5 mb-6">
                <h3 className="text-sm font-semibold text-white mb-4">Permissions & Access</h3>
                <div className="grid grid-cols-2 gap-2">
                  {member.permissions.map(perm => (
                    <div 
                      key={perm}
                      className="flex items-center gap-3 p-2.5 rounded-lg border"
                      style={{ 
                        background: `${PERMISSIONS[perm]?.color}08`,
                        borderColor: `${PERMISSIONS[perm]?.color}25`
                      }}
                    >
                      <div 
                        className="w-2 h-2 rounded-full flex-shrink-0"
                        style={{ background: PERMISSIONS[perm]?.color }}
                      />
                      <div className="min-w-0">
                        <div className="text-sm text-white font-medium">{PERMISSIONS[perm]?.label}</div>
                        <div className="text-[10px] text-slate-500 truncate">{PERMISSIONS[perm]?.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-slate-900/50 border border-slate-800 rounded-xl overflow-hidden">
                <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-white">Assigned Tasks</h3>
                  <span className="text-xs text-slate-500">{memberTasks.length} tasks</span>
                </div>
                <div className="divide-y divide-slate-800">
                  {memberTasks.length > 0 ? memberTasks.map(task => (
                    <div key={task.id} className="px-5 py-4 hover:bg-slate-800/30 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div 
                            className="w-2 h-2 rounded-full" 
                            style={{ background: STATUSES[task.status].color }}
                          />
                          <div>
                            <h4 className={`text-sm font-medium ${task.status === 'completed' ? 'text-slate-500 line-through' : 'text-white'}`}>
                              {task.title}
                            </h4>
                            <p className="text-xs text-slate-500">{task.project}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span 
                            className="px-2 py-0.5 rounded text-[10px] font-semibold" 
                            style={{ background: PRIORITIES[task.priority].bg, color: PRIORITIES[task.priority].color }}
                          >
                            {PRIORITIES[task.priority].label}
                          </span>
                          <span className="text-xs text-slate-500">{formatDate(task.dueDate)}</span>
                        </div>
                      </div>
                    </div>
                  )) : (
                    <div className="px-5 py-8 text-center text-slate-500 text-sm">No tasks assigned</div>
                  )}
                </div>
              </div>
            </div>

            <div>
              <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-5 mb-6">
                <h3 className="text-sm font-semibold text-white mb-4">Task Summary</h3>
                <div className="space-y-3">
                  {[
                    { label: 'Total Tasks', value: stats.total, color: '#00d4ff' },
                    { label: 'In Progress', value: stats.inProgress, color: '#f59e0b' },
                    { label: 'Completed', value: stats.completed, color: '#10b981' },
                    { label: 'Blocked', value: stats.blocked, color: '#f43f5e' },
                  ].map((stat, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <span className="text-sm text-slate-400">{stat.label}</span>
                      <span className="text-sm font-bold" style={{ color: stat.color }}>{stat.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-5">
                <h3 className="text-sm font-semibold text-white mb-4">Projects</h3>
                <div className="space-y-2">
                  {[...new Set(memberTasks.map(t => t.project))].map((project, i) => {
                    const projectData = projects.find(p => p.name === project);
                    return (
                      <div key={i} className="flex items-center gap-2 p-2 bg-slate-800/50 rounded-lg">
                        <div className="w-2 h-2 rounded-full" style={{ background: projectData?.color || '#00d4ff' }} />
                        <span className="text-sm text-white">{project}</span>
                      </div>
                    );
                  })}
                  {memberTasks.length === 0 && (
                    <div className="text-sm text-slate-500">No projects</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (selectedMember) {
    return <MemberDetail member={selectedMember} onBack={() => setSelectedMember(null)} />;
  }

  const onlineCount = teamMembers.filter(m => m.status === 'online').length;
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.status === 'completed').length;

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-4 bg-slate-900/50 border-b border-white/10">
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search size={16} strokeWidth={1.5} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="Search team members..."
              className="py-2 pl-9 pr-3 bg-slate-800 border border-slate-700 rounded-lg text-white text-sm outline-none focus:border-cyan-500 w-64"
            />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex bg-slate-800 rounded-lg p-1">
            <button 
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded ${viewMode === 'grid' ? 'bg-cyan-500/20 text-cyan-400' : 'text-slate-400'}`}
            >
              <Grid3X3 size={16} strokeWidth={1.5} />
            </button>
            <button 
              onClick={() => setViewMode('list')}
              className={`p-2 rounded ${viewMode === 'list' ? 'bg-cyan-500/20 text-cyan-400' : 'text-slate-400'}`}
            >
              <List size={16} strokeWidth={1.5} />
            </button>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-cyan-600 rounded-lg text-white text-sm font-semibold">
            <Plus size={16} strokeWidth={1.5} /> Invite Member
          </button>
        </div>
      </div>

      <div className="p-6 flex-1 overflow-auto">
        <div className="grid grid-cols-4 gap-4 mb-6">
          {[
            { label: 'Team Members', value: teamMembers.length, color: '#00d4ff', Icon: Users },
            { label: 'Online Now', value: onlineCount, color: '#10b981', Icon: Circle },
            { label: 'Total Tasks', value: totalTasks, color: '#f59e0b', Icon: CheckCircle2 },
            { label: 'Completed', value: completedTasks, color: '#8b5cf6', Icon: Target },
          ].map((stat, i) => (
            <div key={i} className="rounded-xl p-4 flex items-center gap-4 border" style={{ background: `${stat.color}10`, borderColor: `${stat.color}30` }}>
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: `${stat.color}20` }}>
                <stat.Icon size={20} strokeWidth={1.5} style={{ color: stat.color }} />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-xs text-slate-400">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>

        {viewMode === 'grid' ? (
          <div className="grid grid-cols-3 gap-4">
            {teamMembers.map(member => (
              <MemberCard key={member.id} member={member} />
            ))}
          </div>
        ) : (
          <div className="bg-slate-900/50 border border-slate-800 rounded-xl overflow-hidden">
            <div className="flex items-center px-4 py-3 bg-slate-800/50 text-xs text-slate-500 uppercase font-semibold">
              <div className="flex-1 min-w-[200px]">Member</div>
              <div className="w-36">Role</div>
              <div className="w-24">Status</div>
              <div className="w-28">Tasks</div>
              <div className="w-20">Actions</div>
            </div>
            {teamMembers.map(member => {
              const stats = getMemberStats(member.initials);
              return (
                <div 
                  key={member.id} 
                  onClick={() => setSelectedMember(member)}
                  className="flex items-center px-4 py-3 border-t border-slate-800 hover:bg-slate-800/30 cursor-pointer"
                >
                  <div className="flex-1 min-w-[200px] flex items-center gap-3">
                    <div className="relative flex-shrink-0">
                      <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${member.color} flex items-center justify-center text-white text-xs font-bold`}>
                        {member.initials}
                      </div>
                      <div 
                        className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-slate-900"
                        style={{ background: getStatusColor(member.status) }}
                      />
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm text-white font-medium truncate">{member.name}</div>
                      <div className="text-xs text-slate-500 truncate">{member.email}</div>
                    </div>
                  </div>
                  <div className="w-36 text-sm text-slate-400 truncate">{member.role}</div>
                  <div className="w-24 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: getStatusColor(member.status) }} />
                    <span className="text-sm text-slate-400 capitalize">{member.status}</span>
                  </div>
                  <div className="w-28 flex items-center gap-2">
                    <span className="text-sm text-white font-medium">{stats.total}</span>
                    <span className="text-xs text-slate-500">({stats.inProgress} active)</span>
                  </div>
                  <div className="w-20 flex items-center gap-1">
                    <button 
                      onClick={(e) => e.stopPropagation()}
                      className="p-1.5 hover:bg-slate-700 rounded text-slate-400 hover:text-white"
                    >
                      <Mail size={14} strokeWidth={1.5} />
                    </button>
                    <button 
                      onClick={(e) => e.stopPropagation()}
                      className="p-1.5 hover:bg-slate-700 rounded text-slate-400 hover:text-white"
                    >
                      <MessageSquare size={14} strokeWidth={1.5} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

// Admin View
const AdminView = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [userAccessData, setUserAccessData] = useState(
    teamMembers.map(m => ({ ...m, enabled: true, lastLogin: '2025-11-22' }))
  );

  const tabs = [
    { id: 'general', label: 'General', icon: Settings },
    { id: 'billing', label: 'Billing', icon: CreditCard },
    { id: 'users', label: 'User Access', icon: UserCog },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'integrations', label: 'Integrations', icon: Globe },
  ];

  const toggleUserAccess = (userId) => {
    setUserAccessData(prev => 
      prev.map(u => u.id === userId ? { ...u, enabled: !u.enabled } : u)
    );
  };

  const GeneralSettings = () => {
    const [orgName, setOrgName] = useState('MarkiTek Labs');
    const [subdomain, setSubdomain] = useState('markitek');
    const [timezone, setTimezone] = useState('America/Chicago');
    const [notifications, setNotifications] = useState({
      taskAssignments: true,
      mentions: true,
      dailyDigest: false,
      weeklySummary: true
    });
    const [saved, setSaved] = useState(false);

    const timezones = [
      { value: 'Pacific/Honolulu', label: 'Pacific/Honolulu (HST) -10:00' },
      { value: 'America/Anchorage', label: 'America/Anchorage (AKST) -09:00' },
      { value: 'America/Los_Angeles', label: 'America/Los_Angeles (PST) -08:00' },
      { value: 'America/Denver', label: 'America/Denver (MST) -07:00' },
      { value: 'America/Phoenix', label: 'America/Phoenix (MST) -07:00' },
      { value: 'America/Chicago', label: 'America/Chicago (CST) -06:00' },
      { value: 'America/New_York', label: 'America/New_York (EST) -05:00' },
      { value: 'America/Halifax', label: 'America/Halifax (AST) -04:00' },
      { value: 'America/St_Johns', label: 'America/St_Johns (NST) -03:30' },
      { value: 'America/Sao_Paulo', label: 'America/Sao_Paulo (BRT) -03:00' },
      { value: 'Atlantic/South_Georgia', label: 'Atlantic/South_Georgia -02:00' },
      { value: 'Atlantic/Azores', label: 'Atlantic/Azores -01:00' },
      { value: 'Europe/London', label: 'Europe/London (GMT) +00:00' },
      { value: 'Europe/Paris', label: 'Europe/Paris (CET) +01:00' },
      { value: 'Europe/Berlin', label: 'Europe/Berlin (CET) +01:00' },
      { value: 'Europe/Athens', label: 'Europe/Athens (EET) +02:00' },
      { value: 'Europe/Istanbul', label: 'Europe/Istanbul (TRT) +03:00' },
      { value: 'Europe/Moscow', label: 'Europe/Moscow (MSK) +03:00' },
      { value: 'Asia/Dubai', label: 'Asia/Dubai (GST) +04:00' },
      { value: 'Asia/Karachi', label: 'Asia/Karachi (PKT) +05:00' },
      { value: 'Asia/Kolkata', label: 'Asia/Kolkata (IST) +05:30' },
      { value: 'Asia/Dhaka', label: 'Asia/Dhaka (BST) +06:00' },
      { value: 'Asia/Bangkok', label: 'Asia/Bangkok (ICT) +07:00' },
      { value: 'Asia/Singapore', label: 'Asia/Singapore (SGT) +08:00' },
      { value: 'Asia/Hong_Kong', label: 'Asia/Hong_Kong (HKT) +08:00' },
      { value: 'Asia/Shanghai', label: 'Asia/Shanghai (CST) +08:00' },
      { value: 'Asia/Tokyo', label: 'Asia/Tokyo (JST) +09:00' },
      { value: 'Asia/Seoul', label: 'Asia/Seoul (KST) +09:00' },
      { value: 'Australia/Sydney', label: 'Australia/Sydney (AEDT) +11:00' },
      { value: 'Australia/Brisbane', label: 'Australia/Brisbane (AEST) +10:00' },
      { value: 'Australia/Perth', label: 'Australia/Perth (AWST) +08:00' },
      { value: 'Pacific/Auckland', label: 'Pacific/Auckland (NZDT) +13:00' },
      { value: 'Pacific/Fiji', label: 'Pacific/Fiji (FJT) +12:00' },
    ];

    const generateSubdomain = (name) => {
      return name.toLowerCase().replace(/[^a-z0-9]/g, '').slice(0, 20);
    };

    const handleOrgNameChange = (e) => {
      const newName = e.target.value;
      setOrgName(newName);
      setSubdomain(generateSubdomain(newName));
    };

    const handleSave = () => {
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    };

    return (
      <div className="space-y-6">
        <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-5">
          <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
            <Building2 size={16} strokeWidth={1.5} className="text-cyan-400" />
            Organization Settings
          </h3>
          <div className="space-y-4">
            <div>
              <label className="text-xs text-slate-500 mb-1 block">Organization Name</label>
              <input 
                type="text" 
                value={orgName}
                onChange={handleOrgNameChange}
                className="w-full py-2 px-3 bg-slate-800 border border-slate-700 rounded-lg text-white text-sm outline-none focus:border-cyan-500"
              />
            </div>
            <div>
              <label className="text-xs text-slate-500 mb-1 block">Workspace URL</label>
              <div className="flex flex-col sm:flex-row">
                <input 
                  type="text" 
                  value={subdomain}
                  onChange={(e) => setSubdomain(e.target.value.toLowerCase().replace(/[^a-z0-9]/g, ''))}
                  className="flex-1 py-2 px-3 bg-slate-800 border border-slate-700 rounded-t-lg sm:rounded-l-lg sm:rounded-tr-none text-white text-sm outline-none focus:border-cyan-500"
                />
                <span className="py-2 px-3 bg-slate-700 border border-slate-600 border-t-0 sm:border-t sm:border-l-0 rounded-b-lg sm:rounded-r-lg sm:rounded-bl-none text-slate-400 text-sm">.commandcentral.app</span>
              </div>
              <p className="text-xs text-slate-500 mt-1">Your workspace will be accessible at {subdomain}.commandcentral.app</p>
            </div>
            <div>
              <label className="text-xs text-slate-500 mb-1 block">Default Timezone</label>
              <select 
                value={timezone}
                onChange={(e) => setTimezone(e.target.value)}
                className="w-full py-2 px-3 bg-slate-800 border border-slate-700 rounded-lg text-white text-sm outline-none focus:border-cyan-500"
              >
                {timezones.map(tz => (
                  <option key={tz.value} value={tz.value}>{tz.label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-5">
          <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
            <Bell size={16} strokeWidth={1.5} className="text-cyan-400" />
            Notification Preferences
          </h3>
          <div className="space-y-3">
            {[
              { key: 'taskAssignments', label: 'Email notifications for task assignments' },
              { key: 'mentions', label: 'Push notifications for mentions' },
              { key: 'dailyDigest', label: 'Daily digest emails' },
              { key: 'weeklySummary', label: 'Weekly summary reports' },
            ].map((pref) => (
              <div key={pref.key} className="flex items-center justify-between py-2">
                <span className="text-sm text-slate-300">{pref.label}</span>
                <button 
                  onClick={() => setNotifications(prev => ({ ...prev, [pref.key]: !prev[pref.key] }))}
                  className={`w-10 h-6 rounded-full transition-colors ${notifications[pref.key] ? 'bg-cyan-500' : 'bg-slate-700'} relative`}
                >
                  <div className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-all ${notifications[pref.key] ? 'right-1' : 'left-1'}`} />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-end gap-3">
          {saved && (
            <span className="text-sm text-emerald-400 flex items-center gap-1">
              <Check size={16} /> Settings saved
            </span>
          )}
          <button 
            onClick={handleSave}
            className="px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-cyan-600 rounded-lg text-white text-sm font-semibold hover:from-cyan-600 hover:to-cyan-700 transition-colors"
          >
            Save Changes
          </button>
        </div>
      </div>
    );
  };

  const BillingSettings = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-cyan-500/20 to-violet-500/20 border border-cyan-500/30 rounded-xl p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-xs text-cyan-400 font-semibold uppercase mb-1">Current Plan</div>
            <div className="text-2xl font-bold text-white">Business Pro</div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-white">$49<span className="text-sm text-slate-400">/mo</span></div>
            <div className="text-xs text-slate-400">per user</div>
          </div>
        </div>
        <div className="flex items-center gap-4 pt-4 border-t border-white/10">
          <div className="flex-1">
            <div className="text-xs text-slate-400 mb-1">Users</div>
            <div className="text-sm text-white font-medium">5 of 10 seats used</div>
          </div>
          <div className="flex-1">
            <div className="text-xs text-slate-400 mb-1">Billing Period</div>
            <div className="text-sm text-white font-medium">Nov 1 - Nov 30, 2025</div>
          </div>
          <button className="px-4 py-2 bg-cyan-500 hover:bg-cyan-600 rounded-lg text-white text-sm font-semibold transition-colors">
            Upgrade Plan
          </button>
        </div>
      </div>

      <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-5">
        <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
          <CreditCard size={16} strokeWidth={1.5} className="text-cyan-400" />
          Payment Method
        </h3>
        <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg border border-slate-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-7 bg-gradient-to-r from-blue-600 to-blue-800 rounded flex items-center justify-center text-white text-[10px] font-bold">VISA</div>
            <div>
              <div className="text-sm text-white">•••• •••• •••• 4242</div>
              <div className="text-xs text-slate-500">Expires 12/2027</div>
            </div>
          </div>
          <button className="text-cyan-400 text-sm font-medium hover:text-cyan-300">Edit</button>
        </div>
      </div>

      <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-5">
        <h3 className="text-sm font-semibold text-white mb-4">Billing History</h3>
        <div className="space-y-2">
          {[
            { date: 'Nov 1, 2025', amount: '$245.00', status: 'Paid' },
            { date: 'Oct 1, 2025', amount: '$245.00', status: 'Paid' },
            { date: 'Sep 1, 2025', amount: '$245.00', status: 'Paid' },
          ].map((invoice, i) => (
            <div key={i} className="flex items-center justify-between py-2 border-b border-slate-800 last:border-0">
              <span className="text-sm text-slate-300">{invoice.date}</span>
              <span className="text-sm text-white font-medium">{invoice.amount}</span>
              <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 text-xs rounded">{invoice.status}</span>
              <button className="text-cyan-400 text-xs">Download</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const UserAccessSettings = () => {
    const [editingUser, setEditingUser] = useState(null);
    const [viewMode, setViewMode] = useState('grid');
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [showBulkEdit, setShowBulkEdit] = useState(false);
    const [showReportModal, setShowReportModal] = useState(false);
    const [showInviteModal, setShowInviteModal] = useState(false);
    const [filters, setFilters] = useState({
      search: '',
      role: '',
      status: '',
      permission: '',
      project: ''
    });

    const filteredUsers = useMemo(() => {
      return userAccessData.filter(user => {
        if (filters.search && !user.name.toLowerCase().includes(filters.search.toLowerCase()) && 
            !user.email.toLowerCase().includes(filters.search.toLowerCase())) return false;
        if (filters.role && user.role !== filters.role) return false;
        if (filters.status === 'active' && !user.enabled) return false;
        if (filters.status === 'disabled' && user.enabled) return false;
        if (filters.permission && !user.permissions.includes(filters.permission)) return false;
        if (filters.project && (!user.assignedProjects || !user.assignedProjects.includes(parseInt(filters.project)))) return false;
        return true;
      });
    }, [userAccessData, filters]);

    const uniqueRoles = [...new Set(userAccessData.map(u => u.role))];

    const clearFilters = () => {
      setFilters({ search: '', role: '', status: '', permission: '', project: '' });
    };

    const hasActiveFilters = filters.search || filters.role || filters.status || filters.permission || filters.project;

    const toggleSelectUser = (userId) => {
      setSelectedUsers(prev => 
        prev.includes(userId) 
          ? prev.filter(id => id !== userId)
          : [...prev, userId]
      );
    };

    const toggleSelectAll = () => {
      if (selectedUsers.length === filteredUsers.length) {
        setSelectedUsers([]);
      } else {
        setSelectedUsers(filteredUsers.map(u => u.id));
      }
    };

    const getUserProjects = (initials) => {
      const userTasks = tasks.filter(t => t.assignee === initials);
      return [...new Set(userTasks.map(t => t.project))];
    };

    const getUserTaskStats = (initials) => {
      const userTasks = tasks.filter(t => t.assignee === initials);
      return {
        total: userTasks.length,
        completed: userTasks.filter(t => t.status === 'completed').length,
        inProgress: userTasks.filter(t => t.status === 'in_progress').length,
        blocked: userTasks.filter(t => t.status === 'blocked').length
      };
    };

    const generateCSVReport = () => {
      const headers = ['Name', 'Email', 'Role', 'Status', 'Last Login', 'Permissions', 'Projects', 'Total Tasks', 'Completed', 'In Progress', 'Blocked'];
      const rows = userAccessData.map(user => {
        const stats = getUserTaskStats(user.initials);
        const userProjects = getUserProjects(user.initials);
        return [
          user.name,
          user.email,
          user.role,
          user.enabled ? 'Active' : 'Disabled',
          user.lastLogin,
          user.permissions.map(p => PERMISSIONS[p]?.label).join('; '),
          userProjects.join('; '),
          stats.total,
          stats.completed,
          stats.inProgress,
          stats.blocked
        ];
      });
      
      const csvContent = [headers, ...rows].map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');
      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `user-access-report-${new Date().toISOString().split('T')[0]}.csv`;
      a.click();
      URL.revokeObjectURL(url);
    };

    const generateInitials = (name) => {
      return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    };

    const getRandomColor = () => {
      const colors = [
        'from-cyan-500 to-cyan-600',
        'from-amber-500 to-amber-600',
        'from-violet-500 to-violet-600',
        'from-emerald-500 to-emerald-600',
        'from-rose-500 to-rose-600',
        'from-blue-500 to-blue-600',
        'from-pink-500 to-pink-600',
        'from-indigo-500 to-indigo-600',
      ];
      return colors[Math.floor(Math.random() * colors.length)];
    };

    const InviteUserModal = ({ onClose }) => {
      const [inviteMode, setInviteMode] = useState('single');
      const [formData, setFormData] = useState({
        name: '',
        email: '',
        role: 'Team Member',
        permissions: ['projects', 'tasks'],
        assignedProjects: []
      });
      const [bulkData, setBulkData] = useState([]);
      const [bulkError, setBulkError] = useState('');
      const [inviteSent, setInviteSent] = useState(false);
      const [copiedTemplate, setCopiedTemplate] = useState(false);

      const allPermissions = Object.keys(PERMISSIONS);

      const togglePermission = (perm) => {
        setFormData(prev => ({
          ...prev,
          permissions: prev.permissions.includes(perm)
            ? prev.permissions.filter(p => p !== perm)
            : [...prev.permissions, perm]
        }));
      };

      const handleSingleInvite = () => {
        if (!formData.name || !formData.email) return;
        
        const newUser = {
          id: Date.now(),
          initials: generateInitials(formData.name),
          name: formData.name,
          email: formData.email,
          role: formData.role,
          status: 'offline',
          color: getRandomColor(),
          permissions: formData.permissions,
          assignedProjects: formData.assignedProjects,
          enabled: true,
          lastLogin: 'Never'
        };
        
        setUserAccessData(prev => [...prev, newUser]);
        setInviteSent(true);
        setTimeout(() => {
          onClose();
        }, 1500);
      };

      const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
          try {
            const text = event.target.result;
            const lines = text.split('\n').filter(line => line.trim());
            const headers = lines[0].split(',').map(h => h.trim().toLowerCase().replace(/"/g, ''));
            
            const nameIndex = headers.findIndex(h => h === 'name');
            const emailIndex = headers.findIndex(h => h === 'email');
            const roleIndex = headers.findIndex(h => h === 'role');

            if (nameIndex === -1 || emailIndex === -1) {
              setBulkError('CSV must have "name" and "email" columns');
              return;
            }

            const users = lines.slice(1).map((line, idx) => {
              const values = line.split(',').map(v => v.trim().replace(/"/g, ''));
              return {
                id: Date.now() + idx,
                name: values[nameIndex] || '',
                email: values[emailIndex] || '',
                role: values[roleIndex] || 'Team Member',
                valid: values[nameIndex] && values[emailIndex] && values[emailIndex].includes('@')
              };
            }).filter(u => u.name || u.email);

            setBulkData(users);
            setBulkError('');
          } catch (err) {
            setBulkError('Failed to parse CSV file');
          }
        };
        reader.readAsText(file);
      };

      const handleBulkInvite = () => {
        const validUsers = bulkData.filter(u => u.valid);
        if (validUsers.length === 0) return;

        const newUsers = validUsers.map((u, idx) => ({
          id: Date.now() + idx,
          initials: generateInitials(u.name),
          name: u.name,
          email: u.email,
          role: u.role,
          status: 'offline',
          color: getRandomColor(),
          permissions: ['projects', 'tasks'],
          enabled: true,
          lastLogin: 'Never'
        }));

        setUserAccessData(prev => [...prev, ...newUsers]);
        setInviteSent(true);
        setTimeout(() => {
          onClose();
        }, 1500);
      };

      const downloadTemplate = () => {
        const template = 'name,email,role\n"John Smith","john.smith@example.com","Team Member"\n"Jane Doe","jane.doe@example.com","Senior Developer"';
        const blob = new Blob([template], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'user-import-template.csv';
        a.click();
        URL.revokeObjectURL(url);
      };

      const copyTemplate = () => {
        navigator.clipboard.writeText('name,email,role\n"John Smith","john.smith@example.com","Team Member"');
        setCopiedTemplate(true);
        setTimeout(() => setCopiedTemplate(false), 2000);
      };

      const removeBulkUser = (id) => {
        setBulkData(prev => prev.filter(u => u.id !== id));
      };

      if (inviteSent) {
        return (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
            <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-md p-8 text-center">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-4">
                <Check size={32} strokeWidth={1.5} className="text-emerald-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                {inviteMode === 'single' ? 'Invitation Sent!' : `${bulkData.filter(u => u.valid).length} Users Added!`}
              </h3>
              <p className="text-slate-400 text-sm">
                {inviteMode === 'single' 
                  ? `An invitation has been sent to ${formData.email}`
                  : 'All users have been added to the system'}
              </p>
            </div>
          </div>
        );
      }

      return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-xl max-h-[90vh] overflow-hidden">
            <div className="p-5 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-cyan-500/20 flex items-center justify-center">
                  <UserPlus size={20} strokeWidth={1.5} className="text-cyan-400" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">Invite Users</h3>
                  <p className="text-xs text-slate-500">Add new team members to your workspace</p>
                </div>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white">
                <X size={18} strokeWidth={1.5} />
              </button>
            </div>

            <div className="p-5 overflow-y-auto max-h-[calc(90vh-180px)]">
              <div className="flex gap-2 mb-5">
                <button
                  onClick={() => setInviteMode('single')}
                  className={`flex-1 py-2.5 px-4 rounded-lg border text-sm font-medium transition-colors ${
                    inviteMode === 'single'
                      ? 'bg-cyan-500/20 border-cyan-500/50 text-cyan-400'
                      : 'bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-600'
                  }`}
                >
                  <UserPlus size={16} className="inline mr-2" />
                  Single Invite
                </button>
                <button
                  onClick={() => setInviteMode('bulk')}
                  className={`flex-1 py-2.5 px-4 rounded-lg border text-sm font-medium transition-colors ${
                    inviteMode === 'bulk'
                      ? 'bg-cyan-500/20 border-cyan-500/50 text-cyan-400'
                      : 'bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-600'
                  }`}
                >
                  <Upload size={16} className="inline mr-2" />
                  Bulk Import
                </button>
              </div>

              {inviteMode === 'single' ? (
                <div className="space-y-4">
                  <div>
                    <label className="text-xs text-slate-500 mb-2 block">Full Name *</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="John Smith"
                      className="w-full py-2.5 px-3 bg-slate-800 border border-slate-700 rounded-lg text-white text-sm outline-none focus:border-cyan-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-slate-500 mb-2 block">Email Address *</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="john.smith@company.com"
                      className="w-full py-2.5 px-3 bg-slate-800 border border-slate-700 rounded-lg text-white text-sm outline-none focus:border-cyan-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-slate-500 mb-2 block">Role</label>
                    <select 
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      className="w-full py-2.5 px-3 bg-slate-800 border border-slate-700 rounded-lg text-white text-sm outline-none focus:border-cyan-500"
                    >
                      <option>Team Member</option>
                      <option>Project Manager</option>
                      <option>Senior Developer</option>
                      <option>UI/UX Designer</option>
                      <option>DevOps Engineer</option>
                      <option>Marketing Lead</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs text-slate-500 mb-2 block">Permissions</label>
                    <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto p-1">
                      {allPermissions.map(perm => (
                        <button
                          key={perm}
                          onClick={() => togglePermission(perm)}
                          className={`flex items-center gap-2 p-2 rounded-lg border text-left transition-all ${
                            formData.permissions.includes(perm)
                              ? 'border-cyan-500/50 bg-cyan-500/10'
                              : 'border-slate-700 bg-slate-800/50 hover:border-slate-600'
                          }`}
                        >
                          <div 
                            className={`w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0 ${
                              formData.permissions.includes(perm)
                                ? 'border-cyan-500 bg-cyan-500'
                                : 'border-slate-600'
                            }`}
                          >
                            {formData.permissions.includes(perm) && (
                              <Check size={10} className="text-white" />
                            )}
                          </div>
                          <span className="text-xs text-slate-300 truncate">{PERMISSIONS[perm]?.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-xs text-slate-500 mb-2 block">Assign to Projects</label>
                    <div className="space-y-2 max-h-32 overflow-y-auto">
                      {projects.map(project => (
                        <button
                          key={project.id}
                          onClick={() => {
                            setFormData(prev => ({
                              ...prev,
                              assignedProjects: prev.assignedProjects?.includes(project.id)
                                ? prev.assignedProjects.filter(p => p !== project.id)
                                : [...(prev.assignedProjects || []), project.id]
                            }));
                          }}
                          className={`flex items-center gap-3 w-full p-2.5 rounded-lg border text-left transition-all ${
                            formData.assignedProjects?.includes(project.id)
                              ? 'border-cyan-500/50 bg-cyan-500/10'
                              : 'border-slate-700 bg-slate-800/50 hover:border-slate-600'
                          }`}
                        >
                          <div 
                            className={`w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0 ${
                              formData.assignedProjects?.includes(project.id)
                                ? 'border-cyan-500 bg-cyan-500'
                                : 'border-slate-600'
                            }`}
                          >
                            {formData.assignedProjects?.includes(project.id) && (
                              <Check size={10} className="text-white" />
                            )}
                          </div>
                          <div className="flex items-center gap-2 flex-1 min-w-0">
                            <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: project.color }} />
                            <span className="text-xs text-slate-300 truncate">{project.name}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="bg-slate-800/50 border border-slate-700 border-dashed rounded-xl p-6 text-center">
                    <input
                      type="file"
                      accept=".csv"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="csv-upload"
                    />
                    <label htmlFor="csv-upload" className="cursor-pointer">
                      <div className="w-12 h-12 rounded-xl bg-slate-700 flex items-center justify-center mx-auto mb-3">
                        <Upload size={24} strokeWidth={1.5} className="text-slate-400" />
                      </div>
                      <p className="text-sm text-white font-medium mb-1">Upload CSV File</p>
                      <p className="text-xs text-slate-500">Click to browse or drag and drop</p>
                    </label>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={downloadTemplate}
                      className="flex-1 flex items-center justify-center gap-2 py-2 px-3 bg-slate-800 border border-slate-700 rounded-lg text-slate-300 text-xs font-medium hover:bg-slate-700"
                    >
                      <Download size={14} /> Download Template
                    </button>
                    <button
                      onClick={copyTemplate}
                      className="flex-1 flex items-center justify-center gap-2 py-2 px-3 bg-slate-800 border border-slate-700 rounded-lg text-slate-300 text-xs font-medium hover:bg-slate-700"
                    >
                      {copiedTemplate ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                      {copiedTemplate ? 'Copied!' : 'Copy Template'}
                    </button>
                  </div>

                  {bulkError && (
                    <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-lg text-rose-400 text-sm">
                      {bulkError}
                    </div>
                  )}

                  {bulkData.length > 0 && (
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-slate-500">{bulkData.length} users found</span>
                        <span className="text-xs text-emerald-400">{bulkData.filter(u => u.valid).length} valid</span>
                      </div>
                      <div className="bg-slate-800/50 border border-slate-700 rounded-xl overflow-hidden max-h-48 overflow-y-auto">
                        {bulkData.map(user => (
                          <div 
                            key={user.id} 
                            className={`flex items-center justify-between px-3 py-2 border-b border-slate-700 last:border-0 ${
                              !user.valid ? 'bg-rose-500/5' : ''
                            }`}
                          >
                            <div className="flex items-center gap-3 min-w-0">
                              <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${getRandomColor()} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}>
                                {user.name ? generateInitials(user.name) : '?'}
                              </div>
                              <div className="min-w-0">
                                <div className="text-sm text-white truncate">{user.name || 'Missing name'}</div>
                                <div className="text-xs text-slate-500 truncate">{user.email || 'Missing email'}</div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              {!user.valid && (
                                <span className="text-[10px] text-rose-400 bg-rose-500/20 px-1.5 py-0.5 rounded">Invalid</span>
                              )}
                              <button
                                onClick={() => removeBulkUser(user.id)}
                                className="p-1 hover:bg-slate-700 rounded text-slate-400 hover:text-rose-400"
                              >
                                <X size={14} />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="bg-slate-800/30 rounded-lg p-3">
                    <p className="text-xs text-slate-400 mb-2">CSV Format Requirements:</p>
                    <ul className="text-xs text-slate-500 space-y-1">
                      <li>• First row must be headers: <span className="text-slate-300">name, email, role</span></li>
                      <li>• Email column is required and must be valid</li>
                      <li>• Role is optional (defaults to "Team Member")</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>

            <div className="p-5 border-t border-slate-800 flex items-center justify-end gap-3">
              <button 
                onClick={onClose}
                className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-300 text-sm font-medium hover:bg-slate-700"
              >
                Cancel
              </button>
              {inviteMode === 'single' ? (
                <button 
                  onClick={handleSingleInvite}
                  disabled={!formData.name || !formData.email}
                  className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-cyan-600 rounded-lg text-white text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Send Invitation
                </button>
              ) : (
                <button 
                  onClick={handleBulkInvite}
                  disabled={bulkData.filter(u => u.valid).length === 0}
                  className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-cyan-600 rounded-lg text-white text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Import {bulkData.filter(u => u.valid).length} Users
                </button>
              )}
            </div>
          </div>
        </div>
      );
    };

    const ReportModal = ({ onClose }) => {
      const activeUsers = userAccessData.filter(u => u.enabled).length;
      const disabledUsers = userAccessData.filter(u => !u.enabled).length;
      const totalProjects = projects.length;
      const totalTasks = tasks.length;

      return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-lg overflow-hidden">
            <div className="p-5 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-cyan-500/20 flex items-center justify-center">
                  <FileText size={20} strokeWidth={1.5} className="text-cyan-400" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">Download User Report</h3>
                  <p className="text-xs text-slate-500">Export user access data</p>
                </div>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white">
                <X size={18} strokeWidth={1.5} />
              </button>
            </div>

            <div className="p-5">
              <div className="grid grid-cols-2 gap-3 mb-5">
                <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-700">
                  <div className="text-2xl font-bold text-white">{userAccessData.length}</div>
                  <div className="text-xs text-slate-500">Total Users</div>
                </div>
                <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-700">
                  <div className="text-2xl font-bold text-emerald-400">{activeUsers}</div>
                  <div className="text-xs text-slate-500">Active Users</div>
                </div>
                <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-700">
                  <div className="text-2xl font-bold text-slate-400">{disabledUsers}</div>
                  <div className="text-xs text-slate-500">Disabled Users</div>
                </div>
                <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-700">
                  <div className="text-2xl font-bold text-cyan-400">{totalProjects}</div>
                  <div className="text-xs text-slate-500">Projects</div>
                </div>
              </div>

              <div className="mb-5">
                <h4 className="text-sm font-medium text-white mb-3">Report Includes:</h4>
                <ul className="space-y-2 text-sm text-slate-400">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-emerald-400" />
                    User details (name, email, role)
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-emerald-400" />
                    Account status & last login
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-emerald-400" />
                    All assigned permissions
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-emerald-400" />
                    Project assignments
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-emerald-400" />
                    Task summary (total, completed, in progress, blocked)
                  </li>
                </ul>
              </div>

              <button 
                onClick={() => { generateCSVReport(); onClose(); }}
                className="w-full flex items-center justify-center gap-2 p-4 bg-gradient-to-r from-cyan-500 to-cyan-600 rounded-lg text-white font-semibold hover:from-cyan-600 hover:to-cyan-700 transition-colors"
              >
                <Download size={18} strokeWidth={1.5} />
                Download CSV Report
              </button>
            </div>

            <div className="p-5 border-t border-slate-800 bg-slate-800/30">
              <p className="text-xs text-slate-500 text-center">
                Report generated on {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </div>
          </div>
        </div>
      );
    };

    const BulkEditModal = ({ onClose }) => {
      const [bulkAction, setBulkAction] = useState('');
      const [bulkRole, setBulkRole] = useState('');
      const [bulkPermissions, setBulkPermissions] = useState([]);
      const [permissionAction, setPermissionAction] = useState('add');

      const allPermissions = Object.keys(PERMISSIONS);

      const toggleBulkPermission = (perm) => {
        setBulkPermissions(prev => 
          prev.includes(perm) ? prev.filter(p => p !== perm) : [...prev, perm]
        );
      };

      const handleBulkSave = () => {
        setUserAccessData(prev => prev.map(user => {
          if (!selectedUsers.includes(user.id)) return user;
          
          let updated = { ...user };
          
          if (bulkAction === 'enable') updated.enabled = true;
          if (bulkAction === 'disable') updated.enabled = false;
          if (bulkRole) updated.role = bulkRole;
          
          if (bulkPermissions.length > 0) {
            if (permissionAction === 'add') {
              updated.permissions = [...new Set([...user.permissions, ...bulkPermissions])];
            } else if (permissionAction === 'remove') {
              updated.permissions = user.permissions.filter(p => !bulkPermissions.includes(p));
            } else if (permissionAction === 'set') {
              updated.permissions = bulkPermissions;
            }
          }
          
          return updated;
        }));
        setSelectedUsers([]);
        onClose();
      };

      const selectedUserData = userAccessData.filter(u => selectedUsers.includes(u.id));

      return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-xl max-h-[90vh] overflow-hidden">
            <div className="p-5 border-b border-slate-800 flex items-center justify-between">
              <div>
                <h3 className="text-white font-semibold">Bulk Edit Users</h3>
                <p className="text-xs text-slate-500 mt-1">{selectedUsers.length} user{selectedUsers.length !== 1 ? 's' : ''} selected</p>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white">
                <X size={18} strokeWidth={1.5} />
              </button>
            </div>

            <div className="p-5 overflow-y-auto max-h-[60vh]">
              <div className="flex flex-wrap gap-2 mb-5 pb-5 border-b border-slate-800">
                {selectedUserData.map(user => (
                  <div key={user.id} className="flex items-center gap-2 px-2 py-1 bg-slate-800 rounded-lg">
                    <div className={`w-6 h-6 rounded-full bg-gradient-to-br ${user.color} flex items-center justify-center text-white text-[10px] font-bold`}>
                      {user.initials}
                    </div>
                    <span className="text-xs text-slate-300">{user.name}</span>
                    <button 
                      onClick={() => toggleSelectUser(user.id)}
                      className="text-slate-500 hover:text-slate-300"
                    >
                      <X size={12} strokeWidth={2} />
                    </button>
                  </div>
                ))}
              </div>

              <div className="mb-5">
                <label className="text-xs text-slate-500 mb-2 block">Account Status</label>
                <div className="flex gap-2">
                  <button 
                    onClick={() => setBulkAction(bulkAction === 'enable' ? '' : 'enable')}
                    className={`flex-1 py-2 px-3 rounded-lg border text-sm font-medium transition-colors ${
                      bulkAction === 'enable' 
                        ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400' 
                        : 'bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-600'
                    }`}
                  >
                    Enable All
                  </button>
                  <button 
                    onClick={() => setBulkAction(bulkAction === 'disable' ? '' : 'disable')}
                    className={`flex-1 py-2 px-3 rounded-lg border text-sm font-medium transition-colors ${
                      bulkAction === 'disable' 
                        ? 'bg-rose-500/20 border-rose-500/50 text-rose-400' 
                        : 'bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-600'
                    }`}
                  >
                    Disable All
                  </button>
                </div>
              </div>

              <div className="mb-5">
                <label className="text-xs text-slate-500 mb-2 block">Change Role (optional)</label>
                <select 
                  value={bulkRole}
                  onChange={(e) => setBulkRole(e.target.value)}
                  className="w-full py-2 px-3 bg-slate-800 border border-slate-700 rounded-lg text-white text-sm outline-none focus:border-cyan-500"
                >
                  <option value="">No change</option>
                  <option>Project Manager</option>
                  <option>Senior Developer</option>
                  <option>UI/UX Designer</option>
                  <option>DevOps Engineer</option>
                  <option>Marketing Lead</option>
                  <option>Team Member</option>
                </select>
              </div>

              <div>
                <label className="text-xs text-slate-500 mb-2 block">Modify Permissions (optional)</label>
                <div className="flex gap-2 mb-3">
                  {[
                    { id: 'add', label: 'Add' },
                    { id: 'remove', label: 'Remove' },
                    { id: 'set', label: 'Set Exactly' },
                  ].map(action => (
                    <button
                      key={action.id}
                      onClick={() => setPermissionAction(action.id)}
                      className={`flex-1 py-1.5 px-3 rounded-lg border text-xs font-medium transition-colors ${
                        permissionAction === action.id
                          ? 'bg-cyan-500/20 border-cyan-500/50 text-cyan-400'
                          : 'bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-600'
                      }`}
                    >
                      {action.label}
                    </button>
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto p-1">
                  {allPermissions.map(perm => (
                    <button
                      key={perm}
                      onClick={() => toggleBulkPermission(perm)}
                      className={`flex items-center gap-2 p-2 rounded-lg border text-left transition-all ${
                        bulkPermissions.includes(perm)
                          ? 'border-cyan-500/50 bg-cyan-500/10'
                          : 'border-slate-700 bg-slate-800/50 hover:border-slate-600'
                      }`}
                    >
                      <div 
                        className={`w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0 ${
                          bulkPermissions.includes(perm)
                            ? 'border-cyan-500 bg-cyan-500'
                            : 'border-slate-600'
                        }`}
                      >
                        {bulkPermissions.includes(perm) && (
                          <CheckCircle2 size={10} className="text-white" />
                        )}
                      </div>
                      <span className="text-xs text-slate-300 truncate">{PERMISSIONS[perm]?.label}</span>
                    </button>
                  ))}
                </div>
                {bulkPermissions.length > 0 && (
                  <p className="text-[10px] text-slate-500 mt-2">
                    {permissionAction === 'add' && `Will add ${bulkPermissions.length} permission(s) to selected users`}
                    {permissionAction === 'remove' && `Will remove ${bulkPermissions.length} permission(s) from selected users`}
                    {permissionAction === 'set' && `Will set exactly ${bulkPermissions.length} permission(s) for selected users`}
                  </p>
                )}
              </div>
            </div>

            <div className="p-5 border-t border-slate-800 flex items-center justify-between">
              <button 
                onClick={() => {
                  setSelectedUsers([]);
                  onClose();
                }}
                className="text-rose-400 text-sm font-medium hover:text-rose-300"
              >
                Clear Selection
              </button>
              <div className="flex items-center gap-3">
                <button 
                  onClick={onClose}
                  className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-300 text-sm font-medium hover:bg-slate-700"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleBulkSave}
                  disabled={!bulkAction && !bulkRole && bulkPermissions.length === 0}
                  className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-cyan-600 rounded-lg text-white text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Apply Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    };

    const UserEditModal = ({ user, onClose }) => {
      const [formData, setFormData] = useState({
        role: user.role,
        permissions: [...user.permissions],
        enabled: user.enabled,
        assignedProjects: [...(user.assignedProjects || [])]
      });

      const allPermissions = Object.keys(PERMISSIONS);

      const togglePermission = (perm) => {
        setFormData(prev => ({
          ...prev,
          permissions: prev.permissions.includes(perm)
            ? prev.permissions.filter(p => p !== perm)
            : [...prev.permissions, perm]
        }));
      };

      const toggleProject = (projectId) => {
        setFormData(prev => ({
          ...prev,
          assignedProjects: prev.assignedProjects.includes(projectId)
            ? prev.assignedProjects.filter(p => p !== projectId)
            : [...prev.assignedProjects, projectId]
        }));
      };

      const handleSave = () => {
        setUserAccessData(prev => 
          prev.map(u => u.id === user.id 
            ? { ...u, role: formData.role, permissions: formData.permissions, enabled: formData.enabled, assignedProjects: formData.assignedProjects }
            : u
          )
        );
        onClose();
      };

      return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-2 sm:p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-lg max-h-[95vh] sm:max-h-[90vh] flex flex-col overflow-hidden">
            <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between flex-shrink-0">
              <div className="flex items-center gap-3 min-w-0">
                <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${user.color} flex items-center justify-center text-white font-bold flex-shrink-0`}>
                  {user.initials}
                </div>
                <div className="min-w-0">
                  <h3 className="text-white font-semibold truncate">{user.name}</h3>
                  <p className="text-xs text-slate-500 truncate">{user.email}</p>
                </div>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white flex-shrink-0">
                <X size={18} strokeWidth={1.5} />
              </button>
            </div>

            <div className="p-4 sm:p-5 overflow-y-auto flex-1">
              <div className="mb-5">
                <label className="text-xs text-slate-500 mb-2 block">Role</label>
                <select 
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full py-2.5 px-3 bg-slate-800 border border-slate-700 rounded-lg text-white text-sm outline-none focus:border-cyan-500"
                >
                  <option>Project Manager</option>
                  <option>Senior Developer</option>
                  <option>UI/UX Designer</option>
                  <option>DevOps Engineer</option>
                  <option>Marketing Lead</option>
                  <option>Team Member</option>
                </select>
              </div>

              <div className="mb-5">
                <label className="text-xs text-slate-500 mb-2 block">Account Status</label>
                <button 
                  onClick={() => setFormData({ ...formData, enabled: !formData.enabled })}
                  className={`flex items-center gap-3 w-full p-3 rounded-lg border ${
                    formData.enabled 
                      ? 'bg-emerald-500/10 border-emerald-500/30' 
                      : 'bg-slate-800 border-slate-700'
                  }`}
                >
                  <div className={`w-10 h-6 rounded-full transition-colors ${formData.enabled ? 'bg-emerald-500' : 'bg-slate-600'} relative flex-shrink-0`}>
                    <div className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-all ${formData.enabled ? 'right-1' : 'left-1'}`} />
                  </div>
                  <span className={`text-sm ${formData.enabled ? 'text-emerald-400' : 'text-slate-400'}`}>
                    {formData.enabled ? 'Active' : 'Disabled'}
                  </span>
                </button>
              </div>

              <div className="mb-5">
                <label className="text-xs text-slate-500 mb-2 block">Assigned Projects</label>
                <div className="space-y-2 max-h-36 overflow-y-auto">
                  {projects.map(project => (
                    <button
                      key={project.id}
                      onClick={() => toggleProject(project.id)}
                      className={`flex items-center gap-3 w-full p-2.5 sm:p-3 rounded-lg border text-left transition-all ${
                        formData.assignedProjects.includes(project.id)
                          ? 'border-cyan-500/50 bg-cyan-500/10'
                          : 'border-slate-700 bg-slate-800/50 hover:border-slate-600'
                      }`}
                    >
                      <div 
                        className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 ${
                          formData.assignedProjects.includes(project.id)
                            ? 'border-cyan-500 bg-cyan-500'
                            : 'border-slate-600'
                        }`}
                      >
                        {formData.assignedProjects.includes(project.id) && (
                          <Check size={12} className="text-white" />
                        )}
                      </div>
                      <div className="flex items-center gap-2 flex-1 min-w-0">
                        <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: project.color }} />
                        <span className="text-sm text-white truncate">{project.name}</span>
                      </div>
                      <span className="text-xs text-slate-500 hidden sm:inline">{project.tasks} tasks</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs text-slate-500 mb-2 block">Permissions</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-48 overflow-y-auto">
                  {allPermissions.map(perm => (
                    <button
                      key={perm}
                      onClick={() => togglePermission(perm)}
                      className={`flex items-center gap-2 p-2 rounded-lg border text-left transition-all ${
                        formData.permissions.includes(perm)
                          ? 'border-cyan-500/50 bg-cyan-500/10'
                          : 'border-slate-700 bg-slate-800/50 hover:border-slate-600'
                      }`}
                    >
                      <div 
                        className={`w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0 ${
                          formData.permissions.includes(perm)
                            ? 'border-cyan-500 bg-cyan-500'
                            : 'border-slate-600'
                        }`}
                      >
                        {formData.permissions.includes(perm) && (
                          <CheckCircle2 size={10} className="text-white" />
                        )}
                      </div>
                      <span className="text-xs text-slate-300 truncate">{PERMISSIONS[perm]?.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-4 sm:p-5 border-t border-slate-800 flex items-center justify-end gap-3 flex-shrink-0">
              <button 
                onClick={onClose}
                className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-300 text-sm font-medium hover:bg-slate-700"
              >
                Cancel
              </button>
              <button 
                onClick={handleSave}
                className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-cyan-600 rounded-lg text-white text-sm font-semibold"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      );
    };

    return (
      <div className="space-y-6">
        {editingUser && (
          <UserEditModal user={editingUser} onClose={() => setEditingUser(null)} />
        )}
        
        {showBulkEdit && (
          <BulkEditModal onClose={() => setShowBulkEdit(false)} />
        )}

        {showReportModal && (
          <ReportModal onClose={() => setShowReportModal(false)} />
        )}

        {showInviteModal && (
          <InviteUserModal onClose={() => setShowInviteModal(false)} />
        )}

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-white font-semibold">User Access Management</h3>
            <p className="text-sm text-slate-500">Manage user permissions and access levels</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button 
              onClick={() => setShowReportModal(true)}
              className="flex items-center gap-2 px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-300 text-sm font-medium hover:bg-slate-700 hover:border-slate-600"
            >
              <Download size={14} strokeWidth={1.5} />
              Export Report
            </button>
            {selectedUsers.length > 0 && (
              <button 
                onClick={() => setShowBulkEdit(true)}
                className="flex items-center gap-2 px-3 py-2 bg-amber-500/20 border border-amber-500/30 rounded-lg text-amber-400 text-sm font-medium hover:bg-amber-500/30"
              >
                <Edit3 size={14} strokeWidth={1.5} />
                Edit {selectedUsers.length} Selected
              </button>
            )}
            <div className="flex bg-slate-800 rounded-lg p-1">
              <button 
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded ${viewMode === 'grid' ? 'bg-cyan-500/20 text-cyan-400' : 'text-slate-400'}`}
              >
                <Grid3X3 size={16} strokeWidth={1.5} />
              </button>
              <button 
                onClick={() => setViewMode('list')}
                className={`p-2 rounded ${viewMode === 'list' ? 'bg-cyan-500/20 text-cyan-400' : 'text-slate-400'}`}
              >
                <List size={16} strokeWidth={1.5} />
              </button>
            </div>
            <button 
              onClick={() => setShowInviteModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-cyan-600 rounded-lg text-white text-sm font-semibold"
            >
              <Plus size={16} strokeWidth={1.5} /> Invite User
            </button>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 p-4 bg-slate-900/30 border border-slate-800 rounded-xl">
          <div className="relative flex-1 min-w-[180px] max-w-[280px]">
            <Search size={16} strokeWidth={1.5} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="Search users..."
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              className="w-full py-2 pl-9 pr-3 bg-slate-800 border border-slate-700 rounded-lg text-white text-sm outline-none focus:border-cyan-500"
            />
          </div>

          <select 
            value={filters.role} 
            onChange={(e) => setFilters({ ...filters, role: e.target.value })}
            className="bg-slate-800 text-white border border-slate-700 rounded-lg px-3 py-2 text-sm outline-none min-w-[140px]"
          >
            <option value="">All Roles</option>
            {uniqueRoles.map(role => (
              <option key={role} value={role}>{role}</option>
            ))}
          </select>

          <select 
            value={filters.status} 
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
            className="bg-slate-800 text-white border border-slate-700 rounded-lg px-3 py-2 text-sm outline-none min-w-[120px]"
          >
            <option value="">All Statuses</option>
            <option value="active">Active</option>
            <option value="disabled">Disabled</option>
          </select>

          <select 
            value={filters.permission} 
            onChange={(e) => setFilters({ ...filters, permission: e.target.value })}
            className="bg-slate-800 text-white border border-slate-700 rounded-lg px-3 py-2 text-sm outline-none min-w-[150px]"
          >
            <option value="">All Permissions</option>
            {Object.entries(PERMISSIONS).map(([key, perm]) => (
              <option key={key} value={key}>{perm.label}</option>
            ))}
          </select>

          <select 
            value={filters.project} 
            onChange={(e) => setFilters({ ...filters, project: e.target.value })}
            className="bg-slate-800 text-white border border-slate-700 rounded-lg px-3 py-2 text-sm outline-none min-w-[150px]"
          >
            <option value="">All Projects</option>
            {projects.map(project => (
              <option key={project.id} value={project.id}>{project.name}</option>
            ))}
          </select>

          {hasActiveFilters && (
            <button 
              onClick={clearFilters}
              className="flex items-center gap-1 px-3 py-2 bg-rose-500/20 border border-rose-500/30 rounded-lg text-rose-400 text-sm hover:bg-rose-500/30"
            >
              <X size={14} strokeWidth={1.5} /> Clear
            </button>
          )}

          <div className="ml-auto text-xs text-slate-500">
            {filteredUsers.length} of {userAccessData.length} users
          </div>
        </div>

        {filteredUsers.length > 0 && (
          <div className="flex items-center gap-3 py-2 px-1">
            <button 
              onClick={toggleSelectAll}
              className="flex items-center gap-2 text-sm text-slate-400 hover:text-white"
            >
              <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                selectedUsers.length === filteredUsers.length && filteredUsers.length > 0
                  ? 'border-cyan-500 bg-cyan-500' 
                  : selectedUsers.length > 0 
                    ? 'border-cyan-500 bg-cyan-500/50' 
                    : 'border-slate-600 hover:border-slate-500'
              }`}>
                {selectedUsers.length > 0 && (
                  <CheckCircle2 size={12} className="text-white" />
                )}
              </div>
              {selectedUsers.length === filteredUsers.length && filteredUsers.length > 0
                ? 'Deselect All' 
                : selectedUsers.length > 0 
                  ? `${selectedUsers.length} selected` 
                  : 'Select All'}
            </button>
            {selectedUsers.length > 0 && (
              <button 
                onClick={() => setSelectedUsers([])}
                className="text-xs text-slate-500 hover:text-slate-300"
              >
                Clear
              </button>
            )}
          </div>
        )}

        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredUsers.length > 0 ? filteredUsers.map(user => (
              <div key={user.id} className={`bg-slate-900/50 border rounded-xl p-4 hover:border-slate-700 transition-colors ${
                selectedUsers.includes(user.id) ? 'border-cyan-500/50 bg-cyan-500/5' : 'border-slate-800'
              }`}>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => toggleSelectUser(user.id)}
                      className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                        selectedUsers.includes(user.id)
                          ? 'border-cyan-500 bg-cyan-500'
                          : 'border-slate-600 hover:border-slate-500'
                      }`}
                    >
                      {selectedUsers.includes(user.id) && (
                        <CheckCircle2 size={12} className="text-white" />
                      )}
                    </button>
                    <div className="relative">
                      <div className={`w-11 h-11 rounded-full bg-gradient-to-br ${user.color} flex items-center justify-center text-white font-bold`}>
                        {user.initials}
                      </div>
                      <div 
                        className={`absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-slate-900 ${user.enabled ? 'bg-emerald-500' : 'bg-slate-600'}`}
                      />
                    </div>
                    <div>
                      <div className="text-sm text-white font-medium">{user.name}</div>
                      <div className="text-xs text-slate-500">{user.role}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <button 
                      onClick={() => setEditingUser(user)}
                      className="p-1.5 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-cyan-400 transition-colors"
                    >
                      <Edit3 size={14} strokeWidth={1.5} />
                    </button>
                    <button className="p-1.5 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-rose-400 transition-colors">
                      <Trash2 size={14} strokeWidth={1.5} />
                    </button>
                  </div>
                </div>

                <div className="text-xs text-slate-500 mb-3">{user.email}</div>

                <div className="flex flex-wrap gap-1 mb-3">
                  {user.permissions.slice(0, 3).map(perm => (
                    <span 
                      key={perm}
                      className="px-1.5 py-0.5 rounded text-[9px] font-medium"
                      style={{ background: `${PERMISSIONS[perm]?.color}15`, color: PERMISSIONS[perm]?.color }}
                    >
                      {PERMISSIONS[perm]?.label}
                    </span>
                  ))}
                  {user.permissions.length > 3 && (
                    <span className="px-1.5 py-0.5 rounded text-[9px] font-medium bg-slate-800 text-slate-400">
                      +{user.permissions.length - 3}
                    </span>
                  )}
                </div>

                {user.assignedProjects && user.assignedProjects.length > 0 && (
                  <div className="mb-3 pb-3 border-b border-slate-800">
                    <div className="text-[10px] text-slate-500 mb-1.5">Projects</div>
                    <div className="flex flex-wrap gap-1">
                      {user.assignedProjects.slice(0, 3).map(projectId => {
                        const project = projects.find(p => p.id === projectId);
                        return project ? (
                          <span 
                            key={projectId}
                            className="flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-medium bg-slate-800 text-slate-300"
                          >
                            <span className="w-1.5 h-1.5 rounded-full" style={{ background: project.color }} />
                            {project.name.length > 12 ? project.name.slice(0, 12) + '...' : project.name}
                          </span>
                        ) : null;
                      })}
                      {user.assignedProjects.length > 3 && (
                        <span className="px-1.5 py-0.5 rounded text-[9px] font-medium bg-slate-800 text-slate-400">
                          +{user.assignedProjects.length - 3}
                        </span>
                      )}
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between pt-3 border-t border-slate-800">
                  <div className="text-[10px] text-slate-500">
                    Last login: {user.lastLogin}
                  </div>
                  <button 
                    onClick={() => toggleUserAccess(user.id)}
                    className={`px-2 py-1 rounded text-[10px] font-semibold ${
                      user.enabled 
                        ? 'bg-emerald-500/20 text-emerald-400' 
                        : 'bg-slate-700 text-slate-400'
                    }`}
                  >
                    {user.enabled ? 'Active' : 'Disabled'}
                  </button>
                </div>
              </div>
            )) : (
              <div className="col-span-2 text-center py-12 text-slate-500">
                <UserCog size={40} strokeWidth={1} className="mx-auto mb-3 opacity-50" />
                <p className="text-sm">No users match your filters</p>
                <button onClick={clearFilters} className="text-cyan-400 text-sm mt-2 hover:text-cyan-300">Clear filters</button>
              </div>
            )}
          </div>
        ) : (
          <div className="bg-slate-900/50 border border-slate-800 rounded-xl overflow-hidden">
            <div className="hidden lg:flex items-center px-4 py-3 bg-slate-800/50 text-xs text-slate-500 uppercase font-semibold">
              <div className="w-8"></div>
              <div className="flex-1 min-w-0">User</div>
              <div className="w-32 hidden xl:block">Role</div>
              <div className="w-48 hidden md:block">Permissions</div>
              <div className="w-24">Status</div>
              <div className="w-20 text-right">Actions</div>
            </div>
            {filteredUsers.length > 0 ? filteredUsers.map(user => (
              <div key={user.id} className={`flex flex-col lg:flex-row lg:items-center px-4 py-4 border-t border-slate-800 hover:bg-slate-800/30 gap-3 lg:gap-0 ${
                selectedUsers.includes(user.id) ? 'bg-cyan-500/5' : ''
              }`}>
                <div className="hidden lg:flex w-8 items-center">
                  <button 
                    onClick={() => toggleSelectUser(user.id)}
                    className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                      selectedUsers.includes(user.id)
                        ? 'border-cyan-500 bg-cyan-500'
                        : 'border-slate-600 hover:border-slate-500'
                    }`}
                  >
                    {selectedUsers.includes(user.id) && (
                      <CheckCircle2 size={12} className="text-white" />
                    )}
                  </button>
                </div>
                <div className="flex-1 min-w-0 flex items-center gap-3">
                  <button 
                    onClick={() => toggleSelectUser(user.id)}
                    className={`lg:hidden w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                      selectedUsers.includes(user.id)
                        ? 'border-cyan-500 bg-cyan-500'
                        : 'border-slate-600 hover:border-slate-500'
                    }`}
                  >
                    {selectedUsers.includes(user.id) && (
                      <CheckCircle2 size={12} className="text-white" />
                    )}
                  </button>
                  <div className="relative flex-shrink-0">
                    <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${user.color} flex items-center justify-center text-white text-xs font-bold`}>
                      {user.initials}
                    </div>
                    <div 
                      className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-slate-900 ${user.enabled ? 'bg-emerald-500' : 'bg-slate-600'}`}
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-sm text-white font-medium truncate">{user.name}</div>
                    <div className="text-xs text-slate-500 truncate">{user.email}</div>
                    <div className="text-xs text-slate-400 lg:hidden mt-1">{user.role}</div>
                  </div>
                </div>
                
                <div className="w-32 text-sm text-slate-400 truncate hidden xl:block">{user.role}</div>
                
                <div className="w-48 hidden md:flex flex-wrap gap-1">
                  {user.permissions.slice(0, 3).map(perm => (
                    <span 
                      key={perm}
                      className="px-1.5 py-0.5 rounded text-[9px] font-medium"
                      style={{ background: `${PERMISSIONS[perm]?.color}15`, color: PERMISSIONS[perm]?.color }}
                    >
                      {PERMISSIONS[perm]?.label}
                    </span>
                  ))}
                  {user.permissions.length > 3 && (
                    <span className="px-1.5 py-0.5 rounded text-[9px] font-medium bg-slate-700 text-slate-400">
                      +{user.permissions.length - 3}
                    </span>
                  )}
                </div>

                <div className="flex md:hidden flex-wrap gap-1 pl-13">
                  {user.permissions.slice(0, 2).map(perm => (
                    <span 
                      key={perm}
                      className="px-1.5 py-0.5 rounded text-[9px] font-medium"
                      style={{ background: `${PERMISSIONS[perm]?.color}15`, color: PERMISSIONS[perm]?.color }}
                    >
                      {PERMISSIONS[perm]?.label}
                    </span>
                  ))}
                  {user.permissions.length > 2 && (
                    <span className="px-1.5 py-0.5 rounded text-[9px] font-medium bg-slate-700 text-slate-400">
                      +{user.permissions.length - 2}
                    </span>
                  )}
                </div>
                
                <div className="flex items-center justify-between lg:justify-start gap-3 lg:gap-0 lg:w-44 pl-13 lg:pl-0">
                  <div className="w-24">
                    <button 
                      onClick={() => toggleUserAccess(user.id)}
                      className={`px-2 py-1 rounded text-[10px] font-semibold ${
                        user.enabled 
                          ? 'bg-emerald-500/20 text-emerald-400' 
                          : 'bg-slate-700 text-slate-400'
                      }`}
                    >
                      {user.enabled ? 'Active' : 'Disabled'}
                    </button>
                  </div>
                  <div className="w-20 flex items-center justify-end gap-1">
                    <button 
                      onClick={() => setEditingUser(user)}
                      className="p-2 hover:bg-slate-700 rounded-lg text-slate-400 hover:text-cyan-400"
                    >
                      <Edit3 size={16} strokeWidth={1.5} />
                    </button>
                    <button className="p-2 hover:bg-slate-700 rounded-lg text-slate-400 hover:text-rose-400">
                      <Trash2 size={16} strokeWidth={1.5} />
                    </button>
                  </div>
                </div>
              </div>
            )) : (
              <div className="text-center py-12 text-slate-500">
                <UserCog size={40} strokeWidth={1} className="mx-auto mb-3 opacity-50" />
                <p className="text-sm">No users match your filters</p>
                <button onClick={clearFilters} className="text-cyan-400 text-sm mt-2 hover:text-cyan-300">Clear filters</button>
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  const SecuritySettings = () => (
    <div className="space-y-6">
      <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-5">
        <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
          <Lock size={16} strokeWidth={1.5} className="text-cyan-400" />
          Authentication
        </h3>
        <div className="space-y-3">
          {[
            { label: 'Require two-factor authentication', enabled: true },
            { label: 'Allow single sign-on (SSO)', enabled: true },
            { label: 'Enforce password complexity', enabled: true },
            { label: 'Session timeout after 30 minutes', enabled: false },
          ].map((setting, i) => (
            <div key={i} className="flex items-center justify-between py-2">
              <span className="text-sm text-slate-300">{setting.label}</span>
              <button className={`w-10 h-6 rounded-full transition-colors ${setting.enabled ? 'bg-cyan-500' : 'bg-slate-700'} relative`}>
                <div className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-all ${setting.enabled ? 'right-1' : 'left-1'}`} />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-5">
        <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
          <Database size={16} strokeWidth={1.5} className="text-cyan-400" />
          Data & Privacy
        </h3>
        <div className="space-y-3">
          <button className="w-full text-left p-3 bg-slate-800/50 rounded-lg border border-slate-700 hover:border-slate-600">
            <div className="text-sm text-white font-medium">Export All Data</div>
            <div className="text-xs text-slate-500">Download all organization data in JSON format</div>
          </button>
          <button className="w-full text-left p-3 bg-slate-800/50 rounded-lg border border-slate-700 hover:border-slate-600">
            <div className="text-sm text-white font-medium">Audit Log</div>
            <div className="text-xs text-slate-500">View security events and user activity</div>
          </button>
          <button className="w-full text-left p-3 bg-rose-500/10 rounded-lg border border-rose-500/30 hover:border-rose-500/50">
            <div className="text-sm text-rose-400 font-medium">Delete Organization</div>
            <div className="text-xs text-slate-500">Permanently delete all data</div>
          </button>
        </div>
      </div>
    </div>
  );

  const IntegrationsSettings = () => (
    <div className="space-y-6">
      <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-5">
        <h3 className="text-sm font-semibold text-white mb-4">Connected Services</h3>
        <div className="space-y-3">
          {[
            { name: 'WordPress', desc: 'Content management integration', connected: true, color: '#21759b' },
            { name: 'n8n', desc: 'Workflow automation', connected: true, color: '#ff6d5a' },
            { name: 'PostgreSQL', desc: 'Database connection', connected: true, color: '#336791' },
            { name: 'Slack', desc: 'Team communication', connected: false, color: '#4a154b' },
            { name: 'GitHub', desc: 'Code repository', connected: false, color: '#333' },
          ].map((service, i) => (
            <div key={i} className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg border border-slate-700">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: `${service.color}20` }}>
                  <Globe size={20} strokeWidth={1.5} style={{ color: service.color }} />
                </div>
                <div>
                  <div className="text-sm text-white font-medium">{service.name}</div>
                  <div className="text-xs text-slate-500">{service.desc}</div>
                </div>
              </div>
              <button className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
                service.connected 
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
                  : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
              }`}>
                {service.connected ? 'Connected' : 'Connect'}
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-5">
        <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
          <Key size={16} strokeWidth={1.5} className="text-cyan-400" />
          API Keys
        </h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg border border-slate-700">
            <div>
              <div className="text-sm text-white font-medium">Production API Key</div>
              <div className="text-xs text-slate-500 font-mono">cc_prod_••••••••••••••••</div>
            </div>
            <div className="flex items-center gap-2">
              <button className="text-cyan-400 text-xs">Reveal</button>
              <button className="text-cyan-400 text-xs">Regenerate</button>
            </div>
          </div>
          <button className="flex items-center gap-2 text-cyan-400 text-sm font-medium">
            <Plus size={14} strokeWidth={1.5} /> Create New API Key
          </button>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'general': return <GeneralSettings />;
      case 'billing': return <BillingSettings />;
      case 'users': return <UserAccessSettings />;
      case 'security': return <SecuritySettings />;
      case 'integrations': return <IntegrationsSettings />;
      default: return <GeneralSettings />;
    }
  };

  return (
    <div className="flex h-full">
      <div className="w-56 bg-slate-900/50 border-r border-slate-800 p-4">
        <nav className="space-y-1">
          {tabs.map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                  activeTab === tab.id 
                    ? 'bg-cyan-500/15 text-cyan-400' 
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Icon size={18} strokeWidth={1.5} />
                <span className="text-sm">{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
      <div className="flex-1 p-6 overflow-auto">
        {renderTabContent()}
      </div>
    </div>
  );
};

// Placeholder
const PlaceholderView = ({ title, icon: Icon }) => (
  <div className="flex items-center justify-center h-full">
    <div className="text-center p-12 bg-slate-900/50 border border-slate-800 rounded-2xl">
      <div className="w-16 h-16 rounded-xl bg-cyan-500/10 flex items-center justify-center mx-auto mb-4">
        <Icon size={32} strokeWidth={1} className="text-cyan-400" />
      </div>
      <h2 className="text-xl font-bold text-white mb-2">{title}</h2>
      <p className="text-slate-500 text-sm">Coming soon</p>
    </div>
  </div>
);

// Main App
export default function App() {
  const [activeView, setActiveView] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const renderView = () => {
    switch (activeView) {
      case 'dashboard': return <DashboardView setActiveView={setActiveView} />;
      case 'tasks': return <TasksView />;
      case 'projects': return <PlaceholderView title="Projects" icon={FolderKanban} />;
      case 'calendar': return <PlaceholderView title="Calendar" icon={Calendar} />;
      case 'reports': return <PlaceholderView title="Reports" icon={BarChart3} />;
      case 'time': return <PlaceholderView title="Time Tracking" icon={Clock} />;
      case 'team': return <TeamView />;
      case 'admin': return <AdminView />;
      default: return <DashboardView setActiveView={setActiveView} />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-950">
      <Sidebar activeView={activeView} setActiveView={setActiveView} collapsed={sidebarCollapsed} setCollapsed={setSidebarCollapsed} />
      <main className="flex-1 flex flex-col overflow-hidden">
        <Header activeView={activeView} />
        <div className="flex-1 overflow-auto">{renderView()}</div>
      </main>
    </div>
  );
}
