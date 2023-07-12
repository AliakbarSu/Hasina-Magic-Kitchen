import { useForm } from "@inertiajs/react";
import { Order, OrderStatus } from "../Orders";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Box from '@mui/material/Box';

const availableStatus = [
    { id: OrderStatus.Confirmed, title: 'Confirm' },
    { id: OrderStatus.Make, title: 'Make' },
    { id: OrderStatus.Completed, title: 'Complete' },
    { id: OrderStatus.Canceled, title: 'Cancel' },
]

export default function OrderStatusActions({ order }: { onSelect: (value: string) => void, order: Order }) {
    const { patch, setData, data } = useForm({ status: order.status, order_id: order.id })

    const onSubmitHandler = () => {
        confirm(`Are you sure you want to change the status of this order to ${data.status}?`)
        patch(route('admin.orders.update.status'))
    }
    const handleChange = (event: SelectChangeEvent) => {
        setData('status', event.target.value as OrderStatus);
    };
    return (
        <div>
            <Box sx={{ maxWidth: 150, mt: 3 }}>
                <FormControl fullWidth>
                    <InputLabel id="order-status">Status</InputLabel>
                    <Select
                        labelId="order-status"
                        id="order-status"
                        value={data.status}
                        label="Status"
                        onChange={handleChange}
                    >
                        {availableStatus.map((orderStatus) => (
                            <MenuItem key={orderStatus.id} value={orderStatus.id}>{orderStatus.title}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>
            <div className="py-3">
                <button
                    onClick={onSubmitHandler}
                    type="button"
                    className="rounded bg-indigo-600 px-2 py-1 text-md font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Update
                </button>

            </div>

        </div>
    )
}
