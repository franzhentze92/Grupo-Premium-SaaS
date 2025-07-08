import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/contexts/AuthContext";
import AppLayout from "./components/AppLayout";
// Pages
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Report from "./pages/Report";
import Timeline from "./pages/Timeline";
import NotFound from "./pages/NotFound";
import Documents from "./pages/Documents";
import Proyectos from "./pages/Proyectos";
import ProyectosKPIs from "./pages/ProyectosKPIs";
import ProyectosEstadoAvance from "./pages/ProyectosEstadoAvance";
import ProyectosLicencias from "./pages/ProyectosLicencias";
import ProyectosGaleria from "./pages/ProyectosGaleria";
import ProyectosCrear from "./pages/ProyectosCrear";
import MapaVistaSatelital from "./pages/MapaVistaSatelital";
// import MapaFiltroEstadoAvance from "./pages/MapaFiltroEstadoAvance";
// import MapaDetallesGeolocalizados from "./pages/MapaDetallesGeolocalizados";
import CronogramaCalendarioMaestro from './pages/CronogramaCalendarioMaestro';
import CronogramaActividadesDepartamento from './pages/CronogramaActividadesDepartamento';
import ReportesInformeMensual from './pages/ReportesInformeMensual';
import ReportesComparativoProyectos from './pages/ReportesComparativoProyectos';
import ReportesKPIs from './pages/ReportesKPIs';
import DepartamentoFinanzasReporteInterno from './pages/DepartamentoFinanzasReporteInterno';
import DepartamentoFinanzasAgendaSemanal from './pages/DepartamentoFinanzasAgendaSemanal';
import DepartamentoFinanzasTareas from './pages/DepartamentoFinanzasTareas';
import DepartamentoOperacionesReporteInterno from './pages/DepartamentoOperacionesReporteInterno';
import DepartamentoOperacionesAgendaSemanal from './pages/DepartamentoOperacionesAgendaSemanal';
import DepartamentoOperacionesTareas from './pages/DepartamentoOperacionesTareas';
import DepartamentoAdministracionReporteInterno from './pages/DepartamentoAdministracionReporteInterno';
import DepartamentoAdministracionAgendaSemanal from './pages/DepartamentoAdministracionAgendaSemanal';
import DepartamentoAdministracionTareas from './pages/DepartamentoAdministracionTareas';
import DepartamentoArquitecturaReporteInterno from './pages/DepartamentoArquitecturaReporteInterno';
import DepartamentoArquitecturaAgendaSemanal from './pages/DepartamentoArquitecturaAgendaSemanal';
import DepartamentoArquitecturaTareas from './pages/DepartamentoArquitecturaTareas';
import DepartamentoMercadeoReporteInterno from './pages/DepartamentoMercadeoReporteInterno';
import DepartamentoMercadeoAgendaSemanal from './pages/DepartamentoMercadeoAgendaSemanal';
import DepartamentoMercadeoTareas from './pages/DepartamentoMercadeoTareas';
import DepartamentoFundacionReporteInterno from './pages/DepartamentoFundacionReporteInterno';
import DepartamentoFundacionAgendaSemanal from './pages/DepartamentoFundacionAgendaSemanal';
import DepartamentoFundacionTareas from './pages/DepartamentoFundacionTareas';
import DepartamentoVentasReporteInterno from './pages/DepartamentoVentasReporteInterno';
import DepartamentoVentasAgendaSemanal from './pages/DepartamentoVentasAgendaSemanal';
import DepartamentoVentasTareas from './pages/DepartamentoVentasTareas';
import ProyectoDetalle from './pages/ProyectoDetalle';

const queryClient = new QueryClient();

const App = () => (
  <ThemeProvider defaultTheme="light">
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route element={<AppLayout />}>
                <Route path="/" element={<Dashboard />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/timeline" element={<Timeline />} />
                <Route path="/report" element={<Report />} />
                <Route path="/report/:reportType" element={<Report />} />
                <Route path="/documents" element={<Documents />} />
                <Route path="/department/:departmentType" element={<Dashboard />} />
                <Route path="/department/:departmentType/:subtab" element={<Dashboard />} />
                <Route path="/settings" element={<Dashboard />} />
                <Route path="/proyectos" element={<Proyectos />} />
                <Route path="/proyectos/kpis" element={<ProyectosKPIs />} />
                <Route path="/proyectos/estado-avance" element={<ProyectosEstadoAvance />} />
                <Route path="/proyectos/licencias" element={<ProyectosLicencias />} />
                <Route path="/proyectos/galeria" element={<ProyectosGaleria />} />
                <Route path="/proyectos/crear" element={<ProyectosCrear />} />
                <Route path="/mapa/vista-satelital" element={<MapaVistaSatelital />} />
                {/* <Route path="/mapa/filtro-estado-avance" element={<MapaFiltroEstadoAvance />} /> */}
                {/* <Route path="/mapa/detalles-geolocalizados" element={<MapaDetallesGeolocalizados />} /> */}
                <Route path="/cronograma/calendario-maestro" element={<CronogramaCalendarioMaestro />} />
                <Route path="/cronograma/actividades-departamento" element={<CronogramaActividadesDepartamento />} />
                <Route path="/reportes/informe-mensual" element={<ReportesInformeMensual />} />
                <Route path="/reportes/comparativo-proyectos" element={<ReportesComparativoProyectos />} />
                <Route path="/reportes/kpis" element={<ReportesKPIs />} />
                <Route path="/departamentos/finanzas/reporte-interno" element={<DepartamentoFinanzasReporteInterno />} />
                <Route path="/departamentos/finanzas/agenda-semanal" element={<DepartamentoFinanzasAgendaSemanal />} />
                <Route path="/departamentos/finanzas/tareas" element={<DepartamentoFinanzasTareas />} />
                <Route path="/departamentos/operaciones/reporte-interno" element={<DepartamentoOperacionesReporteInterno />} />
                <Route path="/departamentos/operaciones/agenda-semanal" element={<DepartamentoOperacionesAgendaSemanal />} />
                <Route path="/departamentos/operaciones/tareas" element={<DepartamentoOperacionesTareas />} />
                <Route path="/departamentos/administracion/reporte-interno" element={<DepartamentoAdministracionReporteInterno />} />
                <Route path="/departamentos/administracion/agenda-semanal" element={<DepartamentoAdministracionAgendaSemanal />} />
                <Route path="/departamentos/administracion/tareas" element={<DepartamentoAdministracionTareas />} />
                <Route path="/departamentos/arquitectura/reporte-interno" element={<DepartamentoArquitecturaReporteInterno />} />
                <Route path="/departamentos/arquitectura/agenda-semanal" element={<DepartamentoArquitecturaAgendaSemanal />} />
                <Route path="/departamentos/arquitectura/tareas" element={<DepartamentoArquitecturaTareas />} />
                <Route path="/departamentos/mercadeo/reporte-interno" element={<DepartamentoMercadeoReporteInterno />} />
                <Route path="/departamentos/mercadeo/agenda-semanal" element={<DepartamentoMercadeoAgendaSemanal />} />
                <Route path="/departamentos/mercadeo/tareas" element={<DepartamentoMercadeoTareas />} />
                <Route path="/departamentos/fundacion/reporte-interno" element={<DepartamentoFundacionReporteInterno />} />
                <Route path="/departamentos/fundacion/agenda-semanal" element={<DepartamentoFundacionAgendaSemanal />} />
                <Route path="/departamentos/fundacion/tareas" element={<DepartamentoFundacionTareas />} />
                <Route path="/departamentos/ventas/reporte-interno" element={<DepartamentoVentasReporteInterno />} />
                <Route path="/departamentos/ventas/agenda-semanal" element={<DepartamentoVentasAgendaSemanal />} />
                <Route path="/departamentos/ventas/tareas" element={<DepartamentoVentasTareas />} />
                <Route path="/proyectos/detalle" element={<ProyectoDetalle />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </AuthProvider>
  </ThemeProvider>
);

export default App;
