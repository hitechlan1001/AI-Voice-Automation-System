'use client';

import { useState, useEffect } from 'react';
import { Save, Play, Settings } from 'lucide-react';
import { VoiceAgent } from '@/types';

export default function VoiceAgentSettings() {
  const [agents, setAgents] = useState<VoiceAgent[]>([]);
  const [selectedAgent, setSelectedAgent] = useState<VoiceAgent | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    script: '',
    voice: 'sarah',
    speed: 1.0,
    pitch: 1.0,
  });

  useEffect(() => {
    fetchAgents();
  }, []);

  const fetchAgents = async () => {
    // Mock data - replace with actual API call
    const mockAgents: VoiceAgent[] = [
      {
        id: '1',
        name: 'MCA Lead Qualification Agent',
        description: 'Primary agent for qualifying merchant cash advance leads',
        script: `Hello! This is Sarah from Business Funding Solutions. I'm calling to discuss a quick funding opportunity for your business. Do you have a moment to talk?

[If yes] Great! I'd like to ask you a few quick questions to see if we can help your business get the funding it needs.

First, what type of business do you own?
[Wait for response]

How long have you been in business?
[Wait for response]

What's your approximate monthly revenue?
[Wait for response]

Do you have any existing business loans or credit lines?
[Wait for response]

What's your credit score range - excellent (750+), good (650-749), fair (550-649), or poor (below 550)?
[Wait for response]

How much funding are you looking for?
[Wait for response]

What would you use the funds for?
[Wait for response]

Based on your responses, it sounds like you might be a good fit for our merchant cash advance program. Would you be interested in speaking with one of our funding specialists?

[If yes] Perfect! I'll have someone call you back within the next business day. What's the best email address to send you some information?

[If no] I understand. Thank you for your time today. Have a great day!`,
        voiceSettings: {
          voice: 'sarah',
          speed: 1.0,
          pitch: 1.0,
        },
        isActive: true,
        createdAt: new Date('2024-01-01'),
      },
    ];
    setAgents(mockAgents);
    if (mockAgents.length > 0) {
      setSelectedAgent(mockAgents[0]);
      setFormData({
        name: mockAgents[0].name,
        description: mockAgents[0].description,
        script: mockAgents[0].script,
        voice: mockAgents[0].voiceSettings.voice,
        speed: mockAgents[0].voiceSettings.speed,
        pitch: mockAgents[0].voiceSettings.pitch,
      });
    }
  };

  const handleSave = async () => {
    if (!selectedAgent) return;

    const updatedAgent = {
      ...selectedAgent,
      name: formData.name,
      description: formData.description,
      script: formData.script,
      voiceSettings: {
        voice: formData.voice,
        speed: formData.speed,
        pitch: formData.pitch,
      },
    };

    setAgents(agents.map(agent => 
      agent.id === selectedAgent.id ? updatedAgent : agent
    ));
    setSelectedAgent(updatedAgent);
    setIsEditing(false);
  };

  const handleTestVoice = () => {
    // Implement voice testing functionality
    console.log('Testing voice with settings:', formData);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">Voice Agent Settings</h2>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Settings className="h-4 w-4 mr-2" />
          {isEditing ? 'Cancel Edit' : 'Edit Agent'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Agent List */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow">
            <div className="p-4 border-b">
              <h3 className="text-lg font-medium text-gray-900">Voice Agents</h3>
            </div>
            <div className="divide-y divide-gray-200">
              {agents.map((agent) => (
                <div
                  key={agent.id}
                  onClick={() => {
                    setSelectedAgent(agent);
                    setFormData({
                      name: agent.name,
                      description: agent.description,
                      script: agent.script,
                      voice: agent.voiceSettings.voice,
                      speed: agent.voiceSettings.speed,
                      pitch: agent.voiceSettings.pitch,
                    });
                    setIsEditing(false);
                  }}
                  className={`p-4 cursor-pointer hover:bg-gray-50 ${
                    selectedAgent?.id === agent.id ? 'bg-blue-50 border-r-2 border-blue-500' : ''
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">{agent.name}</h4>
                      <p className="text-xs text-gray-500 mt-1">{agent.description}</p>
                    </div>
                    <div className={`w-2 h-2 rounded-full ${
                      agent.isActive ? 'bg-green-400' : 'bg-gray-400'
                    }`} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Agent Details */}
        <div className="lg:col-span-2">
          {selectedAgent && (
            <div className="bg-white rounded-lg shadow">
              <div className="p-6">
                <div className="space-y-6">
                  {/* Basic Info */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Agent Name
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-sm text-gray-900">{selectedAgent.name}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>
                    {isEditing ? (
                      <textarea
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-sm text-gray-900">{selectedAgent.description}</p>
                    )}
                  </div>

                  {/* Voice Settings */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Voice
                      </label>
                      {isEditing ? (
                        <select
                          value={formData.voice}
                          onChange={(e) => setFormData({ ...formData, voice: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="sarah">Sarah (Female)</option>
                          <option value="michael">Michael (Male)</option>
                          <option value="emma">Emma (Female)</option>
                          <option value="david">David (Male)</option>
                        </select>
                      ) : (
                        <p className="text-sm text-gray-900 capitalize">{selectedAgent.voiceSettings.voice}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Speed: {formData.speed}x
                      </label>
                      {isEditing ? (
                        <input
                          type="range"
                          min="0.5"
                          max="2.0"
                          step="0.1"
                          value={formData.speed}
                          onChange={(e) => setFormData({ ...formData, speed: parseFloat(e.target.value) })}
                          className="w-full"
                        />
                      ) : (
                        <p className="text-sm text-gray-900">{selectedAgent.voiceSettings.speed}x</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Pitch: {formData.pitch}x
                      </label>
                      {isEditing ? (
                        <input
                          type="range"
                          min="0.5"
                          max="2.0"
                          step="0.1"
                          value={formData.pitch}
                          onChange={(e) => setFormData({ ...formData, pitch: parseFloat(e.target.value) })}
                          className="w-full"
                        />
                      ) : (
                        <p className="text-sm text-gray-900">{selectedAgent.voiceSettings.pitch}x</p>
                      )}
                    </div>
                  </div>

                  {/* Script */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Script
                    </label>
                    {isEditing ? (
                      <textarea
                        value={formData.script}
                        onChange={(e) => setFormData({ ...formData, script: e.target.value })}
                        rows={15}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
                        placeholder="Enter your conversation script here..."
                      />
                    ) : (
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <pre className="text-sm text-gray-900 whitespace-pre-wrap font-mono">
                          {selectedAgent.script}
                        </pre>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  {isEditing && (
                    <div className="flex space-x-3">
                      <button
                        onClick={handleSave}
                        className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                      >
                        <Save className="h-4 w-4 mr-2" />
                        Save Changes
                      </button>
                      <button
                        onClick={handleTestVoice}
                        className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                      >
                        <Play className="h-4 w-4 mr-2" />
                        Test Voice
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
