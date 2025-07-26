import {useDispatch, useSelector} from "react-redux";
import type {RootState} from "../redux/reducers";
import { useNavigate } from 'react-router-dom';
import {Box, Button, CircularProgress, Paper, Typography} from "@mui/material";
import {useEffect} from "react";
import { fetchCartItems, removeFromCart, addToCart } from '../redux/slices/cartSlice';
import type {AppDispatch} from "../redux/store.ts";


const Profile = () => {
    const user = useSelector((state: RootState) => state.auth.user);
    const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
    const { items: cartItems, status: cartStatus, error: cartError } = useSelector((state: RootState) => state.cart);
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        if (!isLoggedIn || !user) {
            setTimeout(() => {
                navigate('/auth/signin');
            }, 2000);
        } else {
            dispatch(fetchCartItems());
        }
    }, [isLoggedIn, user, navigate, dispatch]);

    if (!isLoggedIn || !user) {
        return (
            <Box sx={{ p: 4 }}>
                <Typography variant="h4" color="error">Not authorised. You wil be redirected</Typography>
            </Box>
        );
    }

    const handleUpdateQuantity = (bookId: string, quantity: number) => {
        if (quantity <= 0) {
            dispatch(removeFromCart(bookId));
        } else {
            dispatch(addToCart({ bookId, quantity: quantity - (cartItems.find(item => item.book._id === bookId)?.quantity || 0) }));
        }
    };

    if (cartStatus === 'loading') {
        return <Box sx={{ p: 4, display: 'flex', justifyContent: 'center' }}><CircularProgress /></Box>;
    }

    if (cartError) {
        return <Box sx={{ p: 4 }}><Typography color="error">{cartError}</Typography></Box>;
    }


    const total = cartItems.reduce((sum, item) => sum + item.book.price * item.quantity, 0);

    return (
        <Box sx={{ p: 4, flex: 1 }}>
            <Typography variant="h4" gutterBottom>Profile</Typography>
            <Box sx={{display: "flex", gap: "10px"}}>
                <Paper sx={{ p: 3 }}>
                    <Typography variant="h6">Name: {user.name || user.username}</Typography>
                    <Typography variant="h6">Username: {user.username}</Typography>
                    <Typography variant="h6">Email: {user.email}</Typography>
                </Paper>
                <Paper sx={{ p: 3, flex: 1 }}>
                    <Typography variant="h5" sx={{ mt: 3 }}>Your cart:</Typography>
                    {cartItems.length > 0 ? (
                        <>
                            {cartItems.map((item) => (
                                <Box key={item.book._id} sx={{ display: 'flex', alignItems: 'center', mb: 2, borderBottom: '1px solid #eee', pb: 2 }}>
                                    <img src={item.book.imageUrl} alt={item.book.title} style={{ width: 60, height: 60, objectFit: 'contain', marginRight: 16 }} />
                                    <Box sx={{ flexGrow: 1 }}>
                                        <Typography variant="body1" fontWeight="bold">{item.book.title}</Typography>
                                        <Typography variant="body2" color="text.secondary">Quantity: {item.quantity}</Typography>
                                        <Typography variant="body2" color="primary">${(item.book.price * item.quantity).toFixed(2)}</Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <Button
                                            size="small"
                                            variant="outlined"
                                            onClick={() => handleUpdateQuantity(item.book._id, item.quantity - 1)}
                                        >-</Button>
                                        <Button
                                            size="small"
                                            variant="outlined"
                                            onClick={() => handleUpdateQuantity(item.book._id, item.quantity + 1)}
                                        >+</Button>
                                        <Button
                                            size="small"
                                            color="error"
                                            onClick={() => dispatch(removeFromCart(item.book._id))}
                                        >Remove</Button>
                                    </Box>
                                </Box>
                            ))}
                            <Typography variant="h5" sx={{ mt: 3, textAlign: 'right' }}>
                                Total: ${total.toFixed(2)}
                            </Typography>
                        </>
                    ) : (
                        <Typography variant="body1" color="text.secondary">
                            Your cart is empty.
                        </Typography>
                    )}
                </Paper>
            </Box>
        </Box>
    )
}

export default Profile;