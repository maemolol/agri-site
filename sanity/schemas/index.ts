import { homeSiteSettings } from './homeSiteSettings'
import { teamMember } from './teamMember'
import { market } from './market'
import { comparisonTable } from './comparisonTable'
import { insight } from './insight'
import { whatWeArePage } from './whatWeArePage'
import { whoWeArePage } from './whoWeArePage'
import { eventsPage } from './eventsPage'
import { precommitmentPage } from './precommitmentPage'

export const schemaTypes = [
  // Singletons
  homeSiteSettings,
  comparisonTable,
  whatWeArePage,
  whoWeArePage,
  eventsPage,
  precommitmentPage,
  // Collections
  teamMember,
  market,
  insight,
]
