'use client';

import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

interface AnalyticsData {
  date: string;
  calls: number;
  qualified: number;
  cost: number;
}

export default function CallAnalytics() {
  const [timeRange, setTimeRange] = useState('7d');
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData[]>([]);

  useEffect(() => {
    // Mock data - replace with actual API call
    const mockData: AnalyticsData[] = [
      { date: '2024-01-01', calls: 150, qualified: 4, cost: 30.00 },
      { date: '2024-01-02', calls: 180, qualified: 6, cost: 36.00 },
      { date: '2024-01-03', calls: 165, qualified: 5, cost: 33.00 },
      { date: '2024-01-04', calls: 200, qualified: 7, cost: 40.00 },
      { date: '2024-01-05', calls: 175, qualified: 5, cost: 35.00 },
      { date: '2024-01-06', calls: 190, qualified: 6, cost: 38.00 },
      { date: '2024-01-07', calls: 210, qualified: 8, cost: 42.00 },
    ];
    setAnalyticsData(mockData);
  }, [timeRange]);

  const totalCalls = analyticsData.reduce((sum, day) => sum + day.calls, 0);
  const totalQualified = analyticsData.reduce((sum, day) => sum + day.qualified, 0);
  const totalCost = analyticsData.reduce((sum, day) => sum + day.cost, 0);
  const conversionRate = totalCalls > 0 ? (totalQualified / totalCalls) * 100 : 0;

  return (
    <div className="space-y-6">
      {/* Time Range Selector */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">Call Analytics</h2>
        <div className="flex space-x-2">
          {['7d', '30d', '90d'].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-3 py-1 rounded-md text-sm font-medium ${
                timeRange === range
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <p className="text-sm text-gray-600">Total Calls</p>
          <p className="text-2xl font-bold text-gray-900">{totalCalls.toLocaleString()}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <p className="text-sm text-gray-600">Qualified Leads</p>
          <p className="text-2xl font-bold text-green-600">{totalQualified}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <p className="text-sm text-gray-600">Conversion Rate</p>
          <p className="text-2xl font-bold text-blue-600">{conversionRate.toFixed(2)}%</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <p className="text-sm text-gray-600">Total Cost</p>
          <p className="text-2xl font-bold text-purple-600">${totalCost.toFixed(2)}</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Calls Over Time */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Calls Over Time</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={analyticsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="calls" stroke="#3B82F6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Qualified Leads */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Qualified Leads</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={analyticsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="qualified" fill="#10B981" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Cost Analysis */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Cost Analysis</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={analyticsData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip formatter={(value) => [`$${value}`, 'Cost']} />
            <Line type="monotone" dataKey="cost" stroke="#8B5CF6" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

