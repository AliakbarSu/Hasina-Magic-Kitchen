import { AxiosInstance } from 'axios';
import ziggyRoute, { Config as ZiggyConfig } from 'ziggy-js';

declare global {
    interface Window {
        axios: AxiosInstance;
    }

    // eslint-disable-next-line no-var
    var route: typeof ziggyRoute;
    // eslint-disable-next-line no-var
    var Ziggy: ZiggyConfig;
}
