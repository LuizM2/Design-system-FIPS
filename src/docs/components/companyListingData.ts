import type { AdminTableStatusTone } from '../../components/ui/admin-listing'

export type CompanyViewMode = 'active' | 'deleted' | 'archived'

export interface CompanyListingRow {
  id: string
  initials: string
  company: string
  cnpj: string
  responsible: string
  respFiscal: string
  respDp: string
  respContabil: string
  respFinanceiro: string
  respJucesp: string
  departmentStatuses: AdminTableStatusTone[]
  status: 'Novo' | 'Ativo' | 'Inativo'
  statusVariant: 'info' | 'success' | 'secondary'
  progress: number
  bucket: CompanyViewMode
}

export const companyListingRows: CompanyListingRow[] = [
  {
    id: '#508',
    initials: 'BC',
    company: 'Black Ice Confecções e Comércio',
    cnpj: '65.728.689/0001-10',
    responsible: 'Ronaldo',
    respFiscal: 'Fábio',
    respDp: 'Admilson',
    respContabil: 'Meire',
    respFinanceiro: 'Meire',
    respJucesp: 'Bruno',
    departmentStatuses: ['success', 'success', 'success', 'success', 'success'],
    status: 'Novo',
    statusVariant: 'info',
    progress: 42,
    bucket: 'active',
  },
  {
    id: '#507',
    initials: 'HR',
    company: 'HRB Gestão Integrada LTDA',
    cnpj: '65.597.871/0001-88',
    responsible: 'Heloísa',
    respFiscal: 'Fábio',
    respDp: 'Admilson',
    respContabil: 'Meire',
    respFinanceiro: 'Daniela',
    respJucesp: 'Bruno',
    departmentStatuses: ['success', 'success', 'success', 'success', 'warning'],
    status: 'Ativo',
    statusVariant: 'success',
    progress: 82,
    bucket: 'active',
  },
  {
    id: '#506',
    initials: 'EC',
    company: 'Erivan Cx & C5 Consultoria',
    cnpj: '65.519.974/0001-21',
    responsible: 'Erivan',
    respFiscal: 'Fábio',
    respDp: 'Admilson',
    respContabil: 'Meire',
    respFinanceiro: 'Daniela',
    respJucesp: 'Bruno',
    departmentStatuses: ['success', 'success', 'success', 'success', 'success'],
    status: 'Ativo',
    statusVariant: 'success',
    progress: 71,
    bucket: 'active',
  },
  {
    id: '#505',
    initials: 'FS',
    company: 'Freires & Rainho Vip Inflight',
    cnpj: '65.662.908/0001-66',
    responsible: 'Ana Freires',
    respFiscal: 'Fábio',
    respDp: 'Admilson',
    respContabil: 'Meire',
    respFinanceiro: 'Daniela',
    respJucesp: 'Bruno',
    departmentStatuses: ['success', 'success', 'warning', 'success', 'success'],
    status: 'Novo',
    statusVariant: 'info',
    progress: 53,
    bucket: 'active',
  },
  {
    id: '#504',
    initials: 'MA',
    company: 'Flavia de Assis Sales Consultoria',
    cnpj: '27.638.306/0001-73',
    responsible: 'Flavia',
    respFiscal: 'Fábio',
    respDp: 'Admilson',
    respContabil: 'Meire',
    respFinanceiro: 'Daniela',
    respJucesp: 'Bruno',
    departmentStatuses: ['success', 'warning', 'warning', 'success', 'success'],
    status: 'Ativo',
    statusVariant: 'success',
    progress: 64,
    bucket: 'active',
  },
  {
    id: '#482',
    initials: 'AZ',
    company: 'Anderson Vieira Fernandes',
    cnpj: '27.371.540/0001-38',
    responsible: 'Anderson',
    respFiscal: 'Fábio',
    respDp: 'Admilson',
    respContabil: 'Meire',
    respFinanceiro: 'Daniela',
    respJucesp: 'Bruno',
    departmentStatuses: ['warning', 'warning', 'success', 'muted', 'muted'],
    status: 'Inativo',
    statusVariant: 'secondary',
    progress: 18,
    bucket: 'deleted',
  },
  {
    id: '#451',
    initials: 'PM',
    company: 'Pix Auto Comércio e Revenda',
    cnpj: '53.811.527/0001-91',
    responsible: 'Edson',
    respFiscal: 'Bruno',
    respDp: 'Daniela',
    respContabil: 'Meire',
    respFinanceiro: 'Daniela',
    respJucesp: 'Bruno',
    departmentStatuses: ['success', 'success', 'success', 'muted', 'muted'],
    status: 'Inativo',
    statusVariant: 'secondary',
    progress: 26,
    bucket: 'archived',
  },
]
