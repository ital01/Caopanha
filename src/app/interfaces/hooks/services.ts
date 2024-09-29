export interface iFindManyServices {
    total: number
    records: iService[]
  }
  
  export interface iService {
    id: number
    name: string
    execution_time: number
    actived: boolean
    organization_id: number
    created_at: string
    updated_at: string
  }