import './bootstrap';
import '../css/app.css';

import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { store } from '@/store';
import { Provider } from 'react-redux';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
const stripePromise = loadStripe('pk_test_h5jTkhh7fGyGO6YrjfyfRTId');

const appName =
    window.document.getElementsByTagName('title')[0]?.innerText || 'Hasina\'s Magic Kitchen';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.tsx`,
            import.meta.glob('./Pages/**/*.tsx')
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);
        const options = {
            mode: 'setup' as any,
            currency: 'nzd',
            paymentMethodCreation: "manual"
            // Fully customizable with appearance API.
            // appearance: {/*...*/ },
        };

        root.render(
            <>
                <Elements stripe={stripePromise} options={options}>
                    <Provider store={store}>
                        <App {...props} />
                    </Provider>
                </Elements>
            </>
        );
    },
    progress: {
        color: '#4B5563',
    },
});
