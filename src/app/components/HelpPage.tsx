import { BookOpen, TrendingUp, Calculator, HelpCircle, FileText, Video } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';

export function HelpPage() {
  const guides = [
    {
      icon: BookOpen,
      title: 'Understanding Incoterms',
      description: 'Learn the basics of international commercial terms and how to choose the right one',
      topics: ['What are Incoterms?', 'Choosing the right term', 'Cost implications']
    },
    {
      icon: TrendingUp,
      title: 'Using Exchange Rates',
      description: 'How to interpret currency trends and apply them to your pricing',
      topics: ['Reading trend charts', 'Rate volatility', 'Multi-currency quotes']
    },
    {
      icon: Calculator,
      title: 'Cost Calculation Best Practices',
      description: 'Tips for accurate freight costing and competitive pricing',
      topics: ['Factor checklist', 'Margin strategies', 'Quote validation']
    }
  ];

  const faqs = [
    {
      question: 'How often are exchange rates updated?',
      answer: 'Exchange rates in FREIGHTY MERCURY are updated every few minutes during business hours. The "Last Updated" timestamp shows when the rates were last refreshed. Always verify rates with your bank for actual transactions.'
    },
    {
      question: 'Which Incoterm should I use for sea freight?',
      answer: 'For sea freight, FOB, CFR, and CIF are the most common Incoterms. FOB gives the buyer more control over the main carriage, while CIF includes insurance. The choice depends on your negotiation position, cargo value, and insurance preferences.'
    },
    {
      question: 'How do I calculate volume weight for air freight?',
      answer: 'For air freight, volume weight (also called dimensional weight) is calculated as: (Length × Width × Height in cm) ÷ 6000. The chargeable weight is the higher of actual weight or volume weight.'
    },
    {
      question: 'Can I save my calculations and quotes?',
      answer: 'Yes! After calculating a quote, click the "Save Quote" button. Your saved quotes appear on the dashboard under "Recent Quotes" for easy reference and comparison.'
    },
    {
      question: 'What\'s the difference between FCL and LCL?',
      answer: 'FCL (Full Container Load) means you rent an entire container, charged per container. LCL (Less than Container Load) means you share container space with other shippers, charged per cubic meter (CBM). FCL is more economical for larger shipments.'
    },
    {
      question: 'How do I add new vendors to the database?',
      answer: 'Click "Add Vendor" on the Vendor Database page. Fill in the vendor details, service type, rates, and contract validity. Keep vendor information updated to ensure accurate cost calculations.'
    },
    {
      question: 'What currency should I quote in?',
      answer: 'The currency depends on your customer\'s preference and market standards. USD is most common for international freight, but you can quote in any supported currency. The calculator automatically converts using current rates.'
    },
    {
      question: 'How are customs costs calculated in DDP terms?',
      answer: 'In DDP (Delivered Duty Paid), the calculator estimates customs clearance and duties at approximately 10% of freight costs. However, actual customs costs vary by country, product classification (HS Code), and trade agreements. Always verify with customs brokers.'
    }
  ];

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-[#0f172a] dark:text-white">Help & Learning Center</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Quick guides about Incoterms, exchange rates, and pricing best practices
        </p>
      </div>

      {/* Quick Guides */}
      <div>
        <h2 className="text-[#0f172a] dark:text-white mb-4">Quick Guides</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {guides.map((guide) => {
            const Icon = guide.icon;
            return (
              <Card key={guide.title} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="h-12 w-12 bg-orange-100 rounded-lg flex items-center justify-center mb-3">
                    <Icon className="h-6 w-6 text-orange-600" />
                  </div>
                  <CardTitle>{guide.title}</CardTitle>
                  <CardDescription>{guide.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {guide.topics.map((topic, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                        <span className="h-1.5 w-1.5 bg-orange-500 rounded-full mt-1.5 flex-shrink-0" />
                        <span>{topic}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Video Tutorials */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Video className="h-5 w-5" />
            Video Tutorials
          </CardTitle>
          <CardDescription>Step-by-step video guides for common tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
              <div className="aspect-video bg-gray-200 rounded mb-3 flex items-center justify-center">
                <Video className="h-12 w-12 text-gray-400" />
              </div>
              <p className="text-[#0f172a]">Getting Started with FREIGHTY MERCURY</p>
              <p className="text-sm text-gray-600 mt-1">5:32 minutes</p>
            </div>
            <div className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
              <div className="aspect-video bg-gray-200 rounded mb-3 flex items-center justify-center">
                <Video className="h-12 w-12 text-gray-400" />
              </div>
              <p className="text-[#0f172a]">Creating Your First Cost Calculation</p>
              <p className="text-sm text-gray-600 mt-1">8:15 minutes</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* FAQ */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HelpCircle className="h-5 w-5" />
            Frequently Asked Questions
          </CardTitle>
          <CardDescription>Common questions about using the platform</CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, idx) => (
              <AccordionItem key={idx} value={`item-${idx}`}>
                <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-gray-700">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>

      {/* Resources */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Additional Resources
          </CardTitle>
          <CardDescription>Downloadable guides and reference materials</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <button className="w-full flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-blue-100 rounded flex items-center justify-center">
                  <FileText className="h-5 w-5 text-blue-600" />
                </div>
                <div className="text-left">
                  <p className="text-[#0f172a]">Incoterms 2020 Quick Reference Guide</p>
                  <p className="text-sm text-gray-600">PDF · 2.4 MB</p>
                </div>
              </div>
              <span className="text-orange-600 text-sm">Download</span>
            </button>

            <button className="w-full flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-green-100 rounded flex items-center justify-center">
                  <FileText className="h-5 w-5 text-green-600" />
                </div>
                <div className="text-left">
                  <p className="text-[#0f172a]">Freight Costing Best Practices</p>
                  <p className="text-sm text-gray-600">PDF · 1.8 MB</p>
                </div>
              </div>
              <span className="text-orange-600 text-sm">Download</span>
            </button>

            <button className="w-full flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-purple-100 rounded flex items-center justify-center">
                  <FileText className="h-5 w-5 text-purple-600" />
                </div>
                <div className="text-left">
                  <p className="text-[#0f172a]">Currency Risk Management Guide</p>
                  <p className="text-sm text-gray-600">PDF · 1.2 MB</p>
                </div>
              </div>
              <span className="text-orange-600 text-sm">Download</span>
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Contact Support */}
      <Card className="bg-orange-50 border-orange-200">
        <CardContent className="pt-6">
          <div className="flex items-start gap-4">
            <div className="h-12 w-12 bg-orange-500 rounded-lg flex items-center justify-center flex-shrink-0">
              <HelpCircle className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg text-[#0f172a]">Still need help?</h3>
              <p className="text-gray-700 mt-1">
                Our support team is available Monday to Friday, 9:00 AM - 6:00 PM WIB.
              </p>
              <p className="text-sm text-gray-600 mt-2">
                Email: support@freightymercury.com | Phone: +62 31 1234 5678
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
