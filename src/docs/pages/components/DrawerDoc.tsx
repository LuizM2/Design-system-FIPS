import { DocPage, DemoSection } from '../../components/DocPage'
import { Button } from '../../../components/ui/button'
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '../../../components/ui/drawer'

export default function DrawerDoc() {
  return (
    <DocPage
      title="Drawer"
      description="Painel lateral para filtros, detalhes rápidos ou formulários auxiliares."
    >
      <DemoSection
        title="Interativo"
        reference={`import { Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription } from 'ds-fips'

<Drawer>
  <DrawerTrigger asChild><button type="button">Abrir</button></DrawerTrigger>
  <DrawerContent>
    <DrawerHeader>
      <DrawerTitle>Painel</DrawerTitle>
      <DrawerDescription>Detalhes</DrawerDescription>
    </DrawerHeader>
  </DrawerContent>
</Drawer>`}
        referenceLabel="Drawer"
      >
        <Drawer>
          <DrawerTrigger asChild>
            <Button variant="outline">Abrir drawer</Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Detalhes do registro</DrawerTitle>
              <DrawerDescription>
                Use este painel para ações secundárias sem perder o contexto da lista principal.
              </DrawerDescription>
            </DrawerHeader>
            <div className="mt-4 space-y-3 text-sm text-[var(--color-fg-muted)]">
              <p>Conteúdo adicional pode incluir timeline, anexos ou comentários.</p>
            </div>
          </DrawerContent>
        </Drawer>
      </DemoSection>
    </DocPage>
  )
}
