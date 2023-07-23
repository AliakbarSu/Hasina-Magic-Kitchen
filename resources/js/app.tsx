import './bootstrap';
import '../css/app.css';

import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { RootState, store } from '@/store';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { loadStripe, StripeElementsOptions } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { ReactNode, useEffect } from 'react';
import { getCart, saveCart } from './utils/cart_localstorage';
import { setCart } from './store/slice/cart';
const stripePromise = loadStripe('pk_test_h5jTkhh7fGyGO6YrjfyfRTId');

const appName =
    window.document.getElementsByTagName('title')[0]?.innerText ||
    "Hasina's Magic Kitchen";

const Wrapper = ({ children }: { children: ReactNode }) => {
    const dispatch = useDispatch();
    const cart = useSelector((state: RootState) => state.cart);

    useEffect(() => {
        if (cart.loaded) {
            return saveCart(cart);
        }
        const cartFromStore = getCart();
        cartFromStore && dispatch(setCart(cartFromStore));
    }, [cart]);

    return <>{children}</>;
};

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
            mode: 'setup' as unknown as string,
            currency: 'nzd',
            paymentMethodCreation: 'manual',
            // Fully customizable with appearance API.
            // appearance: {/*...*/ },
        } as unknown as StripeElementsOptions;

        root.render(
            <>
                <Elements stripe={stripePromise} options={options}>
                    <Provider store={store}>
                        <Wrapper>
                            <App {...props} />
                        </Wrapper>
                    </Provider>
                </Elements>
            </>
        );
    },
    progress: {
        color: '#4B5563',
    },
});
