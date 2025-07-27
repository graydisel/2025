import React, {useCallback, useEffect, useState} from 'react';
import {Box, Button, CircularProgress, Paper, TextField, Typography} from '@mui/material';
import api from "../services/api.ts";
import {useNavigate} from "react-router-dom";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { debounce } from "lodash";
import {useDispatch, useSelector} from "react-redux";
import type {AppDispatch} from "../redux/store.ts";
import type {RootState} from "../redux/reducers";
import {fetchProducts} from "../redux/slices/productSlice.ts";


const AdminManageProducts = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { products, loading, error } = useSelector((state: RootState) => state.products);

    const [searchTerm, setSearchTerm] = useState("");

    const debouncedSearch = useCallback(
        debounce((term: string) => {
            dispatch(fetchProducts({ searchTerm: term }));
        }, 500),
        [dispatch]
    );

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const term = event.target.value;
        setSearchTerm(term);
        debouncedSearch(term);
    };

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    const handleDelete = async (_id: string) => {
        try {
            await api.delete(`/admin/products/${_id}`);
            dispatch(fetchProducts({ searchTerm: searchTerm }));
        } catch (err: any) {
            alert(err.response?.data?.message || 'Failed to delete book.');
        }
    };

    if (loading) return <Box sx={{ p: 4, display: 'flex', justifyContent: 'center' }}><CircularProgress /></Box>;
    if (error) return <Box sx={{ p: 4 }}><Typography color="error">{error}</Typography></Box>;

    return (
        <Box sx={{ p: 4, flex: 1 }}>
            <Typography variant="h4" gutterBottom>Manage Books</Typography>
            <TextField
                label="Search by title"
                variant="outlined"
                fullWidth
                sx={{ mb: 3 }}
                value={searchTerm}
                onChange={handleSearchChange}
            />
            {products.map((product) => (
                <Paper key={product._id} sx={{ p: 2, mb: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="h6">{product.title}</Typography>
                        <Typography variant="body2" color="text.secondary">by {product.author}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                        <Button
                            variant="outlined"
                            onClick={() => navigate(`/admin/edit/${product._id}`)}
                        >Edit</Button>
                        <Button
                            variant="outlined"
                            color="error"
                            onClick={() => handleDelete(product._id)}
                        ><DeleteForeverIcon/></Button>
                    </Box>
                </Paper>
            ))}
        </Box>
    );
}

export default AdminManageProducts