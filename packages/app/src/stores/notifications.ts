import { IS_DEVELOPMENT } from '@/config';
import { Color } from '@material-ui/lab/Alert';
import { identity } from 'lodash';
import flow from 'lodash/fp/flow';
import create from 'zustand';
import { devtools, NamedSet } from 'zustand/middleware';
import { GetState } from 'zustand/vanilla';
import { log } from './_log';

/*
 * There can't be more than one notification at the same time,
 * according to the Google Material style guide, so we will have to
 * display one by one, deferring them is necessary.
 */

type Notification = {
  severity: Color;
  message: string;
};

type NotificationState = {
  notifications: readonly Notification[];
  pushNotification(notification: Notification): void;
  dismissNotification(): void;
};

const middlewares = flow(
  IS_DEVELOPMENT ? devtools : identity,
  IS_DEVELOPMENT ? log : identity,
);

const notificationState = (
  set: NamedSet<NotificationState>,
  get: GetState<NotificationState>,
): NotificationState => ({
  notifications: [],
  pushNotification: (latest) =>
    set({
      notifications: [...get().notifications, latest],
    }),
  dismissNotification: () =>
    set({
      notifications: get().notifications.slice(1),
    }),
});

export const useNotification = create<NotificationState>(
  middlewares(notificationState),
);
