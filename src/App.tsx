import { Navigate, Route, Routes } from 'react-router-dom'
import { DocLayout } from './app/DocLayout'
import OverviewPage from './docs/pages/Overview'
import ChangelogPage from './docs/pages/ChangelogPage'
import ColorsPage from './docs/pages/foundations/ColorsPage'
import TypographyPage from './docs/pages/foundations/TypographyPage'
import SpacingPage from './docs/pages/foundations/SpacingPage'
import RadiusPage from './docs/pages/foundations/RadiusPage'
import ShadowsPage from './docs/pages/foundations/ShadowsPage'
import IconsPage from './docs/pages/foundations/IconsPage'
import ButtonDoc from './docs/pages/components/ButtonDoc'
import InputDoc from './docs/pages/components/InputDoc'
import SelectDoc from './docs/pages/components/SelectDoc'
import TextareaDoc from './docs/pages/components/TextareaDoc'
import BadgeDoc from './docs/pages/components/BadgeDoc'
import CardDoc from './docs/pages/components/CardDoc'
import TabsDoc from './docs/pages/components/TabsDoc'
import TableDoc from './docs/pages/components/TableDoc'
import DialogDoc from './docs/pages/components/DialogDoc'
import DrawerDoc from './docs/pages/components/DrawerDoc'
import ToastDoc from './docs/pages/components/ToastDoc'
import TooltipDoc from './docs/pages/components/TooltipDoc'
import ApplicationShellDemo from './docs/pages/patterns/ApplicationShellDemo'
import DashboardDemo from './docs/pages/patterns/DashboardDemo'
import DataListingDemo from './docs/pages/patterns/DataListingDemo'
import FormWorkspaceDemo from './docs/pages/patterns/FormWorkspaceDemo'
import ModalWorkflowDemo from './docs/pages/patterns/ModalWorkflowDemo'
import HeroHeaderDoc from './docs/pages/patterns/HeroHeaderDoc'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/docs" replace />} />
      <Route path="/docs" element={<DocLayout />}>
        <Route index element={<OverviewPage />} />
        <Route path="foundations/colors" element={<ColorsPage />} />
        <Route path="foundations/typography" element={<TypographyPage />} />
        <Route path="foundations/spacing" element={<SpacingPage />} />
        <Route path="foundations/radius" element={<RadiusPage />} />
        <Route path="foundations/shadows" element={<ShadowsPage />} />
        <Route path="foundations/icons" element={<IconsPage />} />
        <Route path="components/button" element={<ButtonDoc />} />
        <Route path="components/input" element={<InputDoc />} />
        <Route path="components/select" element={<SelectDoc />} />
        <Route path="components/textarea" element={<TextareaDoc />} />
        <Route path="components/badge" element={<BadgeDoc />} />
        <Route path="components/card" element={<CardDoc />} />
        <Route path="components/tabs" element={<TabsDoc />} />
        <Route path="components/table" element={<TableDoc />} />
        <Route path="components/dialog" element={<DialogDoc />} />
        <Route path="components/drawer" element={<DrawerDoc />} />
        <Route path="components/toast" element={<ToastDoc />} />
        <Route path="components/tooltip" element={<TooltipDoc />} />
        <Route path="patterns/application-shell" element={<ApplicationShellDemo />} />
        <Route path="patterns/dashboard" element={<DashboardDemo />} />
        <Route path="patterns/data-listing" element={<DataListingDemo />} />
        <Route path="patterns/form-workspace" element={<FormWorkspaceDemo />} />
        <Route path="patterns/modal-workflow" element={<ModalWorkflowDemo />} />
        <Route path="patterns/hero-header" element={<HeroHeaderDoc />} />
        <Route path="patterns/certificados" element={<Navigate to="/docs/patterns/data-listing" replace />} />
        <Route path="patterns/modal-form" element={<Navigate to="/docs/patterns/modal-workflow" replace />} />
        <Route path="changelog" element={<ChangelogPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/docs" replace />} />
    </Routes>
  )
}
