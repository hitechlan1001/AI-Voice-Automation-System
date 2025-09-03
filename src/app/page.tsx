'use client';

import { useState } from 'react';
import { Phone, Users, TrendingUp, DollarSign, Play, Pause, Settings } from 'lucide-react';
import CallAnalytics from '@/components/CallAnalytics';
import LeadList from '@/components/LeadList';
import CampaignManager from '@/components/CampaignManager';
import VoiceAgentSettings from '@/components/VoiceAgentSettings';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isCalling, setIsCalling] = useState(false);

  const stats = {
    totalCalls: 1247,
    qualifiedLeads: 37,
    conversionRate: 2.97,
    totalCost: 249.40,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <Phone className="h-8 w-8 text-blue-600 mr-3" />
              <h1 className="text-2xl font-bold text-gray-900">
                AI Voice Automation System
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsCalling(!isCalling)}
                className={`flex items-center px-4 py-2 rounded-lg font-medium ${
                  isCalling
                    ? 'bg-red-100 text-red-700 hover:bg-red-200'
                    : 'bg-green-100 text-green-700 hover:bg-green-200'
                }`}
              >
                {isCalling ? (
                  <>
                    <Pause className="h-4 w-4 mr-2" />
                    Stop Campaign
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4 mr-2" />
                    Start Campaign
                  </>
                )}
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <Settings className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: TrendingUp },
              { id: 'leads', label: 'Leads', icon: Users },
              { id: 'campaigns', label: 'Campaigns', icon: Phone },
              { id: 'settings', label: 'Settings', icon: Settings },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon className="h-4 w-4 mr-2" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center">
                  <Phone className="h-8 w-8 text-blue-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Calls</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.totalCalls.toLocaleString()}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center">
                  <Users className="h-8 w-8 text-green-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Qualified Leads</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.qualifiedLeads}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center">
                  <TrendingUp className="h-8 w-8 text-purple-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Conversion Rate</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.conversionRate}%</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center">
                  <DollarSign className="h-8 w-8 text-yellow-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Cost</p>
                    <p className="text-2xl font-bold text-gray-900">${stats.totalCost.toFixed(2)}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Analytics */}
            <CallAnalytics />
          </div>
        )}

        {activeTab === 'leads' && <LeadList />}
        {activeTab === 'campaigns' && <CampaignManager />}
        {activeTab === 'settings' && <VoiceAgentSettings />}
      </main>
    </div>
  );
}