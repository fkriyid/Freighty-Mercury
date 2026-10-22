import { BookOpen, TrendingUp, Calculator, ArrowRight, DollarSign, Package, Ship } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';

interface DashboardOverviewProps {
  onNavigate: (page: string) => void;
}

export function DashboardOverview({ onNavigate }: DashboardOverviewProps) {
  const recentQuotes = [
    { id: 'Q-2024-1051', route: 'Surabaya → Rotterdam', incoterm: 'CIF', amount: '$12,450', date: '2024-11-01' },
    { id: 'Q-2024-1050', route: 'Jakarta → Los Angeles', incoterm: 'FOB', amount: '$8,920', date: '2024-10-31' },
    { id: 'Q-2024-1049', route: 'Surabaya → Hamburg', incoterm: 'DDP', amount: '$15,780', date: '2024-10-30' },
  ];

  const stats = [
    { label: 'Active Quotes', value: '24', icon: Package, color: 'text-blue-600' },
    { label: 'Avg. Quote Value', value: '$11.2K', icon: DollarSign, color: 'text-green-600' },
    { label: 'Shipments This Month', value: '18', icon: Ship, color: 'text-orange-600' },
  ];

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-[#0f172a] dark:text-white">Welcome back, Farhan</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">Here's what's happening with your freight operations today.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label}>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
                    <p className={`text-3xl mt-2 ${stat.color} dark:brightness-125`}>{stat.value}</p>
                  </div>
                  <Icon className={`h-12 w-12 ${stat.color} opacity-20`} />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick Access Cards */}
      <div>
        <h2 className="text-[#0f172a] dark:text-white mb-4">Quick Access</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => onNavigate('incoterms')}>
            <CardHeader>
              <div className="h-12 w-12 bg-orange-100 rounded-lg flex items-center justify-center mb-3">
                <BookOpen className="h-6 w-6 text-orange-600" />
              </div>
              <CardTitle>Incoterms Database</CardTitle>
              <CardDescription>
                Search and compare international commercial terms with visual cost breakdowns
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="ghost" className="text-orange-600 hover:text-orange-700 p-0">
                Explore Incoterms <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => onNavigate('exchange')}>
            <CardHeader>
              <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center mb-3">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
              <CardTitle>Exchange Rates</CardTitle>
              <CardDescription>
                Monitor live currency data and weekly trends for accurate pricing calculations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="ghost" className="text-orange-600 hover:text-orange-700 p-0">
                View Rates <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => onNavigate('calculator')}>
            <CardHeader>
              <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
                <Calculator className="h-6 w-6 text-blue-600" />
              </div>
              <CardTitle>Cost Calculator</CardTitle>
              <CardDescription>
                Calculate total shipment costs automatically using current exchange rates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="ghost" className="text-orange-600 hover:text-orange-700 p-0">
                Calculate Cost <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Recent Quotes */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Quotes</CardTitle>
          <CardDescription>Your latest pricing calculations and quotations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentQuotes.map((quote) => (
              <div key={quote.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                <div className="flex-1">
                  <p className="text-[#0f172a] dark:text-white">{quote.id}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{quote.route}</p>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <p className="text-xs text-gray-500 dark:text-gray-400">Incoterm</p>
                    <p className="text-sm text-[#0f172a] dark:text-white">{quote.incoterm}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-gray-500 dark:text-gray-400">Amount</p>
                    <p className="text-sm text-orange-600 dark:text-orange-500">{quote.amount}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-gray-500 dark:text-gray-400">Date</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{quote.date}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
