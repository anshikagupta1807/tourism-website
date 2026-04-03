"use client"

import { useState, useEffect } from "react"
import {
  LayoutDashboard, MapPin, ShoppingBag, Users, LogOut,
  Plus, Edit, Trash2, Check, X, Eye, TrendingUp,
  Mountain, Star, AlertCircle, ChevronRight, Search,
  BarChart3, Globe, Shield, Bell, Menu
} from "lucide-react"

// ─── MOCK DATA ───────────────────────────────────────────────────────────────

const ADMIN_CREDENTIALS = { email: "anshika@gmail.com", password: "admin@123" }

const initialDestinations = [
  { id: 1, name: "Betla National Park", category: "wildlife", status: "active", rating: 4.8, visitors: 12470, image: "/betla-national-park-wildlife-sanctuary-with-tigers.jpg", description: "Home to tigers, elephants, and diverse wildlife", distance: "45 km" },
  { id: 2, name: "Hundru Falls", category: "waterfall", status: "active", rating: 4.6, visitors: 8920, image: "/waterfall-lush-forest.png", description: "Spectacular 98-meter waterfall", distance: "32 km" },
  { id: 3, name: "Dassam Falls", category: "waterfall", status: "active", rating: 4.5, visitors: 7430, image: "/dassam-falls-branded.png", description: "Multi-tiered adventure waterfall", distance: "40 km" },
  { id: 4, name: "Baidyanath Dham", category: "spiritual", status: "active", rating: 4.9, visitors: 21560, image: "/baidyanath-temple-complex.png", description: "Sacred Jyotirlinga temple complex", distance: "250 km" },
  { id: 5, name: "Netarhat Hill Station", category: "adventure", status: "inactive", rating: 4.7, visitors: 10890, image: "/netarhat-sunset-point-golden-hour.jpg", description: "Queen of Chotanagpur plateau", distance: "156 km" },
  { id: 6, name: "Parasnath Hill", category: "spiritual", status: "active", rating: 4.7, visitors: 12340, image: "/netarhat-sunset-point-golden-hour.jpg", description: "Highest peak, sacred Jain site", distance: "165 km" },
]

const initialSellers = [
  { id: 1, name: "Ravi Tribal Crafts", owner: "Ravi Kumar", email: "ravi@crafts.com", category: "Handicrafts", status: "pending", products: 24, joined: "2025-01-15", phone: "+91-9801234567" },
  { id: 2, name: "Jharkhand Spices", owner: "Meena Devi", email: "meena@spices.com", category: "Food & Spices", status: "approved", products: 18, joined: "2025-01-10", phone: "+91-9812345678" },
  { id: 3, name: "Forest Honey Co.", owner: "Suresh Munda", email: "suresh@honey.com", category: "Organic Products", status: "pending", products: 8, joined: "2025-02-01", phone: "+91-9823456789" },
  { id: 4, name: "Santhal Pottery", owner: "Anita Hansda", email: "anita@pottery.com", category: "Handicrafts", status: "approved", products: 35, joined: "2024-12-20", phone: "+91-9834567890" },
  { id: 5, name: "Palamu Adventure Tours", owner: "Deepak Singh", email: "deepak@tours.com", category: "Tours & Travel", status: "rejected", products: 12, joined: "2025-01-28", phone: "+91-9845678901" },
  { id: 6, name: "Tribal Art Gallery", owner: "Priya Oraon", email: "priya@art.com", category: "Art & Craft", status: "pending", products: 42, joined: "2025-02-05", phone: "+91-9856789012" },
]

const initialUsers = [
  { id: 1, name: "Arjun Sharma", email: "arjun@gmail.com", role: "tourist", status: "active", joined: "2025-01-05", visits: 3 },
  { id: 2, name: "Priya Singh", email: "priya@gmail.com", role: "tourist", status: "active", joined: "2025-01-12", visits: 7 },
  { id: 3, name: "Rahul Verma", email: "rahul@gmail.com", role: "seller", status: "active", joined: "2025-01-18", visits: 15 },
  { id: 4, name: "Sunita Devi", email: "sunita@gmail.com", role: "tourist", status: "inactive", joined: "2024-12-25", visits: 1 },
  { id: 5, name: "Manoj Kumar", email: "manoj@gmail.com", role: "tourist", status: "active", joined: "2025-02-01", visits: 4 },
  { id: 6, name: "Kavita Mahto", email: "kavita@gmail.com", role: "seller", status: "active", joined: "2025-01-30", visits: 22 },
]

const analyticsData = {
  totalVisitors: 84320,
  totalDestinations: 20,
  totalSellers: 48,
  totalUsers: 1240,
  visitorGrowth: "+18%",
  revenueGrowth: "+24%",
  monthlyVisitors: [
    { month: "Aug", visitors: 4200 }, { month: "Sep", visitors: 5100 },
    { month: "Oct", visitors: 7800 }, { month: "Nov", visitors: 9200 },
    { month: "Dec", visitors: 11400 }, { month: "Jan", visitors: 13200 },
    { month: "Feb", visitors: 8420 },
  ],
  categoryBreakdown: [
    { category: "Wildlife", count: 4, color: "#22c55e" },
    { category: "Waterfall", count: 5, color: "#3b82f6" },
    { category: "Spiritual", count: 6, color: "#f59e0b" },
    { category: "Adventure", count: 5, color: "#f97316" },
  ],
  topDestinations: [
    { name: "Baidyanath Dham", visitors: 21560 },
    { name: "Betla National Park", visitors: 12470 },
    { name: "Parasnath Hill", visitors: 12340 },
    { name: "Netarhat Hill Station", visitors: 10890 },
    { name: "Hundru Falls", visitors: 8920 },
  ],
}

// ─── COMPONENTS ──────────────────────────────────────────────────────────────

function StatCard({ icon: Icon, label, value, growth, color }) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center gap-4">
      <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${color}`}>
        <Icon className="h-7 w-7 text-white" />
      </div>
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="text-2xl font-bold text-gray-800">{value}</p>
        {growth && <p className="text-xs text-green-600 font-medium">{growth} this month</p>}
      </div>
    </div>
  )
}

function Badge({ status }) {
  const styles = {
    active: "bg-green-100 text-green-700",
    inactive: "bg-gray-100 text-gray-600",
    approved: "bg-green-100 text-green-700",
    pending: "bg-yellow-100 text-yellow-700",
    rejected: "bg-red-100 text-red-700",
    tourist: "bg-blue-100 text-blue-700",
    seller: "bg-purple-100 text-purple-700",
  }
  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${styles[status] || "bg-gray-100 text-gray-600"}`}>
      {status}
    </span>
  )
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────

export default function AdminPanel() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [loginData, setLoginData] = useState({ email: "", password: "" })
  const [loginError, setLoginError] = useState("")
  const [activeTab, setActiveTab] = useState("dashboard")
  const [destinations, setDestinations] = useState(initialDestinations)
  const [sellers, setSellers] = useState(initialSellers)
  const [users, setUsers] = useState(initialUsers)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [search, setSearch] = useState("")
  const [showDestModal, setShowDestModal] = useState(false)
  const [editingDest, setEditingDest] = useState(null)
  const [destForm, setDestForm] = useState({ name: "", category: "wildlife", description: "", distance: "", status: "active" })
  const [notification, setNotification] = useState(null)

  const showNotif = (msg, type = "success") => {
    setNotification({ msg, type })
    setTimeout(() => setNotification(null), 3000)
  }

  const handleLogin = (e) => {
    e.preventDefault()
    if (loginData.email === ADMIN_CREDENTIALS.email && loginData.password === ADMIN_CREDENTIALS.password) {
      setIsLoggedIn(true)
      setLoginError("")
    } else {
      setLoginError("Invalid email or password.")
    }
  }

  // Destinations CRUD
  const openAddDest = () => { setEditingDest(null); setDestForm({ name: "", category: "wildlife", description: "", distance: "", status: "active" }); setShowDestModal(true) }
  const openEditDest = (dest) => { setEditingDest(dest); setDestForm({ name: dest.name, category: dest.category, description: dest.description, distance: dest.distance, status: dest.status }); setShowDestModal(true) }
  const saveDest = () => {
    if (!destForm.name) return
    if (editingDest) {
      setDestinations(prev => prev.map(d => d.id === editingDest.id ? { ...d, ...destForm } : d))
      showNotif("Destination updated successfully!")
    } else {
      setDestinations(prev => [...prev, { id: Date.now(), ...destForm, rating: 0, visitors: 0, image: "/placeholder.svg" }])
      showNotif("Destination added successfully!")
    }
    setShowDestModal(false)
  }
  const deleteDest = (id) => { setDestinations(prev => prev.filter(d => d.id !== id)); showNotif("Destination deleted!", "error") }

  // Sellers
  const updateSellerStatus = (id, status) => {
    setSellers(prev => prev.map(s => s.id === id ? { ...s, status } : s))
    showNotif(`Seller ${status} successfully!`)
  }

  // Users
  const toggleUserStatus = (id) => {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, status: u.status === "active" ? "inactive" : "active" } : u))
    showNotif("User status updated!")
  }

  const filteredDestinations = destinations.filter(d => d.name.toLowerCase().includes(search.toLowerCase()))
  const filteredSellers = sellers.filter(s => s.name.toLowerCase().includes(search.toLowerCase()))
  const filteredUsers = users.filter(u => u.name.toLowerCase().includes(search.toLowerCase()))
  const pendingSellers = sellers.filter(s => s.status === "pending").length

  // ── LOGIN PAGE ──
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-900 via-green-800 to-teal-900 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
              <Shield className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white">Admin Portal</h1>
            <p className="text-green-200 mt-1">Jharkhand Tourism Department</p>
          </div>

          <div className="bg-white rounded-2xl shadow-2xl p-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Sign in to continue</h2>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">Email Address</label>
                <input type="email" value={loginData.email}
                  onChange={e => setLoginData(p => ({ ...p, email: e.target.value }))}
                  // placeholder="admin@jharkhand.gov.in"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">Password</label>
                <input type="password" value={loginData.password}
                  onChange={e => setLoginData(p => ({ ...p, password: e.target.value }))}
                  placeholder="Enter password"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100" />
              </div>
              {loginError && (
                <div className="flex items-start gap-2 bg-red-50 border border-red-200 rounded-xl p-3">
                  <AlertCircle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-red-600">{loginError}</p>
                </div>
              )}
              <button type="submit" className="w-full bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-xl py-3 font-semibold hover:from-green-700 hover:to-teal-700 transition-all">
                Sign In
              </button>
            </form>
            {/* <div className="mt-4 p-3 bg-gray-50 rounded-xl">
              <p className="text-xs text-gray-500 text-center">Demo credentials:</p>
              <p className="text-xs text-gray-600 text-center font-mono mt-1">admin@jharkhand.gov.in / admin@123</p>
            </div> */}
          </div>
        </div>
      </div>
    )
  }

  // ── ADMIN PANEL ──
  return (
    <div className="min-h-screen bg-gray-50 flex">


      {/* Notification */}
      {notification && (
        <div className={`fixed top-4 right-4 z-50 px-5 py-3 rounded-xl shadow-lg text-white text-sm font-medium flex items-center gap-2 ${notification.type === "error" ? "bg-red-500" : "bg-green-500"}`}>
          {notification.type === "error" ? <X className="h-4 w-4" /> : <Check className="h-4 w-4" />}
          {notification.msg}
        </div>
      )}

      {/* Sidebar */}
      <div className={`${sidebarOpen ? "w-64" : "w-16"} bg-white border-r border-gray-100 flex flex-col transition-all duration-300 flex-shrink-0`}>
        <div className="p-4 border-b border-gray-100 flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-green-600 to-teal-600 rounded-lg flex items-center justify-center flex-shrink-0">
            <Mountain className="h-4 w-4 text-white" />
          </div>
          {sidebarOpen && <div><p className="text-sm font-bold text-gray-800">JH Tourism</p><p className="text-xs text-gray-500">Admin Panel</p></div>}
        </div>

        <nav className="flex-1 p-3 space-y-1">
          {[
            { id: "dashboard", icon: LayoutDashboard, label: "Dashboard" },
            { id: "destinations", icon: MapPin, label: "Destinations" },
            { id: "sellers", icon: ShoppingBag, label: `Sellers${pendingSellers > 0 ? ` (${pendingSellers})` : ""}` },
            { id: "users", icon: Users, label: "Users" },
            { id: "analytics", icon: BarChart3, label: "Analytics" },
          ].map(({ id, icon: Icon, label }) => (
            <button key={id} onClick={() => setActiveTab(id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${activeTab === id ? "bg-green-50 text-green-700" : "text-gray-600 hover:bg-gray-50"}`}>
              <Icon className="h-5 w-5 flex-shrink-0" />
              {sidebarOpen && <span>{label}</span>}
            </button>
          ))}
        </nav>

        <div className="p-3 border-t border-gray-100">
          <button onClick={() => setIsLoggedIn(false)}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 transition-all">
            <LogOut className="h-5 w-5 flex-shrink-0" />
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* Top Bar */}
        <div className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
              <Menu className="h-5 w-5 text-gray-600" />
            </button>
            <div>
              <h1 className="text-lg font-bold text-gray-800 capitalize">{activeTab}</h1>
              <p className="text-xs text-gray-500">Jharkhand Tourism Admin</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {pendingSellers > 0 && (
              <button onClick={() => setActiveTab("sellers")} className="relative p-2 rounded-lg hover:bg-gray-100">
                <Bell className="h-5 w-5 text-gray-600" />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">{pendingSellers}</span>
              </button>
            )}
            <div className="flex items-center gap-2 bg-green-50 px-3 py-2 rounded-xl">
              <div className="w-7 h-7 bg-gradient-to-br from-green-600 to-teal-600 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">A</span>
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-700">Admin</p>
                <p className="text-xs text-gray-500">Tourism Dept.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6">

          {/* ── DASHBOARD ── */}
          {activeTab === "dashboard" && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard icon={Globe} label="Total Visitors" value={analyticsData.totalVisitors.toLocaleString()} growth={analyticsData.visitorGrowth} color="bg-blue-500" />
                <StatCard icon={MapPin} label="Destinations" value={analyticsData.totalDestinations} color="bg-green-500" />
                <StatCard icon={ShoppingBag} label="Sellers" value={analyticsData.totalSellers} color="bg-purple-500" />
                <StatCard icon={Users} label="Users" value={analyticsData.totalUsers.toLocaleString()} color="bg-orange-500" />
              </div>

              <div className="grid lg:grid-cols-2 gap-6">
                {/* Top Destinations */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                  <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2"><TrendingUp className="h-5 w-5 text-green-600" /> Top Destinations</h3>
                  <div className="space-y-3">
                    {analyticsData.topDestinations.map((dest, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <span className="w-6 h-6 bg-green-100 text-green-700 rounded-full flex items-center justify-center text-xs font-bold">{i + 1}</span>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-700">{dest.name}</p>
                          <div className="w-full bg-gray-100 rounded-full h-1.5 mt-1">
                            <div className="bg-gradient-to-r from-green-500 to-teal-500 h-1.5 rounded-full" style={{ width: `${(dest.visitors / 21560) * 100}%` }}></div>
                          </div>
                        </div>
                        <span className="text-xs text-gray-500 font-medium">{dest.visitors.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pending Actions */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                  <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2"><AlertCircle className="h-5 w-5 text-yellow-500" /> Pending Actions</h3>
                  <div className="space-y-3">
                    {sellers.filter(s => s.status === "pending").map(s => (
                      <div key={s.id} className="flex items-center justify-between p-3 bg-yellow-50 rounded-xl border border-yellow-100">
                        <div>
                          <p className="text-sm font-medium text-gray-800">{s.name}</p>
                          <p className="text-xs text-gray-500">{s.category} • {s.products} products</p>
                        </div>
                        <div className="flex gap-2">
                          <button onClick={() => { updateSellerStatus(s.id, "approved"); }} className="p-1.5 bg-green-500 text-white rounded-lg hover:bg-green-600"><Check className="h-3.5 w-3.5" /></button>
                          <button onClick={() => { updateSellerStatus(s.id, "rejected"); }} className="p-1.5 bg-red-500 text-white rounded-lg hover:bg-red-600"><X className="h-3.5 w-3.5" /></button>
                        </div>
                      </div>
                    ))}
                    {sellers.filter(s => s.status === "pending").length === 0 && (
                      <p className="text-sm text-gray-500 text-center py-4">No pending approvals! ✅</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Category Breakdown */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h3 className="font-bold text-gray-800 mb-4">Destinations by Category</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {analyticsData.categoryBreakdown.map((cat) => (
                    <div key={cat.category} className="text-center p-4 rounded-xl border border-gray-100">
                      <div className="w-12 h-12 rounded-full mx-auto mb-2 flex items-center justify-center" style={{ backgroundColor: cat.color + "20" }}>
                        <div className="w-6 h-6 rounded-full" style={{ backgroundColor: cat.color }}></div>
                      </div>
                      <p className="text-2xl font-bold text-gray-800">{cat.count}</p>
                      <p className="text-xs text-gray-500">{cat.category}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── DESTINATIONS ── */}
          {activeTab === "destinations" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="relative">
                  <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search destinations..."
                    className="pl-9 pr-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-green-400 w-64" />
                </div>
                <button onClick={openAddDest} className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-green-700 transition-colors">
                  <Plus className="h-4 w-4" /> Add Destination
                </button>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredDestinations.map(dest => (
                  <div key={dest.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="aspect-video relative">
                      <img src={dest.image || "/placeholder.svg"} alt={dest.name} className="w-full h-full object-cover" />
                      <div className="absolute top-2 right-2"><Badge status={dest.status} /></div>
                    </div>
                    <div className="p-4">
                      <div className="flex items-start justify-between mb-1">
                        <h4 className="font-semibold text-gray-800">{dest.name}</h4>
                        <div className="flex items-center gap-1">
                          <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                          <span className="text-xs font-medium">{dest.rating}</span>
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 mb-1 capitalize">{dest.category} • {dest.distance}</p>
                      <p className="text-xs text-gray-600 mb-3">{dest.description}</p>
                      <p className="text-xs text-blue-600 font-medium mb-3">{dest.visitors.toLocaleString()} visitors</p>
                      <div className="flex gap-2">
                        <button onClick={() => openEditDest(dest)} className="flex-1 flex items-center justify-center gap-1 py-2 border border-gray-200 rounded-lg text-xs hover:bg-gray-50 transition-colors">
                          <Edit className="h-3.5 w-3.5" /> Edit
                        </button>
                        <button onClick={() => deleteDest(dest.id)} className="flex-1 flex items-center justify-center gap-1 py-2 border border-red-200 text-red-600 rounded-lg text-xs hover:bg-red-50 transition-colors">
                          <Trash2 className="h-3.5 w-3.5" /> Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── SELLERS ── */}
          {activeTab === "sellers" && (
            <div className="space-y-4">
              <div className="relative w-64">
                <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search sellers..."
                  className="pl-9 pr-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-green-400 w-full" />
              </div>

              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-100">
                    <tr>
                      {["Seller", "Category", "Products", "Joined", "Status", "Actions"].map(h => (
                        <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-600">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {filteredSellers.map(seller => (
                      <tr key={seller.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-3">
                          <p className="text-sm font-medium text-gray-800">{seller.name}</p>
                          <p className="text-xs text-gray-500">{seller.email}</p>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600">{seller.category}</td>
                        <td className="px-4 py-3 text-sm text-gray-600">{seller.products}</td>
                        <td className="px-4 py-3 text-xs text-gray-500">{seller.joined}</td>
                        <td className="px-4 py-3"><Badge status={seller.status} /></td>
                        <td className="px-4 py-3">
                          <div className="flex gap-1">
                            {seller.status === "pending" && (
                              <>
                                <button onClick={() => updateSellerStatus(seller.id, "approved")} className="p-1.5 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors" title="Approve">
                                  <Check className="h-3.5 w-3.5" />
                                </button>
                                <button onClick={() => updateSellerStatus(seller.id, "rejected")} className="p-1.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors" title="Reject">
                                  <X className="h-3.5 w-3.5" />
                                </button>
                              </>
                            )}
                            {seller.status === "approved" && (
                              <button onClick={() => updateSellerStatus(seller.id, "rejected")} className="p-1.5 bg-gray-200 text-gray-600 rounded-lg hover:bg-gray-300 transition-colors text-xs px-2">
                                Suspend
                              </button>
                            )}
                            {seller.status === "rejected" && (
                              <button onClick={() => updateSellerStatus(seller.id, "approved")} className="p-1.5 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors text-xs px-2">
                                Restore
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ── USERS ── */}
          {activeTab === "users" && (
            <div className="space-y-4">
              <div className="relative w-64">
                <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search users..."
                  className="pl-9 pr-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-green-400 w-full" />
              </div>

              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-100">
                    <tr>
                      {["User", "Role", "Visits", "Joined", "Status", "Action"].map(h => (
                        <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-600">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {filteredUsers.map(user => (
                      <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                              <span className="text-white text-xs font-bold">{user.name[0]}</span>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-800">{user.name}</p>
                              <p className="text-xs text-gray-500">{user.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3"><Badge status={user.role} /></td>
                        <td className="px-4 py-3 text-sm text-gray-600">{user.visits}</td>
                        <td className="px-4 py-3 text-xs text-gray-500">{user.joined}</td>
                        <td className="px-4 py-3"><Badge status={user.status} /></td>
                        <td className="px-4 py-3">
                          <button onClick={() => toggleUserStatus(user.id)}
                            className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-colors ${user.status === "active" ? "bg-red-50 text-red-600 hover:bg-red-100" : "bg-green-50 text-green-600 hover:bg-green-100"}`}>
                            {user.status === "active" ? "Deactivate" : "Activate"}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ── ANALYTICS ── */}
          {activeTab === "analytics" && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard icon={Globe} label="Total Visitors" value={analyticsData.totalVisitors.toLocaleString()} growth="+18%" color="bg-blue-500" />
                <StatCard icon={TrendingUp} label="Revenue Growth" value="₹24.8L" growth={analyticsData.revenueGrowth} color="bg-green-500" />
                <StatCard icon={Star} label="Avg. Rating" value="4.6 ★" color="bg-yellow-500" />
                <StatCard icon={ShoppingBag} label="Active Sellers" value={sellers.filter(s => s.status === "approved").length} color="bg-purple-500" />
              </div>

              {/* Monthly Visitors Chart */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h3 className="font-bold text-gray-800 mb-6">Monthly Visitors (2024-25)</h3>
                <div className="flex items-end gap-3 h-48">
                  {analyticsData.monthlyVisitors.map((m) => {
                    const maxVal = 13200
                    const heightPercent = (m.visitors / maxVal) * 100
                    return (
                      <div key={m.month} className="flex-1 flex flex-col items-center gap-2">
                        <span className="text-xs text-gray-500">{m.visitors.toLocaleString()}</span>
                        <div className="w-full rounded-t-lg bg-gradient-to-t from-green-600 to-teal-400 transition-all hover:opacity-80"
                          style={{ height: `${heightPercent}%` }}></div>
                        <span className="text-xs text-gray-600 font-medium">{m.month}</span>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Top Destinations Table */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h3 className="font-bold text-gray-800 mb-4">Top Destinations by Visitors</h3>
                <div className="space-y-3">
                  {analyticsData.topDestinations.map((dest, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <span className="w-7 h-7 bg-green-100 text-green-700 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">{i + 1}</span>
                      <div className="flex-1">
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium text-gray-700">{dest.name}</span>
                          <span className="text-sm text-gray-500">{dest.visitors.toLocaleString()}</span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-2">
                          <div className="bg-gradient-to-r from-green-500 to-teal-500 h-2 rounded-full transition-all"
                            style={{ width: `${(dest.visitors / 21560) * 100}%` }}></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Add/Edit Destination Modal */}
      {showDestModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
            <div className="flex items-center justify-between p-6 border-b">
              <h3 className="text-lg font-bold text-gray-800">{editingDest ? "Edit Destination" : "Add New Destination"}</h3>
              <button onClick={() => setShowDestModal(false)} className="p-2 hover:bg-gray-100 rounded-xl">
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">Name *</label>
                <input value={destForm.name} onChange={e => setDestForm(p => ({ ...p, name: e.target.value }))}
                  placeholder="Destination name" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-green-400" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">Category</label>
                <select value={destForm.category} onChange={e => setDestForm(p => ({ ...p, category: e.target.value }))}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-green-400">
                  {["wildlife", "waterfall", "spiritual", "adventure", "culture"].map(c => (
                    <option key={c} value={c} className="capitalize">{c}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">Description</label>
                <textarea value={destForm.description} onChange={e => setDestForm(p => ({ ...p, description: e.target.value }))}
                  placeholder="Short description" rows={3}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-green-400 resize-none" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">Distance from Ranchi</label>
                <input value={destForm.distance} onChange={e => setDestForm(p => ({ ...p, distance: e.target.value }))}
                  placeholder="e.g. 45 km" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-green-400" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">Status</label>
                <select value={destForm.status} onChange={e => setDestForm(p => ({ ...p, status: e.target.value }))}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-green-400">
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>
            <div className="flex gap-3 p-6 border-t">
              <button onClick={() => setShowDestModal(false)} className="flex-1 py-2.5 border border-gray-200 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors">
                Cancel
              </button>
              <button onClick={saveDest} className="flex-1 py-2.5 bg-green-600 text-white rounded-xl text-sm font-medium hover:bg-green-700 transition-colors">
                {editingDest ? "Save Changes" : "Add Destination"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
