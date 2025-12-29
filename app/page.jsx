import React from 'react';
import { ArrowRight, Users, FileText, Settings, BarChart3 } from "lucide-react";
import Link from 'next/link';

const Homepage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <div className="container mx-auto px-6 py-20">
        {/* Hero Section */}
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Welcome Message */}
          <div className="space-y-4">
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Welcome back, Admin
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Manage your business operations with ease. Access insights, monitor performance, and control your system from one place.
            </p>
          </div>

          {/* CTA Button */}
          <div className="pt-6">
            <Link href="/dashboard" className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              Go to Dashboard
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-16">

            <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-lg p-6 hover:bg-slate-800 transition-colors">
              <div className="flex items-center justify-center mb-2">
                <Users className="w-8 h-8 text-blue-400" />
              </div>
              <div className="text-2xl font-bold">1,234</div>
              <div className="text-sm text-slate-400">Total Users</div>
            </div>

            <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-lg p-6 hover:bg-slate-800 transition-colors">
              <div className="flex items-center justify-center mb-2">
                <BarChart3 className="w-8 h-8 text-cyan-400" />
              </div>
              <div className="text-2xl font-bold">$45.2K</div>
              <div className="text-sm text-slate-400">Revenue</div>
            </div>

            <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-lg p-6 hover:bg-slate-800 transition-colors">
              <div className="flex items-center justify-center mb-2">
                <FileText className="w-8 h-8 text-purple-400" />
              </div>
              <div className="text-2xl font-bold">89</div>
              <div className="text-sm text-slate-400">Reports</div>
            </div>

            <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-lg p-6 hover:bg-slate-800 transition-colors">
              <div className="flex items-center justify-center mb-2">
                <Settings className="w-8 h-8 text-green-400" />
              </div>
              <div className="text-2xl font-bold">All Good</div>
              <div className="text-sm text-slate-400">System Status</div>
            </div>

          </div>

          {/* Quick Links */}
          <div className="pt-12">
            <p className="text-sm text-slate-400 mb-4">Quick Access</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="" className="px-6 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-lg transition-colors">
              Users
              </Link>
              <Link href="" className="px-6 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-lg transition-colors">
              Reports
              </Link>
              <Link href="" className="px-6 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-lg transition-colors">
              Settings
              </Link>
              <Link href="" className="px-6 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-lg transition-colors">
              Analytics
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Homepage