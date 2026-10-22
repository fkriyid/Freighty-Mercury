import { useState } from 'react';
import { Calculator, Download, Save, Plus } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Separator } from './ui/separator';
import { Badge } from './ui/badge';

const exchangeRates: Record<string, number> = {
  'USD': 1,
  'IDR': 15742.50,
  'EUR': 0.9211,
  'GBP': 0.7852,
  'JPY': 151.03,
  'SGD': 1.3485
};

const ports = [
  'Surabaya (SUB)',
  'Jakarta (JKT)',
  'Rotterdam (RTM)',
  'Los Angeles (LAX)',
  'Hamburg (HAM)',
  'Singapore (SIN)',
  'Shanghai (SHA)',
  'Dubai (DXB)'
];

const incoterms = ['EXW', 'FCA', 'FOB', 'CFR', 'CIF', 'CPT', 'CIP', 'DAP', 'DPU', 'DDP'];

const shippingModes = [
  { value: 'sea_fcl', label: 'Sea Freight (FCL)', baseRate: 2000 },
  { value: 'sea_lcl', label: 'Sea Freight (LCL)', baseRate: 150 },
  { value: 'air', label: 'Air Freight', baseRate: 5 },
  { value: 'truck', label: 'Truck', baseRate: 3 }
];

export function CostCalculator() {
  const [formData, setFormData] = useState({
    origin: '',
    destination: '',
    mode: '',
    weight: '',
    volume: '',
    incoterm: '',
    currency: 'USD'
  });

  const [calculated, setCalculated] = useState(false);
  const [costs, setCosts] = useState({
    freight: 0,
    handling: 0,
    customs: 0,
    insurance: 0,
    documentation: 0,
    margin: 0,
    total: 0
  });

  const handleCalculate = () => {
    const mode = shippingModes.find(m => m.value === formData.mode);
    if (!mode) return;

    const weight = parseFloat(formData.weight) || 0;
    const volume = parseFloat(formData.volume) || 0;

    // Calculate base freight cost
    let freight = 0;
    if (formData.mode === 'sea_fcl') {
      freight = mode.baseRate;
    } else if (formData.mode === 'sea_lcl') {
      freight = volume * mode.baseRate;
    } else if (formData.mode === 'air') {
      freight = weight * mode.baseRate;
    } else {
      freight = weight * mode.baseRate;
    }

    // Calculate additional costs based on Incoterm
    const handling = freight * 0.15;
    const customs = formData.incoterm === 'DDP' ? freight * 0.10 : 0;
    const insurance = ['CIF', 'CIP', 'DDP'].includes(formData.incoterm) ? freight * 0.03 : 0;
    const documentation = 75;
    const margin = (freight + handling + customs + insurance + documentation) * 0.10;
    const total = freight + handling + customs + insurance + documentation + margin;

    setCosts({
      freight,
      handling,
      customs,
      insurance,
      documentation,
      margin,
      total
    });
    setCalculated(true);
  };

  const convertCurrency = (amount: number) => {
    const rate = exchangeRates[formData.currency];
    return (amount * rate).toLocaleString('en-US', { 
      minimumFractionDigits: 2, 
      maximumFractionDigits: 2 
    });
  };

  const isFormValid = formData.origin && formData.destination && formData.mode && 
                      formData.weight && formData.incoterm && formData.currency;

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-[#0f172a] dark:text-white">Integrated Cost Calculator</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Calculate total shipment costs automatically using live exchange rates
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Input Form */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Shipment Details</CardTitle>
            <CardDescription>Enter your shipment information to calculate costs</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="origin">Origin Port</Label>
                <Select value={formData.origin} onValueChange={(value) => setFormData({ ...formData, origin: value })}>
                  <SelectTrigger id="origin">
                    <SelectValue placeholder="Select origin" />
                  </SelectTrigger>
                  <SelectContent>
                    {ports.map(port => (
                      <SelectItem key={port} value={port}>{port}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="destination">Destination Port</Label>
                <Select value={formData.destination} onValueChange={(value) => setFormData({ ...formData, destination: value })}>
                  <SelectTrigger id="destination">
                    <SelectValue placeholder="Select destination" />
                  </SelectTrigger>
                  <SelectContent>
                    {ports.map(port => (
                      <SelectItem key={port} value={port}>{port}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="mode">Shipping Mode</Label>
              <Select value={formData.mode} onValueChange={(value) => setFormData({ ...formData, mode: value })}>
                <SelectTrigger id="mode">
                  <SelectValue placeholder="Select shipping mode" />
                </SelectTrigger>
                <SelectContent>
                  {shippingModes.map(mode => (
                    <SelectItem key={mode.value} value={mode.value}>{mode.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="weight">Weight (kg)</Label>
                <Input
                  id="weight"
                  type="number"
                  placeholder="1000"
                  value={formData.weight}
                  onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="volume">Volume (CBM)</Label>
                <Input
                  id="volume"
                  type="number"
                  placeholder="10"
                  value={formData.volume}
                  onChange={(e) => setFormData({ ...formData, volume: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="incoterm">Incoterm</Label>
                <Select value={formData.incoterm} onValueChange={(value) => setFormData({ ...formData, incoterm: value })}>
                  <SelectTrigger id="incoterm">
                    <SelectValue placeholder="Select incoterm" />
                  </SelectTrigger>
                  <SelectContent>
                    {incoterms.map(term => (
                      <SelectItem key={term} value={term}>{term}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="currency">Currency</Label>
                <Select value={formData.currency} onValueChange={(value) => setFormData({ ...formData, currency: value })}>
                  <SelectTrigger id="currency">
                    <SelectValue placeholder="Select currency" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.keys(exchangeRates).map(curr => (
                      <SelectItem key={curr} value={curr}>{curr}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button 
                onClick={handleCalculate} 
                disabled={!isFormValid}
                className="bg-orange-500 hover:bg-orange-600 flex-1"
              >
                <Calculator className="h-4 w-4 mr-2" />
                Calculate Cost
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Reference</CardTitle>
            <CardDescription>Today's exchange rates</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {Object.entries(exchangeRates).map(([curr, rate]) => (
              <div key={curr} className="flex items-center justify-between py-2 border-b last:border-0">
                <span className="text-sm text-gray-600 dark:text-gray-400">{curr}</span>
                <span className="text-sm text-[#0f172a] dark:text-white">
                  {rate === 1 ? '1.00' : rate.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Results */}
      {calculated && (
        <Card className="border-2 border-orange-500">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl">Cost Breakdown</CardTitle>
                <CardDescription className="mt-2">
                  {formData.origin} → {formData.destination} | {formData.incoterm} | {formData.currency}
                </CardDescription>
              </div>
              <Badge className="bg-orange-500">Quote #{Math.floor(Math.random() * 10000)}</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between py-3">
                <div>
                  <p className="text-[#0f172a] dark:text-white">Base Freight</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {formData.mode.replace('_', ' ').toUpperCase()} charges
                  </p>
                </div>
                <p className="text-lg text-[#0f172a] dark:text-white">{formData.currency} {convertCurrency(costs.freight)}</p>
              </div>

              <div className="flex items-center justify-between py-3">
                <div>
                  <p className="text-[#0f172a]">Handling & Terminal</p>
                  <p className="text-xs text-gray-500 mt-1">Origin and destination charges</p>
                </div>
                <p className="text-lg text-[#0f172a]">{formData.currency} {convertCurrency(costs.handling)}</p>
              </div>

              {costs.insurance > 0 && (
                <div className="flex items-center justify-between py-3">
                  <div>
                    <p className="text-[#0f172a]">Insurance</p>
                    <p className="text-xs text-gray-500 mt-1">Included in {formData.incoterm}</p>
                  </div>
                  <p className="text-lg text-[#0f172a]">{formData.currency} {convertCurrency(costs.insurance)}</p>
                </div>
              )}

              {costs.customs > 0 && (
                <div className="flex items-center justify-between py-3">
                  <div>
                    <p className="text-[#0f172a]">Customs Clearance</p>
                    <p className="text-xs text-gray-500 mt-1">Included in {formData.incoterm}</p>
                  </div>
                  <p className="text-lg text-[#0f172a]">{formData.currency} {convertCurrency(costs.customs)}</p>
                </div>
              )}

              <div className="flex items-center justify-between py-3">
                <div>
                  <p className="text-[#0f172a]">Documentation</p>
                  <p className="text-xs text-gray-500 mt-1">Bill of lading and certificates</p>
                </div>
                <p className="text-lg text-[#0f172a]">{formData.currency} {convertCurrency(costs.documentation)}</p>
              </div>

              <div className="flex items-center justify-between py-3">
                <div>
                  <p className="text-[#0f172a]">Service Margin</p>
                  <p className="text-xs text-gray-500 mt-1">10% service fee</p>
                </div>
                <p className="text-lg text-[#0f172a]">{formData.currency} {convertCurrency(costs.margin)}</p>
              </div>
            </div>

            <Separator />

            <div className="flex items-center justify-between py-4 bg-orange-50 dark:bg-orange-950/30 -mx-6 px-6 rounded-lg">
              <div>
                <p className="text-xl text-[#0f172a] dark:text-white">Total Cost</p>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                  Rate: 1 USD = {exchangeRates[formData.currency].toFixed(2)} {formData.currency}
                </p>
              </div>
              <p className="text-3xl text-orange-600 dark:text-orange-500">
                {formData.currency} {convertCurrency(costs.total)}
              </p>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" className="flex-1">
                <Save className="h-4 w-4 mr-2" />
                Save Quote
              </Button>
              <Button variant="outline" className="flex-1">
                <Download className="h-4 w-4 mr-2" />
                Export PDF
              </Button>
              <Button className="bg-orange-500 hover:bg-orange-600 flex-1">
                <Plus className="h-4 w-4 mr-2" />
                New Quote
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
