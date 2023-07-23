import MenuComponent from '@/Components/Menu';
import Header from '@/Layouts/Header';
import Nav from '@/Layouts/Nav';
import Filter from '@/Components/Filter';
import { Category, Dish, Menu } from '@/types/application';
import { Footer } from '@/Components/UI/Footer';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setDishes, setMenus } from '@/store/slice/menu';
import { RootState } from '@/store';
import { Head } from '@inertiajs/react';

function Home({
    menu,
    dishes,
}: {
    menu: Menu[];
    dishes: Dish[];
    categories: Category[];
}) {
    const dispatch = useDispatch();
    const menus = useSelector((state: RootState) => state.menu.menus);
    const storeDishes = useSelector((state: RootState) => state.menu.dishes);
    useEffect(() => {
        if (menus.length > 0) return;
        dispatch(setMenus(menu));
        if (storeDishes.length > 0) return;
        dispatch(setDishes(dishes));
    }, []);

    return (
        <>
            <Head title="Menu" />
            <Nav />
            <Header />
            <Filter />
            {/* <Deal /> */}
            <MenuComponent menu={menus} />
            <Footer />
        </>
    );
}

export default Home;
