export interface iFindManyCampaigns {
  total: number
  records: iCampaign[]
}

export interface iCampaign {
  id: number
  organization_id: number
  campaign_place: iCampaignPlace[]
  name: string
  description: string
  status: number
  campaign_dates: iCampaignDate[]
  created_at: string
  service: {
    id: number
    execution_time: number
    name: string
  }
}

export interface iCampaignPlace {
  id: number
  name: string
  phone: string
  address:iAddress
}

export interface iAddress {
  id: number
  street: string
  neighborhood: string
  number: string
  zip_code: string
  state: string
  city: string
  complement: string
  created_at: string
  updated_at: string
}

export interface iCampaignDate {
  id: number
  date: string
  from: string
  to: string
  week_day: any
  campaign_id: number
}
