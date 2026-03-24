import { DocPage, DemoSection } from '../../components/DocPage'
import { Button } from '../../../components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../../../components/ui/card'

export default function CardDoc() {
  return (
    <DocPage
      title="Card"
      description="Container para agrupar informações, métricas e ações."
    >
      <DemoSection
        title="Card padrão"
        reference={`import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from 'ds-fips'

<Card>
  <CardHeader>
    <CardTitle>Título</CardTitle>
    <CardDescription>Descrição</CardDescription>
  </CardHeader>
  <CardContent>...</CardContent>
  <CardFooter>...</CardFooter>
</Card>`}
        referenceLabel="Card composto"
      >
        <div className="max-w-md">
          <Card>
            <CardHeader>
              <CardTitle>Indicador operacional</CardTitle>
              <CardDescription>Resumo do período atual.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-semibold text-[var(--color-primary)]">128</p>
              <p className="text-sm text-[var(--color-fg-muted)]">Movimentações registradas</p>
            </CardContent>
            <CardFooter className="justify-end gap-2">
              <Button variant="secondary" size="sm">
                Detalhes
              </Button>
              <Button size="sm">Exportar</Button>
            </CardFooter>
          </Card>
        </div>
      </DemoSection>
    </DocPage>
  )
}
