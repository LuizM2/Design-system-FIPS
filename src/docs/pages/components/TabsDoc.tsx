import { Headphones, Kanban, Video } from 'lucide-react'
import { DocPage, DemoSection } from '../../components/DocPage'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../components/ui/tabs'

const tabsPageSource = `import { Headphones, Kanban, Video } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from 'ds-fips'

export function WorkflowTabs() {
  return (
    <Tabs defaultValue="atendimento">
      <TabsList className="w-full max-w-2xl">
        <TabsTrigger value="atendimento" className="gap-2">
          <Headphones className="h-4 w-4" aria-hidden />
          Atendimento
        </TabsTrigger>
        <TabsTrigger value="tarefa" className="gap-2">
          <Kanban className="h-4 w-4" aria-hidden />
          Tarefa
        </TabsTrigger>
        <TabsTrigger value="reuniao" className="gap-2">
          <Video className="h-4 w-4" aria-hidden />
          Reunião
        </TabsTrigger>
      </TabsList>
      <TabsContent value="atendimento">Conteúdo</TabsContent>
    </Tabs>
  )
}`

export default function TabsDoc() {
  return (
    <DocPage
      title="Tabs"
      description="Navegação por abas para alternar contextos sem sair da página. Esta página continua sendo a referência oficial de tabs do DS-FIPS."
      pageSource={tabsPageSource}
      pageDownloadName="TabsExample.tsx"
    >
      <DemoSection
        title="Com ícones"
        reference={`import { Tabs, TabsList, TabsTrigger, TabsContent } from 'ds-fips'

<Tabs defaultValue="a">
  <TabsList>
    <TabsTrigger value="a">Aba A</TabsTrigger>
  </TabsList>
  <TabsContent value="a">Conteúdo</TabsContent>
</Tabs>`}
        referenceLabel="Tabs (Radix)"
      >
        <Tabs defaultValue="a">
          <TabsList className="w-full max-w-xl">
            <TabsTrigger value="a" className="gap-2">
              <Headphones className="h-4 w-4" aria-hidden />
              Atendimento
            </TabsTrigger>
            <TabsTrigger value="b" className="gap-2">
              <Kanban className="h-4 w-4" aria-hidden />
              Tarefa
            </TabsTrigger>
            <TabsTrigger value="c" className="gap-2">
              <Video className="h-4 w-4" aria-hidden />
              Reunião
            </TabsTrigger>
          </TabsList>
          <TabsContent value="a">
            Conteúdo da aba <strong>Atendimento</strong>.
          </TabsContent>
          <TabsContent value="b">
            Conteúdo da aba <strong>Tarefa</strong>.
          </TabsContent>
          <TabsContent value="c">
            Conteúdo da aba <strong>Reunião</strong>.
          </TabsContent>
        </Tabs>
      </DemoSection>
    </DocPage>
  )
}
