import { ConnectButton } from '@rainbow-me/rainbowkit';
import { PanelInfo } from '@/componentes/PanelInfo';
import { FormularioDonacion } from '@/componentes/FormularioDonacion';
import { TablaHistorial } from '@/componentes/TablaHistorial';

export default function HomePage() {
  return (
    <div>
      <header>
        <h1>Clinica <span>Solidaria</span></h1>
        <ConnectButton />
      </header>
      
      <main className="contenedor-principal">
        <section className="seccion-titulo">
          <h2>Tu Donación, <span>Impacto Directo.</span></h2>
          <p>Aporta directamente a clínicas rurales a través de la blockchain.</p>
        </section>
        
        <div className="grid-principal">
          <div className="columna-formulario">
            <FormularioDonacion />
          </div>
          <div className="columna-datos">
            <PanelInfo />
            <TablaHistorial />
          </div>
        </div>
      </main>
    </div>
  );
}