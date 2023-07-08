import { Dish, Menu } from '@/types/application';
import Dropdown from './Dropdown';
import { useDispatch } from 'react-redux';
import { updateMenuItem } from '@/store/slice/menu';


export function MenuItems({ items, menu }: { items: Dish[], menu: Menu }) {
    const dispatch = useDispatch()

    const onItemRemoveHanlder = (id: string) => {
        const updatedMenu = {
            ...menu,
            dishes: menu.dishes.filter((dish) => dish.id !== id)
        }
        dispatch(updateMenuItem(updatedMenu))
    }


    const onUpdateItemsHandler = (id: string, prevId: string) => {
        if (id.length === 0) return
        const toReplaceWith = menu.options.find((dish) => dish.id === id) as Dish;
        const dishExists = menu.dishes.find((dish) => dish.id === id);
        if (dishExists) return
        const updatedMenu = {
            ...menu,
            dishes: menu.dishes.map((dish) => {
                if (dish.id === prevId) {
                    return toReplaceWith
                }
                return dish;
            })
        }
        dispatch(updateMenuItem(updatedMenu))
    }
    return (
        <div className="h-[80px]">
            <h2 className="text-sm font-medium text-gray-500">Menu Items</h2>

            <ul
                role="list"
                className="mt-1 flex max-h-20 flex-col flex-wrap gap-1"
            >
                {items.map((item) => (
                    <li
                        key={item.name}
                        className="flex rounded-md shadow-sm"
                    >
                        <div className="overflow-visible flex flex-1 items-center justify-between rounded-md border border-gray-200 bg-white">
                            <div className="flex-1 truncate px-4 py-2 text-sm">
                                <p className="font-medium text-gray-900 hover:text-gray-600">
                                    {item.name}
                                </p>
                            </div>
                            <div className="flex-shrink-0 pr-2">
                                <Dropdown item={item} onRemove={onItemRemoveHanlder} onApply={(id) => onUpdateItemsHandler(id, item.id)} menu={menu} />
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
