import { siteSettings } from './siteSettings'
import { teamMember } from './teamMember'
import { market } from './market'
import { comparisonTable } from './comparisonTable'
import { insight } from './insight'
import { whatWeArePage } from './whatWeArePage'

export const schemaTypes = [
  // Singletons
  siteSettings,
  comparisonTable,
  whatWeArePage,
  // Collections
  teamMember,
  market,
  insight,
]
