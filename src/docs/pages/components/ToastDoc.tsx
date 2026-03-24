import { toast } from 'sonner'
import { DocPage, DemoSection } from '../../components/DocPage'
import { Button } from '../../../components/ui/button'

export default function ToastDoc() {
  return (
    <DocPage
      title="Toast"
      description="Feedback não modal usando Sonner. Integrado ao layout da documentação (canto superior direito)."
    >
      <DemoSection
        title="Disparar exemplos"
        reference={`import { Toaster } from 'sonner'
import { toast } from 'sonner'

// Raiz do app:
<Toaster richColors position="top-right" />

toast('Mensagem')
toast.success('OK')
toast.error('Erro')`}
        referenceLabel="Sonner"
      >
        <div className="flex flex-wrap gap-3">
          <Button type="button" variant="secondary" onClick={() => toast('Operação registrada.')}>
            Toast neutro
          </Button>
          <Button
            type="button"
            onClick={() => toast.success('Dados salvos com sucesso.')}
          >
            Sucesso
          </Button>
          <Button
            type="button"
            variant="danger"
            onClick={() => toast.error('Falha ao sincronizar com o servidor.')}
          >
            Erro
          </Button>
        </div>
      </DemoSection>
    </DocPage>
  )
}
