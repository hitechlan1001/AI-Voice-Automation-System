'use client';

import { useState, useEffect } from 'react';
import { Play, Pause, Settings, Plus, Users, Phone, Calendar } from 'lucide-react';
import { Campaign } from '@/types';

export default function CampaignManager() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const fetchCampaigns = async () => {
    // Mock data - replace with actual API call
    const mockCampaigns: Campaign[] = [
      {
        id: '1',
        name: 'MCA Lead Generation Q1',
        description: 'Primary campaign for merchant cash advance lead generation',
        voiceAgentId: 'agent-1',
        leadList: ['lead-1', 'lead-2', 'lead-3'],
        status: 'active',
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-15'),
      },
      {
        id: '2',
        name: 'Follow-up Campaign',
        description: 'Follow-up calls for previously contacted leads',
        voiceAgentId: 'agent-2',
        leadList: ['lead-4', 'lead-5'],
        status: 'paused',
        createdAt: new Date('2024-01-10'),
        updatedAt: new Date('2024-01-12'),
      },
    ];
    setCampaigns(mockCampaigns);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'paused': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      case 'draft': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const toggleCampaignStatus = async (campaignId: string, currentStatus: string) => {
    const newStatus = currentStatus === 'active' ? 'paused' : 'active';
    
    // Update campaign status
    setCampaigns(campaigns.map(campaign => 
      campaign.id === campaignId 
        ? { ...campaign, status: newStatus as 'active' | 'paused', updatedAt: new Date() }
        : campaign
    ));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">Campaigns</h2>
        <button
          onClick={() => setIsCreating(true)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Create Campaign
        </button>
      </div>

      {/* Campaigns Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {campaigns.map((campaign) => (
          <div key={campaign.id} className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-medium text-gray-900">{campaign.name}</h3>
                <p className="text-sm text-gray-600 mt-1">{campaign.description}</p>
              </div>
              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(campaign.status)}`}>
                {campaign.status}
              </span>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex items-center text-sm text-gray-600">
                <Users className="h-4 w-4 mr-2" />
                {campaign.leadList.length} leads
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Phone className="h-4 w-4 mr-2" />
                Agent: {campaign.voiceAgentId}
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Calendar className="h-4 w-4 mr-2" />
                Created: {new Date(campaign.createdAt).toLocaleDateString()}
              </div>
            </div>

            <div className="flex space-x-2">
              <button
                onClick={() => toggleCampaignStatus(campaign.id, campaign.status)}
                className={`flex-1 flex items-center justify-center px-3 py-2 rounded-md text-sm font-medium ${
                  campaign.status === 'active'
                    ? 'bg-red-100 text-red-700 hover:bg-red-200'
                    : 'bg-green-100 text-green-700 hover:bg-green-200'
                }`}
              >
                {campaign.status === 'active' ? (
                  <>
                    <Pause className="h-4 w-4 mr-1" />
                    Pause
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4 mr-1" />
                    Start
                  </>
                )}
              </button>
              <button
                onClick={() => setSelectedCampaign(campaign)}
                className="px-3 py-2 text-gray-600 hover:text-gray-900"
              >
                <Settings className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Create Campaign Modal */}
      {isCreating && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Create New Campaign</h3>
            
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Campaign Name
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter campaign name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={3}
                  placeholder="Enter campaign description"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Voice Agent
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="">Select voice agent</option>
                  <option value="agent-1">MCA Lead Agent</option>
                  <option value="agent-2">Follow-up Agent</option>
                </select>
              </div>
            </form>
            
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setIsCreating(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-900"
              >
                Cancel
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Create Campaign
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Campaign Details Modal */}
      {selectedCampaign && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Campaign Details: {selectedCampaign.name}
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <p className="text-sm text-gray-600">{selectedCampaign.description}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Status</label>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(selectedCampaign.status)}`}>
                    {selectedCampaign.status}
                  </span>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Lead Count</label>
                  <p className="text-sm text-gray-600">{selectedCampaign.leadList.length} leads</p>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Voice Agent</label>
                <p className="text-sm text-gray-600">{selectedCampaign.voiceAgentId}</p>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setSelectedCampaign(null)}
                className="px-4 py-2 text-gray-600 hover:text-gray-900"
              >
                Close
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Edit Campaign
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
