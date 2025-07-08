import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";
import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, Legend } from "recharts";

// Sample data
const kpiStats = [
  { title: "Proyectos", value: 12, change: "+2", color: "#8cb43a" },
  { title: "Presupuesto Ejecutado", value: "$2.4M", change: "+$200K", color: "#3b82f6" },
  { title: "Avance Físico", value: "68%", change: "+3%", color: "#fbbf24" },
  { title: "Licencias Pendientes", value: 2, change: "-1", color: "#ef4444" },
];

const timeSeries1 = [
  { mes: "Ene", fisico: 40, financiero: 35 },
  { mes: "Feb", fisico: 45, financiero: 38 },
  { mes: "Mar", fisico: 50, financiero: 42 },
  { mes: "Abr", fisico: 55, financiero: 48 },
  { mes: "May", fisico: 60, financiero: 52 },
  { mes: "Jun", fisico: 68, financiero: 60 },
];
const timeSeries2 = [
  { mes: "Ene", avance: 20 },
  { mes: "Feb", avance: 30 },
  { mes: "Mar", avance: 40 },
  { mes: "Abr", avance: 55 },
  { mes: "May", avance: 62 },
  { mes: "Jun", avance: 70 },
];
const pieData1 = [
  { name: "Ejecutado", value: 2400000, color: "#8cb43a" },
  { name: "Por Ejecutar", value: 1400000, color: "#fbbf24" },
];
const pieData2 = [
  { name: "En Progreso", value: 7, color: "#3b82f6" },
  { name: "Finalizado", value: 3, color: "#8cb43a" },
  { name: "Planificado", value: 2, color: "#fbbf24" },
];
const activity = [
  { text: "Proyecto Alena - Fase 2 completada", time: "Hace 2 horas", color: "#8cb43a" },
  { text: "Nuevo cliente registrado", time: "Hace 4 horas", color: "#3b82f6" },
  { text: "Revisión de presupuesto pendiente", time: "Hace 1 día", color: "#fbbf24" },
];

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-[#f8fafc] pb-10">
      {/* Hero/Header */}
      <div className="w-full rounded-2xl bg-gradient-to-r from-[#e3eafc] via-[#f3f8e7] to-[#e3eafc] p-8 shadow flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
        <div>
          <h1 className="text-4xl font-extrabold text-navy-900 mb-2" style={{color:'#1e3269'}}>Panel Ejecutivo</h1>
          <p className="text-lg text-gray-600 mb-2">Visión general de proyectos, KPIs y gestión de Grupo Premium</p>
          <div className="flex gap-4 mt-2">
            <span className="inline-block bg-[#1e3269] text-white text-xs font-semibold px-3 py-1 rounded-full">12 Proyectos Activos</span>
            <span className="inline-block bg-[#fbbf24] text-white text-xs font-semibold px-3 py-1 rounded-full">$2.4M Ejecutado</span>
            <span className="inline-block bg-[#1e3269] text-white text-xs font-semibold px-3 py-1 rounded-full">68% Avance Físico</span>
          </div>
        </div>
        <div className="hidden md:block">
          <img src="/public/placeholder.svg" alt="Dashboard Illustration" className="w-48 h-48 object-contain opacity-80" />
        </div>
      </div>
      {/* KPI Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {kpiStats.map((kpi, i) => (
          <Card key={i} className="bg-white border-0 shadow-md h-32 flex flex-col justify-center">
            <CardContent className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: i % 2 === 0 ? '#1e326922' : '#fbbf2422' }}>
                <span className="font-bold text-lg" style={{ color: i % 2 === 0 ? '#1e3269' : '#fbbf24' }}>{typeof kpi.value === 'number' ? kpi.value : kpi.value.toString().replace(/[^0-9]/g, '')}</span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">{kpi.title}</p>
                <p className="text-2xl font-extrabold text-navy-900" style={{color:'#1e3269'}}>{kpi.value}</p>
                <p className="text-xs font-semibold" style={{ color: i % 2 === 0 ? '#1e3269' : '#fbbf24' }}>{kpi.change}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      {/* Executive Overview Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        {/* Time Series Chart 1 */}
        <Card className="bg-white border-0 shadow-md h-72 flex flex-col">
          <CardHeader>
            <CardTitle className="text-lg text-navy-900" style={{color:'#1e3269'}}>Avance Físico vs Financiero</CardTitle>
          </CardHeader>
          <CardContent className="flex-1">
            <ResponsiveContainer width="100%" height={180}>
              <LineChart data={timeSeries1} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="mes" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="fisico" stroke="#1e3269" strokeWidth={2} name="Físico" />
                <Line type="monotone" dataKey="financiero" stroke="#fbbf24" strokeWidth={2} name="Financiero" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        {/* Time Series Chart 2 */}
        <Card className="bg-white border-0 shadow-md h-72 flex flex-col">
          <CardHeader>
            <CardTitle className="text-lg text-navy-900" style={{color:'#1e3269'}}>Avance Promedio Proyectos</CardTitle>
          </CardHeader>
          <CardContent className="flex-1">
            <ResponsiveContainer width="100%" height={180}>
              <LineChart data={timeSeries2} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="mes" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="avance" stroke="#fbbf24" strokeWidth={2} name="Avance" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        {/* Pie Chart 1 */}
        <Card className="bg-white border-0 shadow-md h-72 flex flex-col">
          <CardHeader>
            <CardTitle className="text-lg text-navy-900" style={{color:'#1e3269'}}>Presupuesto Ejecutado</CardTitle>
          </CardHeader>
          <CardContent className="flex-1">
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie data={pieData1} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={40} outerRadius={60} label>
                  {pieData1.map((entry, index) => (
                    <Cell key={`cell1-${index}`} fill={index === 0 ? '#1e3269' : '#fbbf24'} />
                  ))}
                </Pie>
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        {/* Pie Chart 2 */}
        <Card className="bg-white border-0 shadow-md h-72 flex flex-col">
          <CardHeader>
            <CardTitle className="text-lg text-navy-900" style={{color:'#1e3269'}}>Estado de Proyectos</CardTitle>
          </CardHeader>
          <CardContent className="flex-1">
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie data={pieData2} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={40} outerRadius={60} label>
                  {pieData2.map((entry, index) => (
                    <Cell key={`cell2-${index}`} fill={index === 0 ? '#1e3269' : index === 1 ? '#fbbf24' : '#e5e7eb'} />
                  ))}
                </Pie>
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      {/* Executive Info Grid - Responsive, visually balanced */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Proyectos Destacados - Full width */}
        <Card className="bg-white border-0 shadow-md h-60 flex flex-col md:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg text-navy-900" style={{color:'#1e3269'}}>Proyectos Destacados</CardTitle>
            <Link to="/proyectos"><Button variant="outline" size="sm" style={{borderColor:'#1e3269', color:'#1e3269'}}>Ver todos</Button></Link>
          </CardHeader>
          <CardContent className="flex-1 flex gap-4 overflow-x-auto pb-2">
            {[{name:'Torre Premium I', avance:65, status:'En Progreso'},{name:'Residencial Vista', avance:10, status:'Planificado'},{name:'Alena', avance:90, status:'Finalizado'}].map((p,i)=>(
              <div key={i} className="min-w-[180px] bg-gradient-to-br from-[#e3eafc] to-[#f3f8e7] rounded-xl p-4 shadow flex flex-col gap-2">
                <span className="font-semibold text-navy-900" style={{color:'#1e3269'}}>{p.name}</span>
                <span className="text-xs text-gray-500">{p.status}</span>
                <div className="w-full bg-gray-200 rounded-full h-2 my-1">
                  <div className="h-2 rounded-full" style={{background:'#1e3269', width:`${p.avance}%`}}></div>
                </div>
                <span className="text-xs text-gray-500">Avance: {p.avance}%</span>
              </div>
            ))}
          </CardContent>
        </Card>
        {/* Licencias y Permisos - Half width */}
        <Card className="bg-white border-0 shadow-md h-48 flex flex-col">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg text-navy-900" style={{color:'#1e3269'}}>Licencias y Permisos</CardTitle>
            <Link to="/proyectos/licencias"><Button variant="outline" size="sm" style={{borderColor:'#fbbf24', color:'#fbbf24'}}>Ver licencias</Button></Link>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col gap-2 justify-center">
            <div className="flex gap-2">
              <span className="inline-block bg-[#fbbf24] text-white text-xs font-semibold px-3 py-1 rounded-full">Pendientes: 2</span>
              <span className="inline-block bg-[#1e3269] text-white text-xs font-semibold px-3 py-1 rounded-full">Por vencer: 1</span>
              <span className="inline-block bg-[#e5e7eb] text-navy-900 text-xs font-semibold px-3 py-1 rounded-full">Aprobadas: 8</span>
            </div>
            <div className="text-sm text-gray-600 mt-2">Última licencia aprobada: <span className="font-semibold text-[#1e3269]">Plano Eléctrico</span> (ayer)</div>
          </CardContent>
        </Card>
        {/* Documentos Críticos - Full width */}
        <Card className="bg-white border-0 shadow-md h-48 flex flex-col md:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg text-navy-900" style={{color:'#1e3269'}}>Documentos Críticos</CardTitle>
            <Link to="/documents"><Button variant="outline" size="sm" style={{borderColor:'#1e3269', color:'#1e3269'}}>Ver todos</Button></Link>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col gap-2 justify-center">
            {[{name:'Planos_Edificio_Alena.pdf', status:'Aprobado', color:'#1e3269'},{name:'Presupuesto_Proyecto_2024.xlsx', status:'Pendiente', color:'#fbbf24'},{name:'Contrato_Cliente.docx', status:'Revisión', color:'#e5e7eb'}].map((d,i)=>(
              <div key={i} className="flex items-center gap-2 text-sm">
                <span className="w-2 h-2 rounded-full" style={{background:d.color}}></span>
                <span>{d.name}</span>
                <span className="ml-auto text-xs font-semibold" style={{color:d.color}}>{d.status}</span>
              </div>
            ))}
          </CardContent>
        </Card>
        {/* Equipo y Responsables - Half width */}
        <Card className="bg-white border-0 shadow-md h-48 flex flex-col">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg text-navy-900" style={{color:'#1e3269'}}>Equipo y Responsables</CardTitle>
            <Link to="/proyectos/detalle"><Button variant="outline" size="sm" style={{borderColor:'#1e3269', color:'#1e3269'}}>Ver equipo</Button></Link>
          </CardHeader>
          <CardContent className="flex-1 flex gap-4 items-center">
            {[{nombre:'Ing. Juan Pérez', rol:'Director de Proyecto'},{nombre:'Arq. María López', rol:'Arquitecta Principal'},{nombre:'Lic. Sofía Ruiz', rol:'Administradora'}].map((e,i)=>(
              <div key={i} className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-[#1e3269] flex items-center justify-center text-white font-bold text-lg mb-1">
                  {e.nombre.split(' ').map(n=>n[0]).join('').toUpperCase().slice(0,2)}
                </div>
                <span className="text-xs text-navy-900 font-semibold" style={{color:'#1e3269'}}>{e.nombre}</span>
                <span className="text-xs text-gray-500">{e.rol}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}