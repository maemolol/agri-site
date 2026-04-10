import { homeSiteSettings } from './homeSiteSettings';
import { teamMember } from './teamMember';
import { market } from './market';
import { comparisonTable } from './comparisonTable';
import { insight } from './insight';
import { whatWeArePage } from './whatWeArePage';
export const schemaTypes = [
    // Singletons
    homeSiteSettings,
    comparisonTable,
    whatWeArePage,
    // Collections
    teamMember,
    market,
    insight,
];
