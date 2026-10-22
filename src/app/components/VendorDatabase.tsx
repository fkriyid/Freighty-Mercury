import { useState } from 'react';
import { Search, Plus, Filter, Star, RefreshCw } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

const vendors = [
  {
    id: 'V001',
    name: 'Pacific Maritime Lines',
    service: 'Sea Freight (FCL)',
    route: 'Surabaya → Rotterdam',
    rate: '$2,100',
    currency: 'USD',
    validUntil: '2024-12-31',
    rating: 4.8,
    reliability: 'Excellent'
  },
  {
    id: 'V002',
    name: 'Sky Express Cargo',
    service: 'Air Freight',
    route: 'Jakarta → Los Angeles',
    rate: '$5.20/kg',
    currency: 'USD',
    validUntil: '2024-11-30',
    rating: 4.5,
    reliability: 'Good'
  },
  {
    id: 'V003',
    name: 'Euro Shipping Co.',
    service: 'Sea Freight (FCL)',
    route: 'Surabaya → Hamburg',
    rate: '€1,850',
    currency: 'EUR',
    validUntil: '2024-12-15',
    rating: 4.7,
    reliability: 'Excellent'
  },
  {
    id: 'V004',
    name: 'Asia Freight Solutions',
    service: 'Sea Freight (LCL)',
    route: 'Jakarta → Singapore',
    rate: '$125/CBM',
    currency: 'USD',
    validUntil: '2024-11-20',
    rating: 4.3,
    reliability: 'Good'
  },
  {
    id: 'V005',
    name: 'Global Air Express',
    service: 'Air Freight',
    route: 'Surabaya → Dubai',
    rate: '$4.80/kg',
    currency: 'USD',
    validUntil: '2024-12-10',
    rating: 4.6,
    reliability: 'Excellent'
  },
  {
    id: 'V006',
    name: 'Ocean Gateway Logistics',
    service: 'Sea Freight (FCL)',
    route: 'Jakarta → Shanghai',
    rate: '$1,450',
    currency: 'USD',
    validUntil: '2024-12-25',
    rating: 4.4,
    reliability: 'Good'
  },
  {
    id: 'V007',
    name: 'Trans-Continental Shipping',
    service: 'Sea Freight (FCL)',
    route: 'Surabaya → Los Angeles',
    rate: '$2,350',
    currency: 'USD',
    validUntil: '2024-12-20',
    rating: 4.9,
    reliability: 'Excellent'
  },
  {
    id: 'V008',
    name: 'Swift Air Cargo',
    service: 'Air Freight',
    route: 'Jakarta → Frankfurt',
    rate: '$5.50/kg',
    currency: 'USD',
    validUntil: '2024-11-25',
    rating: 4.2,
    reliability: 'Good'
  }
];

export function VendorDatabase() {
  const [searchTerm, setSearchTerm] = useState('');
  const [serviceFilter, setServiceFilter] = useState('all');
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [vendorData, setVendorData] = useState(vendors);

  const filteredVendors = vendorData.filter(vendor => {
    const matchesSearch = 
      vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vendor.route.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vendor.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesService = serviceFilter === 'all' || vendor.service.includes(serviceFilter);
    
    return matchesSearch && matchesService;
  });

  const getReliabilityColor = (reliability: string) => {
    switch (reliability) {
      case 'Excellent':
        return 'bg-green-100 text-green-800';
      case 'Good':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleUpdateRates = () => {
    // Simulate fetching updated vendor rates
    setVendorData(vendors.map(vendor => {
      // Generate a random price variation (±5%)
      const variation = (Math.random() - 0.5) * 0.1; // -5% to +5%
      let newRate = vendor.rate;
      
      if (vendor.rate.includes('$') || vendor.rate.includes('€')) {
        // Extract the numeric value
        const numericValue = parseFloat(vendor.rate.replace(/[^0-9.]/g, ''));
        const updatedValue = numericValue * (1 + variation);
        
        // Format back with currency symbol
        if (vendor.rate.includes('/kg')) {
          newRate = `${vendor.currency === 'EUR' ? '€' : '$'}${updatedValue.toFixed(2)}/kg`;
        } else if (vendor.rate.includes('/CBM')) {
          newRate = `$${Math.round(updatedValue)}/CBM`;
        } else {
          newRate = `${vendor.currency === 'EUR' ? '€' : '$'}${Math.round(updatedValue).toLocaleString()}`;
        }
      }
      
      return {
        ...vendor,
        rate: newRate
      };
    }));
    
    setLastUpdated(new Date());
  };

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[#0f172a] dark:text-white">Vendor Rate Database</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Partner vendors and latest tariffs for freight services
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-xs text-gray-500 dark:text-gray-400">Last updated</p>
            <p className="text-sm text-gray-700 dark:text-gray-300">{lastUpdated.toLocaleTimeString()}</p>
          </div>
          <Button onClick={handleUpdateRates} variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Update Rates
          </Button>
          <Button className="bg-orange-500 hover:bg-orange-600">
            <Plus className="h-4 w-4 mr-2" />
            Add Vendor
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-gray-600 dark:text-gray-400">Total Vendors</p>
            <p className="text-3xl text-[#0f172a] dark:text-white mt-2">{vendorData.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-gray-600 dark:text-gray-400">Sea Freight</p>
            <p className="text-3xl text-blue-600 mt-2">
              {vendorData.filter(v => v.service.includes('Sea')).length}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-gray-600 dark:text-gray-400">Air Freight</p>
            <p className="text-3xl text-orange-600 mt-2">
              {vendorData.filter(v => v.service.includes('Air')).length}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-gray-600 dark:text-gray-400">Avg. Rating</p>
            <p className="text-3xl text-green-600 mt-2">
              {(vendorData.reduce((sum, v) => sum + v.rating, 0) / vendorData.length).toFixed(1)}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search by vendor name, route, or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={serviceFilter} onValueChange={setServiceFilter}>
              <SelectTrigger className="w-[200px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by service" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Services</SelectItem>
                <SelectItem value="Sea Freight">Sea Freight</SelectItem>
                <SelectItem value="Air Freight">Air Freight</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Vendor Table */}
      <Card>
        <CardHeader>
          <CardTitle>Partner Vendors</CardTitle>
          <CardDescription>
            Current rates and contract details from {filteredVendors.length} vendors
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Vendor ID</TableHead>
                <TableHead>Vendor Name</TableHead>
                <TableHead>Service Type</TableHead>
                <TableHead>Route</TableHead>
                <TableHead>Rate</TableHead>
                <TableHead>Valid Until</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Reliability</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredVendors.map((vendor) => (
                <TableRow key={vendor.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                  <TableCell className="text-[#0f172a] dark:text-white">{vendor.id}</TableCell>
                  <TableCell>
                    <p className="text-[#0f172a] dark:text-white">{vendor.name}</p>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={
                      vendor.service.includes('Sea') 
                        ? 'border-blue-500 text-blue-700' 
                        : 'border-orange-500 text-orange-700'
                    }>
                      {vendor.service}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-gray-700 dark:text-gray-300">{vendor.route}</TableCell>
                  <TableCell className="text-[#0f172a] dark:text-white">{vendor.rate}</TableCell>
                  <TableCell className="text-gray-600 dark:text-gray-400">{vendor.validUntil}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-[#0f172a] dark:text-white">{vendor.rating}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getReliabilityColor(vendor.reliability)}>
                      {vendor.reliability}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}