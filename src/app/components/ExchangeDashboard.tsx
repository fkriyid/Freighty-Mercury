import { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, RefreshCw, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface ExchangeRate {
  pair: string;
  rate: number;
  change: number;
  changePercent: number;
  lastUpdate: string;
}

const generateWeeklyData = (baseRate: number, volatility: number) => {
  const data = [];
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  let currentRate = baseRate;
  
  for (let i = 0; i < 7; i++) {
    const change = (Math.random() - 0.5) * volatility;
    currentRate += change;
    data.push({
      day: days[i],
      rate: Number(currentRate.toFixed(2))
    });
  }
  
  return data;
};

export function ExchangeDashboard() {
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [selectedPair, setSelectedPair] = useState('USD/IDR');
  
  // Mock exchange rate data - in production, this would come from an API
  const [exchangeRates, setExchangeRates] = useState<ExchangeRate[]>([
    {
      pair: 'USD/IDR',
      rate: 15742.50,
      change: 125.30,
      changePercent: 0.80,
      lastUpdate: new Date().toISOString()
    },
    {
      pair: 'EUR/USD',
      rate: 1.0856,
      change: -0.0023,
      changePercent: -0.21,
      lastUpdate: new Date().toISOString()
    },
    {
      pair: 'JPY/IDR',
      rate: 104.25,
      change: 1.45,
      changePercent: 1.41,
      lastUpdate: new Date().toISOString()
    },
    {
      pair: 'GBP/USD',
      rate: 1.2734,
      change: 0.0089,
      changePercent: 0.70,
      lastUpdate: new Date().toISOString()
    },
    {
      pair: 'EUR/IDR',
      rate: 17089.15,
      change: -45.20,
      changePercent: -0.26,
      lastUpdate: new Date().toISOString()
    },
    {
      pair: 'SGD/IDR',
      rate: 11674.80,
      change: 89.60,
      changePercent: 0.77,
      lastUpdate: new Date().toISOString()
    }
  ]);

  const weeklyData = {
    'USD/IDR': generateWeeklyData(15650, 100),
    'EUR/USD': generateWeeklyData(1.085, 0.005),
    'JPY/IDR': generateWeeklyData(103, 2),
    'GBP/USD': generateWeeklyData(1.270, 0.008),
    'EUR/IDR': generateWeeklyData(17100, 120),
    'SGD/IDR': generateWeeklyData(11600, 80)
  };

  const handleRefresh = () => {
    // Simulate rate update
    setExchangeRates(rates => rates.map(rate => ({
      ...rate,
      rate: rate.rate + (Math.random() - 0.5) * (rate.rate * 0.001),
      change: (Math.random() - 0.5) * (rate.rate * 0.002),
      changePercent: (Math.random() - 0.5) * 2,
      lastUpdate: new Date().toISOString()
    })));
    setLastUpdated(new Date());
  };

  const selectedRate = exchangeRates.find(r => r.pair === selectedPair);
  const chartData = weeklyData[selectedPair as keyof typeof weeklyData];

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[#0f172a] dark:text-white">Real-Time Exchange Rates</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Monitor live currency data for accurate freight pricing calculations
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-xs text-gray-500">Last updated</p>
            <p className="text-sm text-gray-700">{lastUpdated.toLocaleTimeString()}</p>
          </div>
          <Button onClick={handleRefresh} variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Exchange Rate Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {exchangeRates.map((rate) => (
          <Card 
            key={rate.pair}
            className={`cursor-pointer transition-all ${
              selectedPair === rate.pair 
                ? 'ring-2 ring-orange-500 shadow-lg' 
                : 'hover:shadow-md'
            }`}
            onClick={() => setSelectedPair(rate.pair)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{rate.pair}</CardTitle>
                <Badge variant={rate.change >= 0 ? 'default' : 'destructive'} className={rate.change >= 0 ? 'bg-green-500' : ''}>
                  {rate.change >= 0 ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
                  {rate.changePercent >= 0 ? '+' : ''}{rate.changePercent.toFixed(2)}%
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-3xl text-[#0f172a] dark:text-white">
                {rate.rate.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
              <p className={`text-sm mt-1 ${rate.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {rate.change >= 0 ? '+' : ''}{rate.change.toFixed(2)} today
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Detailed Chart */}
      {selectedRate && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Weekly Trend: {selectedPair}</CardTitle>
                <CardDescription>Exchange rate movement over the past 7 days</CardDescription>
              </div>
              <Button className="bg-orange-500 hover:bg-orange-600">
                Use This Rate <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis 
                    dataKey="day" 
                    stroke="#6b7280"
                    style={{ fontSize: '12px' }}
                  />
                  <YAxis 
                    stroke="#6b7280"
                    style={{ fontSize: '12px' }}
                    domain={['auto', 'auto']}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#fff',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="rate" 
                    stroke="#f97316" 
                    strokeWidth={2}
                    dot={{ fill: '#f97316', r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-4 gap-4 mt-6 pt-6 border-t">
              <div>
                <p className="text-xs text-gray-500">Current Rate</p>
                <p className="text-lg text-[#0f172a] mt-1">{selectedRate.rate.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Weekly Change</p>
                <p className={`text-lg mt-1 ${selectedRate.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {selectedRate.change >= 0 ? '+' : ''}{selectedRate.changePercent.toFixed(2)}%
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Week High</p>
                <p className="text-lg text-[#0f172a] mt-1">
                  {Math.max(...chartData.map(d => d.rate)).toFixed(2)}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Week Low</p>
                <p className="text-lg text-[#0f172a] mt-1">
                  {Math.min(...chartData.map(d => d.rate)).toFixed(2)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Info Card */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="pt-6">
          <p className="text-sm text-gray-700">
            <strong>Note:</strong> Exchange rates are indicative and update every few minutes. 
            For official quotes and transactions, please confirm rates with your bank or payment provider. 
            Historical data helps identify trends for better pricing decisions.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
