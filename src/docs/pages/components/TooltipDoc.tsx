import { DocPage, DemoSection } from '../../components/DocPage'
import { Button } from '../../../components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '../../../components/ui/tooltip'

export default function TooltipDoc() {
  return (
    <DocPage
      title="Tooltip"
      description="Dicas contextuais em hover/foco. Requer TooltipProvider na raiz da aplicação."
    >
      <DemoSection
        title="Exemplo"
      >
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline">Passe o mouse aqui</Button>
          </TooltipTrigger>
          <TooltipContent>Atalho: Ctrl + K para busca global (exemplo).</TooltipContent>
        </Tooltip>
      </DemoSection>
    </DocPage>
  )
}
