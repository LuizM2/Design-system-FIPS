import { Headphones, Kanban, Video } from 'lucide-react'
import { DocPage, DemoSection } from '../../components/DocPage'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../components/ui/tabs'

export default function TabsDoc() {
  return (
    <DocPage
      title="Tabs"
      description="Navegação por abas para alternar contextos sem sair da página."
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
