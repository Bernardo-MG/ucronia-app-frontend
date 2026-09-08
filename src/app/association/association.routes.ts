import { Routes } from '@angular/router';

import { activityRoutes } from './activities/activity.routes';
import { directoryRoutes } from './directory/directory.routes';
import { feesRoutes } from './fees/fees.routes';
import { fundsRoutes } from './funds/funds.routes';
import { imageRoutes } from './images/image.routes';
import { libraryRoutes } from './library/library.routes';
import { myFeesRoutes } from './my-fees/my-fees.routes';
import { PublicMembersRoutes } from './public-members/public-members.routes';
import { scheduledGameRoutes } from './scheduled-game/scheduled-game.routes';

export const associationRoutes: Routes = [
  ...activityRoutes,
  ...scheduledGameRoutes,
  ...PublicMembersRoutes,
  ...myFeesRoutes,
  ...libraryRoutes,
  ...imageRoutes,
  ...feesRoutes,
  ...directoryRoutes,
  ...fundsRoutes
];
