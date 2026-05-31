import { Routes } from '@angular/router';

import { membersRoutes } from './members/members.routes';
import { myFeesRoutes } from './my-fees/my-fees.routes';
import { libraryRoutes } from './library/library.routes';
import { feesRoutes } from './fees/fees.routes';
import { directoryRoutes } from './directory/directory.routes';
import { fundsRoutes } from './funds/funds.routes';

export const associationRoutes: Routes = [
  ...membersRoutes,
  ...myFeesRoutes,
  ...libraryRoutes,
  ...feesRoutes,
  ...directoryRoutes,
  ...fundsRoutes
];
