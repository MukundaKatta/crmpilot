"use client";

import { useState } from "react";
import {
  Users, LayoutDashboard, UserCircle, Sparkles, Kanban, Mail, TrendingUp,
  BarChart3, Plus, Search, Phone, Building, DollarSign, Calendar, Star,
  ArrowRight, Eye, MessageSquare, Clock, Target, Zap, ChevronRight, Settings
} from "lucide-react";
import toast from "react-hot-toast";

type TabType = "dashboard" | "contacts" | "deals" | "email" | "forecasting" | "dashboards";

interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  role: string;
  leadScore: number;
  status: "lead" | "prospect" | "customer" | "churned";
  lastContact: string;
  dealValue: number;
  tags: string[];
}

interface Deal {
  id: string;
  name: string;
  company: string;
  value: number;
  stage: "discovery" | "proposal" | "negotiation" | "closing" | "won" | "lost";
  probability: number;
  closeDate: string;
  owner: string;
  aiInsight: string;
}

const contacts: Contact[] = [
  { id: "1", name: "John Smith", email: "john@techcorp.com", phone: "+1-555-0201", company: "TechCorp", role: "CTO", leadScore: 92, status: "prospect", lastContact: "2026-03-16", dealValue: 125000, tags: ["enterprise", "hot-lead"] },
  { id: "2", name: "Sarah Williams", email: "sarah@acme.com", phone: "+1-555-0202", company: "Acme Inc", role: "VP Engineering", leadScore: 88, status: "customer", lastContact: "2026-03-15", dealValue: 85000, tags: ["enterprise", "renewal"] },
  { id: "3", name: "Mike Chen", email: "mike@startup.io", phone: "+1-555-0203", company: "StartupIO", role: "CEO", leadScore: 76, status: "lead", lastContact: "2026-03-14", dealValue: 45000, tags: ["startup", "growth"] },
  { id: "4", name: "Emily Davis", email: "emily@global.co", phone: "+1-555-0204", company: "GlobalCo", role: "Director of IT", leadScore: 84, status: "prospect", lastContact: "2026-03-17", dealValue: 200000, tags: ["enterprise", "hot-lead"] },
  { id: "5", name: "Alex Johnson", email: "alex@mediafirm.com", phone: "+1-555-0205", company: "MediaFirm", role: "COO", leadScore: 65, status: "lead", lastContact: "2026-03-12", dealValue: 35000, tags: ["mid-market"] },
  { id: "6", name: "Lisa Park", email: "lisa@finserv.com", phone: "+1-555-0206", company: "FinServ", role: "VP Sales", leadScore: 71, status: "customer", lastContact: "2026-03-10", dealValue: 150000, tags: ["enterprise", "upsell"] },
];

const deals: Deal[] = [
  { id: "d1", name: "TechCorp Enterprise License", company: "TechCorp", value: 125000, stage: "negotiation", probability: 75, closeDate: "2026-04-15", owner: "You", aiInsight: "High engagement in last 2 weeks. Recommend sending ROI analysis to close." },
  { id: "d2", name: "Acme Annual Renewal", company: "Acme Inc", value: 85000, stage: "closing", probability: 90, closeDate: "2026-03-31", owner: "You", aiInsight: "Renewal likely. Consider upsell opportunity for new AI features." },
  { id: "d3", name: "GlobalCo Platform Deal", company: "GlobalCo", value: 200000, stage: "proposal", probability: 50, closeDate: "2026-05-15", owner: "Sarah", aiInsight: "Decision maker recently promoted. Schedule executive briefing." },
  { id: "d4", name: "StartupIO Growth Plan", company: "StartupIO", value: 45000, stage: "discovery", probability: 30, closeDate: "2026-05-30", owner: "You", aiInsight: "Early stage. Focus on product demo and competitor comparison." },
  { id: "d5", name: "MediaFirm Content Package", company: "MediaFirm", value: 35000, stage: "proposal", probability: 45, closeDate: "2026-04-30", owner: "Mike", aiInsight: "Budget concerns flagged. Offer phased implementation." },
  { id: "d6", name: "FinServ Upsell", company: "FinServ", value: 150000, stage: "discovery", probability: 35, closeDate: "2026-06-15", owner: "You", aiInsight: "Current customer satisfied. Introduce new compliance module." },
  { id: "d7", name: "DataCo Analytics Suite", company: "DataCo", value: 95000, stage: "won", probability: 100, closeDate: "2026-03-10", owner: "Sarah", aiInsight: "Deal closed! Onboarding scheduled for next week." },
  { id: "d8", name: "RetailX POS Integration", company: "RetailX", value: 60000, stage: "lost", probability: 0, closeDate: "2026-03-05", owner: "Mike", aiInsight: "Lost to competitor. Price was key factor. Consider competitive pricing strategy." },
];

const dealStages = ["discovery", "proposal", "negotiation", "closing", "won", "lost"] as const;
const stageColors: Record<string, string> = { discovery: "bg-gray-100 text-gray-700", proposal: "bg-blue-100 text-blue-700", negotiation: "bg-purple-100 text-purple-700", closing: "bg-yellow-100 text-yellow-700", won: "bg-green-100 text-green-700", lost: "bg-red-100 text-red-700" };

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabType>("dashboard");
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const pipelineValue = deals.filter((d) => !["won", "lost"].includes(d.stage)).reduce((a, b) => a + b.value, 0);
  const wonValue = deals.filter((d) => d.stage === "won").reduce((a, b) => a + b.value, 0);
  const weightedPipeline = deals.filter((d) => !["won", "lost"].includes(d.stage)).reduce((a, b) => a + b.value * (b.probability / 100), 0);

  const filteredContacts = contacts.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) || c.company.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const tabs = [
    { id: "dashboard" as const, label: "Dashboard", icon: LayoutDashboard },
    { id: "contacts" as const, label: "Contacts", icon: UserCircle },
    { id: "deals" as const, label: "Deal Pipeline", icon: Kanban },
    { id: "email" as const, label: "Email", icon: Mail },
    { id: "forecasting" as const, label: "Forecasting", icon: TrendingUp },
    { id: "dashboards" as const, label: "Dashboard Builder", icon: BarChart3 },
  ];

  return (
    <div className="min-h-screen flex">
      <aside className="w-56 bg-white border-r border-gray-200 h-screen flex flex-col">
        <div className="flex items-center gap-2 p-4 border-b border-gray-200">
          <Target className="w-6 h-6 text-primary-600" />
          <span className="text-lg font-bold text-gray-900">CRMPilot</span>
        </div>
        <nav className="flex-1 p-2 space-y-1">
          {tabs.map((tab) => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium ${activeTab === tab.id ? "bg-primary-50 text-primary-700" : "text-gray-600 hover:bg-gray-50"}`}>
              <tab.icon className="w-4 h-4" /> {tab.label}
            </button>
          ))}
        </nav>
        <div className="p-3 border-t border-gray-200">
          <button className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-50"><Settings className="w-4 h-4" /> Settings</button>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto p-6">
        {activeTab === "dashboard" && (
          <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">Sales Dashboard</h1>
            <div className="grid grid-cols-4 gap-4">
              {[
                { label: "Pipeline Value", value: `$${(pipelineValue / 1000).toFixed(0)}K`, icon: DollarSign, color: "bg-blue-50 text-blue-600", sub: `${deals.filter(d => !["won","lost"].includes(d.stage)).length} active deals` },
                { label: "Won This Month", value: `$${(wonValue / 1000).toFixed(0)}K`, icon: TrendingUp, color: "bg-green-50 text-green-600", sub: `${deals.filter(d => d.stage === "won").length} deals closed` },
                { label: "Weighted Pipeline", value: `$${(weightedPipeline / 1000).toFixed(0)}K`, icon: Target, color: "bg-purple-50 text-purple-600", sub: "Probability-weighted" },
                { label: "Active Contacts", value: contacts.length.toString(), icon: Users, color: "bg-orange-50 text-orange-600", sub: `${contacts.filter(c => c.leadScore >= 80).length} hot leads` },
              ].map((stat) => (
                <div key={stat.label} className="card">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${stat.color}`}><stat.icon className="w-5 h-5" /></div>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                  <p className="text-xs text-gray-400 mt-1">{stat.sub}</p>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="card">
                <div className="flex items-center gap-2 mb-4"><Sparkles className="w-5 h-5 text-primary-600" /><h3 className="font-semibold text-gray-900">AI Insights</h3></div>
                {deals.filter(d => !["won", "lost"].includes(d.stage)).slice(0, 4).map((deal) => (
                  <div key={deal.id} className="p-3 bg-gray-50 rounded-lg mb-2">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-gray-900">{deal.name}</span>
                      <span className="text-xs font-bold text-primary-600">{deal.probability}%</span>
                    </div>
                    <p className="text-xs text-gray-600">{deal.aiInsight}</p>
                  </div>
                ))}
              </div>
              <div className="card">
                <h3 className="font-semibold text-gray-900 mb-4">Top Leads</h3>
                {contacts.sort((a, b) => b.leadScore - a.leadScore).slice(0, 5).map((c) => (
                  <div key={c.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center"><span className="text-xs font-bold text-primary-700">{c.name.split(" ").map(n => n[0]).join("")}</span></div>
                      <div><p className="text-sm font-medium text-gray-900">{c.name}</p><p className="text-xs text-gray-500">{c.company}</p></div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-3 h-3 text-primary-500" />
                      <span className="text-sm font-bold text-primary-600">{c.leadScore}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "contacts" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-gray-900">Contacts</h1>
              <button className="btn-primary flex items-center gap-2"><Plus className="w-4 h-4" /> Add Contact</button>
            </div>
            <div className="relative"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" /><input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="input pl-9" placeholder="Search contacts..." /></div>
            <div className="flex gap-4">
              <div className="flex-1">
                <div className="card p-0">
                  <table className="w-full">
                    <thead><tr className="border-b border-gray-200 bg-gray-50">
                      <th className="text-left text-xs font-medium text-gray-500 px-4 py-3">Contact</th>
                      <th className="text-left text-xs font-medium text-gray-500 px-4 py-3">Company</th>
                      <th className="text-left text-xs font-medium text-gray-500 px-4 py-3">AI Score</th>
                      <th className="text-left text-xs font-medium text-gray-500 px-4 py-3">Status</th>
                      <th className="text-left text-xs font-medium text-gray-500 px-4 py-3">Deal Value</th>
                      <th className="text-left text-xs font-medium text-gray-500 px-4 py-3">Last Contact</th>
                    </tr></thead>
                    <tbody>{filteredContacts.map((c) => (
                      <tr key={c.id} onClick={() => setSelectedContact(c)} className={`border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${selectedContact?.id === c.id ? "bg-primary-50" : ""}`}>
                        <td className="px-4 py-3"><div className="flex items-center gap-2"><div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center"><span className="text-[10px] font-bold text-primary-700">{c.name.split(" ").map(n => n[0]).join("")}</span></div><div><p className="text-sm font-medium text-gray-900">{c.name}</p><p className="text-xs text-gray-500">{c.email}</p></div></div></td>
                        <td className="px-4 py-3 text-sm text-gray-600">{c.company}</td>
                        <td className="px-4 py-3"><div className="flex items-center gap-1"><Sparkles className="w-3 h-3 text-primary-500" /><span className={`text-sm font-bold ${c.leadScore >= 80 ? "text-green-600" : c.leadScore >= 60 ? "text-yellow-600" : "text-gray-600"}`}>{c.leadScore}</span></div></td>
                        <td className="px-4 py-3"><span className={`text-xs px-2 py-0.5 rounded-full capitalize ${c.status === "customer" ? "bg-green-100 text-green-700" : c.status === "prospect" ? "bg-blue-100 text-blue-700" : c.status === "lead" ? "bg-yellow-100 text-yellow-700" : "bg-red-100 text-red-700"}`}>{c.status}</span></td>
                        <td className="px-4 py-3 text-sm font-medium text-gray-900">${c.dealValue.toLocaleString()}</td>
                        <td className="px-4 py-3 text-sm text-gray-500">{c.lastContact}</td>
                      </tr>
                    ))}</tbody>
                  </table>
                </div>
              </div>
              {selectedContact && (
                <div className="w-80 card sticky top-0">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center"><span className="text-lg font-bold text-primary-700">{selectedContact.name.split(" ").map(n => n[0]).join("")}</span></div>
                    <div><h3 className="font-bold text-gray-900">{selectedContact.name}</h3><p className="text-sm text-gray-500">{selectedContact.role}</p></div>
                  </div>
                  <div className="space-y-2 text-sm mb-4">
                    <div className="flex items-center gap-2 text-gray-600"><Building className="w-4 h-4" /> {selectedContact.company}</div>
                    <div className="flex items-center gap-2 text-gray-600"><Mail className="w-4 h-4" /> {selectedContact.email}</div>
                    <div className="flex items-center gap-2 text-gray-600"><Phone className="w-4 h-4" /> {selectedContact.phone}</div>
                    <div className="flex items-center gap-2 text-gray-600"><DollarSign className="w-4 h-4" /> ${selectedContact.dealValue.toLocaleString()}</div>
                  </div>
                  <div className="p-3 bg-primary-50 rounded-lg border border-primary-200 mb-4">
                    <div className="flex items-center gap-2 mb-1"><Sparkles className="w-4 h-4 text-primary-600" /><span className="text-sm font-semibold text-primary-900">AI Lead Score: {selectedContact.leadScore}/100</span></div>
                    <p className="text-xs text-gray-700">{selectedContact.leadScore >= 80 ? "Hot lead! High engagement and budget authority detected." : "Nurture with targeted content and follow-ups."}</p>
                  </div>
                  <div className="flex flex-wrap gap-1 mb-4">{selectedContact.tags.map((t) => (<span key={t} className="text-xs px-2 py-0.5 bg-gray-100 rounded-full text-gray-600">{t}</span>))}</div>
                  <div className="flex gap-2">
                    <button className="btn-primary flex-1 text-xs flex items-center justify-center gap-1"><Mail className="w-3 h-3" /> Email</button>
                    <button className="btn-secondary flex-1 text-xs flex items-center justify-center gap-1"><Phone className="w-3 h-3" /> Call</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === "deals" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-gray-900">Deal Pipeline</h1>
              <button className="btn-primary flex items-center gap-2"><Plus className="w-4 h-4" /> New Deal</button>
            </div>
            <div className="flex gap-3 overflow-x-auto pb-4">
              {dealStages.filter(s => s !== "lost").map((stage) => {
                const stageDeals = deals.filter((d) => d.stage === stage);
                const stageValue = stageDeals.reduce((a, b) => a + b.value, 0);
                return (
                  <div key={stage} className="min-w-[280px] bg-gray-100 rounded-xl p-3">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-sm font-semibold text-gray-700 capitalize">{stage}</h3>
                      <span className="text-xs text-gray-500">${(stageValue / 1000).toFixed(0)}K</span>
                    </div>
                    <div className="space-y-2">
                      {stageDeals.map((deal) => (
                        <div key={deal.id} className="bg-white rounded-lg p-3 border border-gray-200 shadow-sm">
                          <div className="flex items-center justify-between mb-1">
                            <p className="text-sm font-medium text-gray-900">{deal.name}</p>
                          </div>
                          <p className="text-xs text-gray-500 mb-2">{deal.company}</p>
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-bold text-gray-900">${deal.value.toLocaleString()}</span>
                            <span className="text-xs text-primary-600">{deal.probability}%</span>
                          </div>
                          <p className="text-xs text-gray-400 mt-1">Close: {deal.closeDate}</p>
                          <div className="mt-2 p-2 bg-primary-50 rounded text-[10px] text-gray-600 flex items-start gap-1">
                            <Sparkles className="w-3 h-3 text-primary-500 flex-shrink-0 mt-0.5" />
                            {deal.aiInsight}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === "email" && (
          <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">Email Integration</h1>
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: "Emails Sent Today", value: 24, icon: Mail },
                { label: "Open Rate", value: "42%", icon: Eye },
                { label: "Response Rate", value: "18%", icon: MessageSquare },
              ].map((s) => (
                <div key={s.label} className="card text-center">
                  <s.icon className="w-8 h-8 mx-auto text-primary-500 mb-2" />
                  <p className="text-2xl font-bold text-gray-900">{s.value}</p>
                  <p className="text-sm text-gray-500">{s.label}</p>
                </div>
              ))}
            </div>
            <div className="card">
              <h3 className="font-semibold text-gray-900 mb-4">Recent Email Activity</h3>
              {[
                { contact: "John Smith", subject: "Re: Enterprise License Proposal", time: "2 hours ago", status: "opened" },
                { contact: "Emily Davis", subject: "Platform Demo Follow-up", time: "4 hours ago", status: "replied" },
                { contact: "Mike Chen", subject: "Product Overview - StartupIO", time: "Yesterday", status: "sent" },
                { contact: "Sarah Williams", subject: "Renewal Discussion", time: "Yesterday", status: "opened" },
              ].map((email, i) => (
                <div key={i} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                  <div className="flex items-center gap-3"><Mail className="w-4 h-4 text-gray-400" /><div><p className="text-sm font-medium text-gray-900">{email.subject}</p><p className="text-xs text-gray-500">{email.contact} - {email.time}</p></div></div>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${email.status === "replied" ? "bg-green-100 text-green-700" : email.status === "opened" ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-600"}`}>{email.status}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "forecasting" && (
          <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">Revenue Forecasting</h1>
            <div className="grid grid-cols-3 gap-4">
              <div className="card bg-green-50 border-green-200">
                <p className="text-sm text-green-700">Best Case</p>
                <p className="text-3xl font-bold text-green-900">${(pipelineValue / 1000).toFixed(0)}K</p>
                <p className="text-xs text-green-600">100% of pipeline closes</p>
              </div>
              <div className="card bg-blue-50 border-blue-200">
                <p className="text-sm text-blue-700">Most Likely</p>
                <p className="text-3xl font-bold text-blue-900">${(weightedPipeline / 1000).toFixed(0)}K</p>
                <p className="text-xs text-blue-600">Weighted by probability</p>
              </div>
              <div className="card bg-yellow-50 border-yellow-200">
                <p className="text-sm text-yellow-700">Worst Case</p>
                <p className="text-3xl font-bold text-yellow-900">${(weightedPipeline * 0.6 / 1000).toFixed(0)}K</p>
                <p className="text-xs text-yellow-600">60% of weighted pipeline</p>
              </div>
            </div>
            <div className="card">
              <h3 className="font-semibold text-gray-900 mb-4">Monthly Forecast</h3>
              {[
                { month: "March 2026", forecast: wonValue + weightedPipeline * 0.3, target: 200000, deals: 3 },
                { month: "April 2026", forecast: weightedPipeline * 0.4, target: 250000, deals: 4 },
                { month: "May 2026", forecast: weightedPipeline * 0.5, target: 200000, deals: 3 },
                { month: "June 2026", forecast: weightedPipeline * 0.3, target: 180000, deals: 2 },
              ].map((m) => (
                <div key={m.month} className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-700">{m.month}</span>
                    <span className="text-gray-500">${(m.forecast / 1000).toFixed(0)}K / ${(m.target / 1000).toFixed(0)}K target ({m.deals} deals)</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-4 relative">
                    <div className="bg-primary-500 h-4 rounded-full" style={{ width: `${Math.min((m.forecast / m.target) * 100, 100)}%` }} />
                    <div className="absolute top-0 h-4 border-r-2 border-red-500" style={{ left: "100%" }} />
                  </div>
                </div>
              ))}
            </div>
            <div className="card">
              <div className="flex items-center gap-2 mb-4"><Sparkles className="w-5 h-5 text-primary-600" /><h3 className="font-semibold text-gray-900">AI Forecast Insights</h3></div>
              <div className="space-y-3">
                {[
                  "TechCorp deal has 75% probability of closing in April. Key risk: competitor evaluation.",
                  "Acme renewal is nearly certain. Opportunity to upsell $25K in additional modules.",
                  "Q2 pipeline needs 2 more deals to hit target. Focus on enterprise outbound.",
                  "Historical data suggests March closes tend to slip to April. Build buffer into forecasts.",
                ].map((insight, i) => (
                  <div key={i} className="flex items-start gap-2 p-3 bg-primary-50 rounded-lg">
                    <Zap className="w-4 h-4 text-primary-600 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-gray-700">{insight}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "dashboards" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-gray-900">Dashboard Builder</h1>
              <button className="btn-primary flex items-center gap-2"><Plus className="w-4 h-4" /> Add Widget</button>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { title: "Revenue by Month", type: "Bar Chart", size: "large" },
                { title: "Deal Stage Distribution", type: "Pie Chart", size: "medium" },
                { title: "Top Contacts by Score", type: "List", size: "medium" },
                { title: "Win Rate Trend", type: "Line Chart", size: "medium" },
                { title: "Activity Timeline", type: "Timeline", size: "medium" },
                { title: "Team Performance", type: "Table", size: "large" },
              ].map((widget, i) => (
                <div key={i} className={`card ${widget.size === "large" ? "col-span-2" : ""}`}>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-gray-900">{widget.title}</h3>
                    <span className="text-xs bg-gray-100 px-2 py-0.5 rounded text-gray-500">{widget.type}</span>
                  </div>
                  <div className="h-40 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <BarChart3 className="w-10 h-10 mx-auto text-gray-300 mb-2" />
                      <p className="text-sm text-gray-400">{widget.type} Widget</p>
                      <p className="text-xs text-gray-300">Click to configure</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
