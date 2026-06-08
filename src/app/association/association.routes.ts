import { Routes } from '@angular/router';

import { activityRoutes } from './activities/activity.routes';
import { directoryRoutes } from './directory/directory.routes';
import { feesRoutes } from './fees/fees.routes';
import { fundsRoutes } from './funds/funds.routes';
import { libraryRoutes } from './library/library.routes';
import { membersRoutes } from './members/members.routes';
import { myFeesRoutes } from './my-fees/my-fees.routes';

export const associationRoutes: Routes = [
  ...activityRoutes,
  ...membersRoutes,
  ...myFeesRoutes,
  ...libraryRoutes,
  ...feesRoutes,
  ...directoryRoutes,
  ...fundsRoutes
];
