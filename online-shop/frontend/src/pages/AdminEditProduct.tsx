import { Box, TextField, Button, Typography, Paper, CircularProgress } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import type {Book} from "../types/product.ts";
import React, {useState, useEffect} from "react";
import api from "../services/api.ts";


const AdminEditProduct = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [book, setBook] = useState<Book | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [status, setStatus] = useState<string>('');

    useEffect(() => {
        const fetchBook = async () => {
            if (!id) {
                setError('Book ID is missing.');
                setLoading(false);
                return;
            }

            try {
                const response = await api.get(`/products/${id}`);
                setBook(response.data);
            } catch (err: any) {
                setError(err.response?.data?.message || 'Failed to fetch book data.');
            } finally {
                setLoading(false);
            }
        };
        fetchBook();
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (book) {
            setBook(prevBook => ({
                ...prevBook!,
                [name]: name === 'price' ? parseFloat(value) : value,
            }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!book || !id) return;

        try {
            await api.put(`/admin/products/${id}`, book);
            setStatus('Book updated successfully!');
            setTimeout(() => navigate('/admin/manage'), 2000);
        } catch (err) {
            setStatus('Failed to update book.');
            console.error(err);
        }
    };

    if (loading) {
        return <Box sx={{ p: 4, display: 'flex', justifyContent: 'center' }}><CircularProgress /></Box>;
    }

    if (error) {
        return <Box sx={{ p: 4 }}><Typography color="error">{error}</Typography></Box>;
    }

    if (!book) {
        return <Box sx={{ p: 4 }}><Typography color="error">Book not found.</Typography></Box>;
    }

    return(
        <Box sx={{ p: 4, flex: 1 }}>
            <Typography variant="h4" gutterBottom>Edit Book: {book.title}</Typography>
            <Paper component="form" onSubmit={handleSubmit} sx={{ p: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField label="Title" name="title" value={book.title} onChange={handleChange} required />
                <TextField label="Author" name="author" value={book.author} onChange={handleChange} required />
                <TextField label="Genre" name="genre" value={book.genre} onChange={handleChange} required />
                <TextField label="Cover" name="cover" value={book.cover} onChange={handleChange} required />
                <TextField label="Price" name="price" type="number" value={book.price} onChange={handleChange} required />
                <TextField label="Image URL" name="imageUrl" value={book.imageUrl} onChange={handleChange} required />
                <TextField label="Description" name="description" value={book.description} onChange={handleChange} multiline rows={4} />
                <Button type="submit" variant="contained" color="primary">Save Changes</Button>
                {status && <Typography color={status.includes('success') ? 'success.main' : 'error'}>{status}</Typography>}
            </Paper>
        </Box>
    )
}

export default AdminEditProduct;

