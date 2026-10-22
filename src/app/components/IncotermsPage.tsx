import { useState } from 'react';
import { Search, Info } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';

const incotermsData = [
  {
    code: 'EXW',
    name: 'Ex Works',
    category: 'E',
    description: 'Seller makes goods available at their premises. Buyer bears all costs and risks.',
    sellerResponsibilities: ['Make goods available at premises', 'Provide commercial invoice'],
    buyerResponsibilities: ['All transport costs', 'All insurance', 'All customs clearance', 'All risks from seller premises'],
    costBreakdown: {
      seller: 10,
      buyer: 90
    },
    suitableFor: 'Experienced buyers with strong logistics capabilities'
  },
  {
    code: 'FCA',
    name: 'Free Carrier',
    category: 'F',
    description: 'Seller delivers goods to carrier nominated by buyer at named place.',
    sellerResponsibilities: ['Deliver to carrier', 'Export clearance', 'Loading (if at seller premises)'],
    buyerResponsibilities: ['Main carriage costs', 'Insurance', 'Import clearance', 'Risks after handover'],
    costBreakdown: {
      seller: 20,
      buyer: 80
    },
    suitableFor: 'Container shipments and multimodal transport'
  },
  {
    code: 'FOB',
    name: 'Free On Board',
    category: 'F',
    description: 'Seller delivers goods on board vessel. Buyer bears all costs from that point.',
    sellerResponsibilities: ['Deliver goods on board', 'Export clearance', 'Loading costs'],
    buyerResponsibilities: ['Main sea freight', 'Insurance', 'Import clearance', 'Unloading at destination'],
    costBreakdown: {
      seller: 25,
      buyer: 75
    },
    suitableFor: 'Sea and inland waterway transport only'
  },
  {
    code: 'CFR',
    name: 'Cost and Freight',
    category: 'C',
    description: 'Seller pays freight to destination port. Risk transfers when goods on board.',
    sellerResponsibilities: ['Export clearance', 'Loading costs', 'Main freight to destination port'],
    buyerResponsibilities: ['Insurance', 'Import clearance', 'Unloading', 'Risk from loading point'],
    costBreakdown: {
      seller: 40,
      buyer: 60
    },
    suitableFor: 'Sea freight when buyer wants to arrange insurance'
  },
  {
    code: 'CIF',
    name: 'Cost, Insurance and Freight',
    category: 'C',
    description: 'Seller pays freight and insurance to destination. Risk transfers on board.',
    sellerResponsibilities: ['Export clearance', 'Loading costs', 'Main freight', 'Minimum insurance coverage'],
    buyerResponsibilities: ['Import clearance', 'Unloading', 'Risk from loading point', 'Additional insurance if needed'],
    costBreakdown: {
      seller: 45,
      buyer: 55
    },
    suitableFor: 'Sea freight with basic insurance coverage'
  },
  {
    code: 'CPT',
    name: 'Carriage Paid To',
    category: 'C',
    description: 'Seller pays freight to named destination. Risk transfers when goods handed to first carrier.',
    sellerResponsibilities: ['Export clearance', 'Main carriage to destination', 'Loading to first carrier'],
    buyerResponsibilities: ['Insurance', 'Import clearance', 'Unloading', 'Risk from first carrier'],
    costBreakdown: {
      seller: 40,
      buyer: 60
    },
    suitableFor: 'Any mode of transport'
  },
  {
    code: 'CIP',
    name: 'Carriage and Insurance Paid To',
    category: 'C',
    description: 'Seller pays freight and insurance to destination. Risk transfers to first carrier.',
    sellerResponsibilities: ['Export clearance', 'Main carriage', 'Comprehensive insurance coverage', 'Loading to carrier'],
    buyerResponsibilities: ['Import clearance', 'Unloading', 'Risk from first carrier', 'Additional insurance if needed'],
    costBreakdown: {
      seller: 45,
      buyer: 55
    },
    suitableFor: 'Any mode with enhanced insurance'
  },
  {
    code: 'DAP',
    name: 'Delivered At Place',
    category: 'D',
    description: 'Seller delivers goods ready for unloading at named destination.',
    sellerResponsibilities: ['All transport to destination', 'Export clearance', 'All risks until ready for unloading'],
    buyerResponsibilities: ['Unloading', 'Import clearance', 'Import duties and taxes'],
    costBreakdown: {
      seller: 70,
      buyer: 30
    },
    suitableFor: 'Door-to-door delivery without import clearance'
  },
  {
    code: 'DPU',
    name: 'Delivered at Place Unloaded',
    category: 'D',
    description: 'Seller delivers and unloads goods at named destination.',
    sellerResponsibilities: ['All transport to destination', 'Export clearance', 'Unloading', 'All risks until unloaded'],
    buyerResponsibilities: ['Import clearance', 'Import duties and taxes'],
    costBreakdown: {
      seller: 75,
      buyer: 25
    },
    suitableFor: 'When seller can handle unloading at destination'
  },
  {
    code: 'DDP',
    name: 'Delivered Duty Paid',
    category: 'D',
    description: 'Seller bears all costs and risks including import clearance and duties.',
    sellerResponsibilities: ['All transport', 'Export clearance', 'Import clearance', 'All duties and taxes', 'All risks to destination'],
    buyerResponsibilities: ['Unloading (unless otherwise agreed)'],
    costBreakdown: {
      seller: 90,
      buyer: 10
    },
    suitableFor: 'Maximum convenience for buyer, seller handles everything'
  },
];

export function IncotermsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIncoterm, setSelectedIncoterm] = useState(incotermsData[4]); // Default to CIF

  const filteredIncoterms = incotermsData.filter(
    (term) =>
      term.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      term.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      term.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'E':
        return 'bg-red-100 text-red-800';
      case 'F':
        return 'bg-blue-100 text-blue-800';
      case 'C':
        return 'bg-green-100 text-green-800';
      case 'D':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-[#0f172a] dark:text-white">Incoterms Knowledge Base</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Understand international commercial terms, responsibilities, and cost distributions
        </p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        <Input
          type="text"
          placeholder="Search Incoterms by code, name, or description..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* List of Incoterms */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>All Incoterms</CardTitle>
            <CardDescription>Click to view details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {filteredIncoterms.map((term) => (
              <button
                key={term.code}
                onClick={() => setSelectedIncoterm(term)}
                className={`w-full text-left p-3 rounded-lg border transition-colors ${
                  selectedIncoterm.code === term.code
                    ? 'bg-orange-50 border-orange-500'
                    : 'hover:bg-gray-50 border-gray-200'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[#0f172a] dark:text-white">{term.code}</span>
                  <Badge className={getCategoryColor(term.category)}>
                    Group {term.category}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">{term.name}</p>
              </button>
            ))}
          </CardContent>
        </Card>

        {/* Details */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-2xl">{selectedIncoterm.code}</CardTitle>
                <CardDescription className="text-lg mt-1">{selectedIncoterm.name}</CardDescription>
              </div>
              <Badge className={getCategoryColor(selectedIncoterm.category)}>
                Group {selectedIncoterm.category}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <p className="text-gray-700">{selectedIncoterm.description}</p>
            </div>

            <Tabs defaultValue="responsibilities">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="responsibilities">Responsibilities</TabsTrigger>
                <TabsTrigger value="costs">Cost Breakdown</TabsTrigger>
                <TabsTrigger value="usage">Usage</TabsTrigger>
              </TabsList>

              <TabsContent value="responsibilities" className="space-y-4 mt-4">
                <div>
                  <h4 className="text-[#0f172a] dark:text-white mb-3 flex items-center gap-2">
                    Seller Responsibilities
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <Info className="h-4 w-4 text-gray-400" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>What the seller must provide and pay for</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </h4>
                  <ul className="space-y-2">
                    {selectedIncoterm.sellerResponsibilities.map((resp, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="h-1.5 w-1.5 bg-orange-500 rounded-full mt-2 flex-shrink-0" />
                        <span className="text-gray-700">{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-[#0f172a] dark:text-white mb-3 flex items-center gap-2">
                    Buyer Responsibilities
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <Info className="h-4 w-4 text-gray-400" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>What the buyer must arrange and pay for</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </h4>
                  <ul className="space-y-2">
                    {selectedIncoterm.buyerResponsibilities.map((resp, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="h-1.5 w-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                        <span className="text-gray-700">{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </TabsContent>

              <TabsContent value="costs" className="mt-4">
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">Seller bears</span>
                      <span className="text-orange-600">{selectedIncoterm.costBreakdown.seller}%</span>
                    </div>
                    <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-orange-500"
                        style={{ width: `${selectedIncoterm.costBreakdown.seller}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">Buyer bears</span>
                      <span className="text-blue-600">{selectedIncoterm.costBreakdown.buyer}%</span>
                    </div>
                    <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-500"
                        style={{ width: `${selectedIncoterm.costBreakdown.buyer}%` }}
                      />
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-700">
                      <strong>Note:</strong> These percentages are approximate and represent typical cost distribution. 
                      Actual costs vary based on route, cargo type, and specific agreement terms.
                    </p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="usage" className="mt-4">
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg">
                    <h4 className="text-[#0f172a] dark:text-white mb-2">Best Suited For</h4>
                    <p className="text-gray-700 dark:text-gray-300">{selectedIncoterm.suitableFor}</p>
                  </div>

                  <div className="space-y-3">
                    <h4 className="text-[#0f172a] dark:text-white">Common Use Cases</h4>
                    {selectedIncoterm.code === 'CIF' && (
                      <ul className="space-y-2 text-gray-700">
                        <li className="flex items-start gap-2">
                          <span className="h-1.5 w-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0" />
                          <span>Traditional sea freight shipments</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="h-1.5 w-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0" />
                          <span>Buyers new to international trade</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="h-1.5 w-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0" />
                          <span>When basic insurance is sufficient</span>
                        </li>
                      </ul>
                    )}
                    {selectedIncoterm.code === 'FOB' && (
                      <ul className="space-y-2 text-gray-700">
                        <li className="flex items-start gap-2">
                          <span className="h-1.5 w-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0" />
                          <span>Buyer wants full control of main freight</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="h-1.5 w-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0" />
                          <span>Buyer has preferred shipping lines</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="h-1.5 w-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0" />
                          <span>Sea and inland waterway transport</span>
                        </li>
                      </ul>
                    )}
                    {selectedIncoterm.code === 'DDP' && (
                      <ul className="space-y-2 text-gray-700">
                        <li className="flex items-start gap-2">
                          <span className="h-1.5 w-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0" />
                          <span>Maximum convenience for buyer</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="h-1.5 w-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0" />
                          <span>E-commerce and direct sales</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="h-1.5 w-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0" />
                          <span>Seller has import clearance expertise</span>
                        </li>
                      </ul>
                    )}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
